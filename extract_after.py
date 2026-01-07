from PIL import Image
import os

collage_path = "public/images/whitening-collage-final.jpg"
output_path = "public/images/whitening-after-extracted.jpg"

try:
    if os.path.exists(collage_path):
        with Image.open(collage_path) as img:
            width, height = img.size
            # Crop bottom half for 'After'
            img_after = img.crop((0, height // 2, width, height))
            img_after.save(output_path)
            print("Successfully extracted after image.")
    else:
        print("Collage file not found.")
except Exception as e:
    print(f"Error: {e}")
