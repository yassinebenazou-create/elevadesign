"""Regenerate responsive assets from preserved originals (requires Pillow with AVIF support)."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent / 'public/images'
RESPONSIVE_WIDTHS = (640, 1280, 1920)


def responsive_target(source: Path, width: int) -> Path:
    relative = source.relative_to(ROOT).with_suffix('')
    return ROOT / 'responsive' / relative.parent / f'{relative.name}-{width}.avif'


def optimize_responsive(source: Path) -> list[Path]:
    outputs: list[Path] = []
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        image = image.convert('RGBA' if image.mode in {'RGBA', 'LA'} else 'RGB')
        for width in RESPONSIVE_WIDTHS:
            height = max(1, round(image.height * width / image.width))
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            target = responsive_target(source, width)
            target.parent.mkdir(parents=True, exist_ok=True)
            resized.save(target, 'AVIF', quality=68, speed=6)
            outputs.append(target)
    return outputs

for name, widths in [('logo-eleva', [384, 640, 1280]), ('whatsapp-icon', [96, 128, 192, 384])]:
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
    for width in [960, 1600, 2400]:
        resized = image.copy()
        resized.thumbnail((width, width), Image.Resampling.LANCZOS)
        resized.save(ROOT / f'hero/hero-01-{width}.webp', 'WEBP', quality=95, method=6)
        resized.save(ROOT / f'hero/hero-01-{width}.avif', 'AVIF', quality=68, speed=6)
    for width in [720, 1080, 1440]:
        mobile = ImageOps.fit(
            image,
            (width, round(width * 16 / 9)),
            Image.Resampling.LANCZOS,
            centering=(0.5, 0.5),
        )
        mobile.save(ROOT / f'hero/hero-01-mobile-{width}.avif', 'AVIF', quality=62, speed=6)

sources = [
    path
    for directory in ('projects', 'services', 'about')
    for path in (ROOT / directory).rglob('*')
    if path.is_file() and path.suffix.lower() in {'.jpg', '.jpeg', '.jfif', '.png', '.webp'}
]

with ThreadPoolExecutor(max_workers=4) as executor:
    generated = [target for outputs in executor.map(optimize_responsive, sources) for target in outputs]

print(f'Regenerated brand/hero assets and {len(generated)} responsive AVIF images; originals retained.')
