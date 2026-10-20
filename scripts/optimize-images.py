"""Regenerate responsive assets from preserved originals (requires Pillow with AVIF support)."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / 'public/images'

for name, widths in [('logo-eleva', [640, 1280]), ('whatsapp-icon', [96, 192, 384])]:
    source = ROOT / f'brand/{name}.png'
    with Image.open(source) as image:
        target = source.with_suffix('.webp')
        image.save(target, 'WEBP', lossless=True, method=6, exact=True)
        with Image.open(target) as decoded:
            assert image.convert('RGBA').tobytes() == decoded.convert('RGBA').tobytes()
        for width in widths:
            resized = image.copy()
            resized.thumbnail((width, width), Image.Resampling.LANCZOS)
            resized.save(ROOT / f'brand/{name}-{width}.webp', 'WEBP', lossless=True, method=6, exact=True)

with Image.open(ROOT / 'hero/hero-01.jpg') as image:
    for width in [960, 1920, 2880]:
        resized = image.copy()
        resized.thumbnail((width, width), Image.Resampling.LANCZOS)
        resized.save(ROOT / f'hero/hero-01-{width}.webp', 'WEBP', quality=95, method=6)
        resized.save(ROOT / f'hero/hero-01-{width}.avif', 'AVIF', quality=85, speed=6)

print('Responsive images regenerated; original files retained.')
