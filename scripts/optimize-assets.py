"""Rebuild WebP derivatives from the preserved original PNG artwork (requires Pillow)."""
from pathlib import Path
from PIL import Image
before = after = 0
outdir = Path('assets/optimized')
outdir.mkdir(exist_ok=True)
for original in sorted(Path('assets').glob('*.png')):
    image = Image.open(original).convert('RGBA')
    background = 'background' in original.stem
    if not background and image.getextrema()[3][0] == 0:
        bounds = image.getbbox()
        if bounds:
            image = image.crop(bounds)
    image.thumbnail((1600, 1000) if background else (360, 360), Image.Resampling.LANCZOS)
    output = outdir / (original.stem + '.webp')
    image.save(output, 'WEBP', quality=85, method=6)
    before += original.stat().st_size
    after += output.stat().st_size
print(f'Originals: {before/1e6:.1f} MB; WebP: {after/1e6:.1f} MB')
