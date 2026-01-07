from PIL import Image
import sys
import os

input_path = r"C:\Users\gauri\.gemini\antigravity\brain\2580a30e-ad7a-46e5-944f-33fd0cc59d1f\uploaded_image_1_1767778668552.jpg"
output_dir = r"c:\Smile Hub\public\images"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

try:
    with Image.open(input_path) as img:
        width, height = img.size
        mid_point = height // 2
        
        # Split top/bottom
        img_before = img.crop((0, 0, width, mid_point))
        img_after = img.crop((0, mid_point, width, height))
        
        img_before.save(os.path.join(output_dir, "whitening-before.jpg"))
        img_after.save(os.path.join(output_dir, "whitening-after.jpg"))
        print("Success")
except Exception as e:
    print(f"Error: {e}")
