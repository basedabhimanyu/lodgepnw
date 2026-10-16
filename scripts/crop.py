# Split a full-page screenshot into viewport-height chunks for review.
import sys
from PIL import Image
src, step = sys.argv[1], int(sys.argv[2])
im = Image.open(src)
w, h = im.size
for i, y in enumerate(range(0, h, step)):
    im.crop((0, y, w, min(y + step, h))).save(src.replace('.png', f'-{i:02d}.png'))
print(w, h, (h + step - 1) // step)
