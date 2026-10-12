#!/usr/bin/env python3
"""Generate same-brand mobile icon, favicon and WhatsApp Open Graph thumbnail."""
from pathlib import Path
from io import BytesIO
import cairosvg
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
public = root / "public"
source = public / "brand-youssef.svg"
raw = source.read_bytes()
large = Image.open(BytesIO(cairosvg.svg2png(bytestring=raw, output_width=512, output_height=512))).convert("RGBA")
large.save(public / "icon-512.png")
large.resize((192,192), Image.Resampling.LANCZOS).save(public / "icon-192.png")
large.resize((180,180), Image.Resampling.LANCZOS).save(public / "apple-touch-icon.png")
large.save(public / "favicon.ico", format="ICO", sizes=[(16,16),(32,32),(48,48),(64,64)])
img = Image.new("RGB", (1200, 630), "#285C4F")
d = ImageDraw.Draw(img)
d.rounded_rectangle((50, 50, 1150, 580), radius=42, fill="#F8F7F0")
logo = large.resize((250,250), Image.Resampling.LANCZOS)
img.paste(logo, (100, 192), logo)
font = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
d.text((410, 182), "Dr Youssef Tafnouti", font=ImageFont.truetype(bold, 52), fill="#285C4F")
d.text((413, 276), "Médecin dentiste", font=ImageFont.truetype(font, 38), fill="#285C4F")
d.line((413, 345, 1075, 345), fill="#C7B58D", width=5)
d.text((413, 390), "Cabinet dentaire à Ariana", font=ImageFont.truetype(font, 30), fill="#405750")
d.text((413, 440), "Soins • Contact • Rendez-vous", font=ImageFont.truetype(font, 24), fill="#405750")
img.save(public / "og-youssef-tafnouti.png", optimize=True)
print("Generated branded favicon, phone icons and WhatsApp preview")
