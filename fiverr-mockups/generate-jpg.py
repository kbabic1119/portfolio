#!/usr/bin/env python3
"""
Generate JPG images from Fiverr gig HTML mockups.
Requirements: pip install html2image Pillow
Usage: python generate-jpg.py
"""

import os
import sys
from pathlib import Path

# Fix encoding for Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

try:
    from html2image import Html2Image
except ImportError:
    print("Error: html2image not installed.")
    print("Please install it with: pip install html2image")
    exit(1)


def main():
    # Get the directory where this script is located
    script_dir = Path(__file__).parent.absolute()
    
    # Output directory for JPG files
    output_dir = script_dir / "output"
    output_dir.mkdir(exist_ok=True)
    
    # Initialize Html2Image
    hti = Html2Image(
        output_path=str(output_dir),
        size=(1200, 800)  # Fiverr recommended size
    )
    
    # Define the HTML files to convert
    gig_files = [
        {
            "html": "gig-1-ecommerce.html",
            "output": "fiverr-gig-1-ecommerce.jpg"
        },
        {
            "html": "gig-2-landing-page.html",
            "output": "fiverr-gig-2-landing-page.jpg"
        },
        {
            "html": "gig-3-booking-website.html",
            "output": "fiverr-gig-3-booking.jpg"
        }
    ]
    
    print("=" * 50)
    print("Fiverr Gig Image Generator")
    print("=" * 50)
    print(f"Output directory: {output_dir}")
    print(f"Image size: 1200 x 800 px")
    print()
    
    for gig in gig_files:
        html_path = script_dir / gig["html"]
        
        if not html_path.exists():
            print(f"[X] File not found: {gig['html']}")
            continue
        
        print(f"[*] Processing: {gig['html']}")
        
        # Read HTML content
        with open(html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Save HTML to output directory temporarily (for relative paths to work)
        temp_html = output_dir / gig["html"]
        with open(temp_html, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        # Take screenshot
        try:
            # Use the temp HTML file path
            hti.screenshot(
                html_file=str(temp_html),
                save_as=gig["output"].replace('.jpg', '.png')
            )
            
            # Rename PNG to JPG (html2image outputs PNG)
            png_path = output_dir / gig["output"].replace('.jpg', '.png')
            jpg_path = output_dir / gig["output"]
            
            if png_path.exists():
                # Convert PNG to JPG using PIL
                try:
                    from PIL import Image
                    img = Image.open(png_path)
                    # Convert to RGB (remove alpha channel)
                    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                    rgb_img.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
                    rgb_img.save(jpg_path, 'JPEG', quality=95)
                    png_path.unlink()  # Delete PNG
                    print(f"    [OK] Created: {gig['output']}")
                except ImportError:
                    # If PIL not available, keep as PNG
                    print(f"    [OK] Created: {gig['output'].replace('.jpg', '.png')} (PNG format)")
                    print(f"    [!] Install Pillow for JPG: pip install Pillow")
            else:
                print(f"    [X] Failed to create image")
                
        except Exception as e:
            print(f"    [X] Error: {e}")
        
        # Clean up temp HTML
        if temp_html.exists():
            temp_html.unlink()
        
        print()
    
    print("=" * 50)
    print("[OK] Done! Images are ready for Fiverr upload.")
    print(f"[!] Location: {output_dir}")
    print("=" * 50)


if __name__ == "__main__":
    main()
