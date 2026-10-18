import asyncio
from playwright.async_api import async_playwright
from PIL import Image

async def render():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1080, "height": 1920})
        await page.goto("file:///c:/Users/0731g/nazifyosufi/poster_1080x1920.html")
        await page.wait_for_timeout(500)
        
        # Take screenshot of .poster-canvas
        element = await page.query_selector(".poster-canvas")
        await element.screenshot(path="c:/Users/0731g/nazifyosufi/urclub_poster_1080x1920.png")
        print("PNG 1080x1920 exact screenshot saved!")

        # Save PDF for Canva import
        await page.pdf(
            path="c:/Users/0731g/nazifyosufi/urclub_poster_canva.pdf",
            width="1080px",
            height="1920px",
            print_background=True,
            margin={"top": "0px", "right": "0px", "bottom": "0px", "left": "0px"}
        )
        print("PDF for Canva saved!")

        await browser.close()

asyncio.run(render())

# Verify exact size
im = Image.open('c:/Users/0731g/nazifyosufi/urclub_poster_1080x1920.png')
print('Final exact PNG resolution:', im.size)
