from PIL import Image, ImageChops
import numpy as np
import os

def remove_background(img, tolerance=30):
    img = img.convert("RGBA")
    data = np.array(img)
    r, g, b, a = data.T
    
    # Assume top-left pixel is background color
    bg_r, bg_g, bg_b = r[0,0], g[0,0], b[0,0]
    
    # Calculate distance from background color
    diff = np.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
    
    # Create mask where difference is less than tolerance
    mask = diff < tolerance
    
    # Set alpha to 0 for background pixels
    data[..., 3][mask.T] = 0
    
    return Image.fromarray(data)

def crop_content(img):
    # Use numpy to find the bounding box of non-transparent pixels
    data = np.array(img)
    # Alpha channel is the 4th channel (index 3)
    alpha = data[..., 3]
    
    # Find rows and columns where alpha > 0
    non_empty_rows = np.any(alpha > 0, axis=1)
    non_empty_cols = np.any(alpha > 0, axis=0)
    
    if not np.any(non_empty_rows):
        return img # Empty image
        
    y_min, y_max = np.where(non_empty_rows)[0][[0, -1]]
    x_min, x_max = np.where(non_empty_cols)[0][[0, -1]]
    
    # Add a tiny padding if desired, or crop tight (user wants tight)
    # y_max and x_max are inclusive indices, so add 1 for slicing
    return img.crop((x_min, y_min, x_max + 1, y_max + 1))

if __name__ == "__main__":
    # Back to the main logo input
    src = r"C:\Users\Aakash\.gemini\antigravity\brain\aff0c800-0804-477d-b219-33c982528b67\media__1771088212643.jpg"
    
    logo_out = r"e:\Sentrazo\public\logo.png"
    favicon_out = r"e:\Sentrazo\public\favicon.png"
    
    try:
        print(f"Processing {src}...")
        img = Image.open(src)
        
        # 1. Remove Background
        img_transparent = remove_background(img, tolerance=40)
        
        # 2. Crop to content
        logo_cropped = crop_content(img_transparent)
        logo_cropped.save(logo_out)
        print(f"Saved transparent logo to {logo_out}")
        
        # 3. Extract Symbol (Left part)
        # Heuristic: Cut the leftmost square-ish part
        width, height = logo_cropped.size
        # Assuming symbol is roughly square and on the left
        symbol_width = height * 1.2 # Give it a bit more width
        symbol = logo_cropped.crop((0, 0, min(width, symbol_width), height))
        
        # Crop symbol tightly again
        symbol = crop_content(symbol)
        
        symbol.save(favicon_out)
        print(f"Saved transparent symbol to {favicon_out}")
        
    except Exception as e:
        print(f"Error: {e}")
