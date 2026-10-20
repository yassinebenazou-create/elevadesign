"""Audit built HTML without third-party dependencies: python scripts/audit-production.py."""
import argparse
import hashlib
import json
import re
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.elements = []
        self.stack = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        node = {'tag': tag, 'attrs': dict(attrs), 'text': ''}
        self.elements.append(node)
        if tag not in {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i]['tag'] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        for node in self.stack:
            node['text'] += data

    def select(self, tag, **attrs):
        return [n for n in self.elements if n['tag'] == tag and all(n['attrs'].get(k) == v for k, v in attrs.items())]


def audit(directory, origin):
    root = Path(directory)
    urls = [e.text for e in ET.parse(root / 'sitemap.xml').iter() if e.tag.endswith('}loc')]
    paths = {urlsplit(url).path for url in urls}
    errors, warnings, pages = [], [], []
    duplicates = {key: defaultdict(list) for key in ['title', 'description', 'content']}
    def check(condition, path, message):
        if not condition:
            errors.append(f'{path}: {message}')
    for path in sorted(paths | {'/404'}):
        file = root / ('404.html' if path == '/404' else path.strip('/') + '/index.html' if path != '/' else 'index.html')
        check(file.exists(), path, 'Missing prerendered HTML')
        if not file.exists():
            continue
        html = file.read_text(encoding='utf-8')
        page = Page(html)
        def single(tag, attr=None, value=None, field='content'):
            nodes = page.select(tag, **({attr: value} if attr else {}))
            check(len(nodes) == 1, path, f'Expected one {tag} {value or ""}, found {len(nodes)}')
            return (nodes[0]['attrs'].get(field, '') if field else nodes[0]['text']) if nodes else ''
        title = single('title', field=None)
        description = single('meta', 'name', 'description')
        canonical = single('link', 'rel', 'canonical', 'href')
        robots = single('meta', 'name', 'robots')
        check(canonical == origin + path, path, f'Wrong canonical: {canonical}')
        check(('noindex' in robots) == (path == '/404'), path, 'Incorrect indexing directive')
        check(len(page.select('h1')) == 1, path, 'Expected one H1')
        main = page.select('main')
        text = re.sub(r'\s+', ' ', main[0]['text']).strip() if main else ''
        check(len(text) > 80, path, 'Missing meaningful static main content')
        for key, expected in [('og:title', title), ('og:description', description), ('og:url', canonical)]:
            check(single('meta', 'property', key) == expected, path, f'{key} inconsistent')
        for key, expected in [('twitter:title', title), ('twitter:description', description), ('twitter:card', 'summary_large_image')]:
            check(single('meta', 'name', key) == expected, path, f'{key} inconsistent')
        for key, attr in [('og:image', 'property'), ('twitter:image', 'name')]:
            image = single('meta', attr, key)
            check(image.startswith(origin + '/'), path, f'{key} wrong origin')
            check((root / unquote(urlsplit(image).path).lstrip('/')).is_file(), path, f'{key} missing asset')
        for node in page.select('img'):
            check('alt' in node['attrs'], path, f'Missing alt: {node["attrs"].get("src")}')
            if not node['attrs'].get('alt'):
                check(node['attrs'].get('aria-hidden') == 'true', path, 'Empty alt on non-decorative image')
        for node in page.elements:
            refs = []
            if node['tag'] == 'a': refs.append(node['attrs'].get('href', ''))
            if node['tag'] in {'img', 'script'}: refs.append(node['attrs'].get('src', ''))
            for attribute in ['srcset', 'imagesrcset']:
                if node['attrs'].get(attribute):
                    refs.extend(item.strip().split()[0] for item in node['attrs'][attribute].split(','))
            if node['tag'] == 'link' and node['attrs'].get('rel') in {'stylesheet', 'icon', 'preload', 'modulepreload', 'apple-touch-icon'}:
                refs.append(node['attrs'].get('href', ''))
            for ref in filter(None, refs):
                url = urlsplit(urljoin(origin + path, ref))
                if url.netloc != urlsplit(origin).netloc: continue
                target = unquote(url.path)
                check(target.rstrip('/') in {p.rstrip('/') for p in paths} or (root / target.lstrip('/')).is_file(), path, f'Broken internal reference: {ref}')
        scripts = page.select('script', type='application/ld+json')
        check(len(scripts) == (0 if path == '/404' else 1), path, 'Unexpected JSON-LD block count')
        schema_types = []
        for script in scripts:
            try:
                data = json.loads(script['text'])
                nodes = data if isinstance(data, list) else [data]
                ids = set()
                for node in nodes:
                    schema_types.append(node.get('@type'))
                    check(node.get('@context') == 'https://schema.org', path, 'Wrong schema context')
                    if '@id' in node:
                        check(node['@id'] not in ids, path, 'Duplicate top-level schema entity')
                        ids.add(node['@id'])
                    if node.get('@type') == 'ProfessionalService':
                        check(False, path, 'Deprecated ProfessionalService; use Organization or a verified LocalBusiness')
                    if node.get('@type') in ['Organization', 'LocalBusiness']:
                        check('serviceType' not in node, path, 'serviceType belongs to Service')
                    if node.get('@type') == 'CreativeWork':
                        check(not isinstance(node.get('contentLocation'), str), path, 'contentLocation must be Place')
                    if node.get('@type') == 'BreadcrumbList':
                        check([item['position'] for item in node['itemListElement']] == list(range(1, len(node['itemListElement']) + 1)), path, 'Invalid breadcrumb positions')
                    if node.get('@type') == 'FAQPage':
                        for item in node['mainEntity']:
                            check(item['name'] in text and item['acceptedAnswer']['text'] in text, path, 'FAQ schema not present in visible content')
                check('renseigner' not in script['text'].lower(), path, 'Placeholder in schema')
                check('pages.dev' not in script['text'] and 'www.elevadesign.ma' not in script['text'], path, 'Old origin in schema')
            except (ValueError, KeyError, TypeError) as error:
                errors.append(f'{path}: Invalid JSON-LD: {error}')
        if path != '/404':
            duplicates['title'][title].append(path)
            duplicates['description'][description].append(path)
            duplicates['content'][hashlib.sha256(text.encode()).hexdigest()].append(path)
        if len(title) > 65: warnings.append(f'{path}: title is {len(title)} characters (possible truncation)')
        if len(description) > 170: warnings.append(f'{path}: description is {len(description)} characters (possible truncation)')
        pages.append({'path': path, 'title': title, 'description': description, 'canonical': canonical, 'h1': [n['text'] for n in page.select('h1')], 'h2_count': len(page.select('h2')), 'main_characters': len(text), 'schema_types': schema_types})
    for key, groups in duplicates.items():
        for group in groups.values():
            check(len(group) == 1, ', '.join(group), f'Duplicate {key}')
    check(len(urls) == len(paths), 'sitemap', 'Duplicate URLs')
    check(all(url.startswith(origin + '/') for url in urls), 'sitemap', 'Wrong origin')
    check('/404' not in paths, 'sitemap', '404 must not be indexed')
    robots = (root / 'robots.txt').read_text()
    check(f'Sitemap: {origin}/sitemap.xml' in robots, 'robots', 'Wrong sitemap URL')
    check('User-agent: *' in robots and 'Allow: /' in robots and not re.search(r'Disallow:\s*/\s*$', robots, re.M), 'robots', 'Crawling blocked')
    for stylesheet in root.glob('assets/*.css'):
        for ref in re.findall(r'url\([\"\']?([^\)\"\']+)', stylesheet.read_text(encoding='utf-8')):
            if ref.startswith('/'):
                check((root / unquote(urlsplit(ref).path).lstrip('/')).is_file(), 'CSS', f'Missing image/font: {ref}')
    for line in (root / '_redirects').read_text().splitlines():
        if not line or line.startswith('#'): continue
        parts = line.split()
        check(len(parts) == 3 and parts[2] == '200', '_redirects', f'Unexpected rule: {line}')
        check(not parts[0].startswith('http'), '_redirects', 'Domain migration redirect must remain inactive')
    return {'public_pages': len(paths), 'errors': errors, 'warnings': warnings, 'pages': pages}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--dist', default='dist')
    parser.add_argument('--origin', default='https://elevadesign.ma')
    parser.add_argument('--output')
    args = parser.parse_args()
    result = audit(args.dist, args.origin.rstrip('/'))
    if args.output:
        Path(args.output).write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({k: v for k, v in result.items() if k != 'pages'}, ensure_ascii=False, indent=2))
    raise SystemExit(bool(result['errors']))
