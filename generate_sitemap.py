import os
from datetime import datetime

BASE_URL = "https://yourwebsite.com"  # Change this to your final domain

def get_html_files(directory="."):
    html_files = []
    for file in os.listdir(directory):
        if file.endswith(".html"):
            html_files.append(file)
    return html_files

def generate_sitemap(files):
    today = datetime.today().strftime('%Y-%m-%d')
    sitemap_entries = []
    for file in files:
        url = f"{BASE_URL}/{file if file != 'index.html' else ''}".rstrip('/')
        entry = f"""
  <url>
    <loc>{url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>"""
        sitemap_entries.append(entry)

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{''.join(sitemap_entries)}
</urlset>
"""

def main():
    html_files = get_html_files()
    sitemap = generate_sitemap(html_files)
    with open("sitemap.xml", "w") as f:
        f.write(sitemap)
    print("✅ sitemap.xml generated successfully!")

if __name__ == "__main__":
    main()
