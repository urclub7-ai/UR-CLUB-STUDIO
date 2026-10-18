import os
import time
import threading
import http.server
import socketserver
from playwright.sync_api import sync_playwright

PORT = 8089
DIRECTORY = os.path.abspath("azimian-markt")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    def log_message(self, format, *args):
        pass # suppress logs

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

# Start background local server
t = threading.Thread(target=start_server, daemon=True)
t.start()
time.sleep(0.5)

url = f"http://localhost:{PORT}/index.html"
print(f"Server running at: {url}")

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    
    # 1. Desktop High-Res View (1440x900)
    page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
    page.goto(url, wait_until="networkidle")
    time.sleep(2) # wait for remote images & webfonts

    # 1_desktop_hero
    p1 = os.path.join(DIRECTORY, "1_desktop_hero.png")
    page.screenshot(path=p1)
    print(f"Saved: {p1}")

    # 2_desktop_angebote
    page.locator("#angebote").scroll_into_view_if_needed()
    time.sleep(0.5)
    p2 = os.path.join(DIRECTORY, "2_desktop_angebote.png")
    page.screenshot(path=p2)
    print(f"Saved: {p2}")

    # 3_desktop_sortiment & fleischerei
    page.locator("#fleischerei").scroll_into_view_if_needed()
    time.sleep(0.5)
    p3 = os.path.join(DIRECTORY, "3_desktop_fleischerei.png")
    page.screenshot(path=p3)
    print(f"Saved: {p3}")

    # 4_desktop_reviews & anfahrt
    page.locator("#bewertungen").scroll_into_view_if_needed()
    time.sleep(0.5)
    p4 = os.path.join(DIRECTORY, "4_desktop_bewertungen_kontakt.png")
    page.screenshot(path=p4)
    print(f"Saved: {p4}")

    # 5_fullpage
    p5 = os.path.join(DIRECTORY, "5_desktop_fullpage.png")
    page.screenshot(path=p5, full_page=True)
    print(f"Saved: {p5}")

    # 6. Mobile View (iPhone 14 / modern smartphone 390x844)
    mobile_page = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    mobile_page.goto(url, wait_until="networkidle")
    time.sleep(2)

    p6 = os.path.join(DIRECTORY, "6_mobile_hero.png")
    mobile_page.screenshot(path=p6)
    print(f"Saved: {p6}")

    # Mobile deals
    mobile_page.locator("#angebote").scroll_into_view_if_needed()
    time.sleep(0.5)
    p7 = os.path.join(DIRECTORY, "7_mobile_angebote.png")
    mobile_page.screenshot(path=p7)
    print(f"Saved: {p7}")

    p8 = os.path.join(DIRECTORY, "8_mobile_fullpage.png")
    mobile_page.screenshot(path=p8, full_page=True)
    print(f"Saved: {p8}")

    browser.close()

print("All screenshots successfully created!")
