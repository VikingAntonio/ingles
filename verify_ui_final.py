
import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Inyectamos datos simulados
        mock_data = [
            {
                "created_at": "2026-02-02T12:49:15Z",
                "candidate_name": "Test User 1",
                "evaluator_name": "Evaluador A",
                "target_position": "Developer",
                "exam_type": "Programación",
                "score_percentage": 85,
                "correct_count": 17,
                "incorrect_count": 2,
                "empty_count": 1
            },
            {
                "created_at": "2026-02-02T12:49:15Z",
                "candidate_name": "Test User 2",
                "evaluator_name": "Evaluador B",
                "target_position": "Junior",
                "exam_type": "Bases de Datos",
                "score_percentage": 40,
                "correct_count": 4,
                "incorrect_count": 6,
                "empty_count": 0
            }
        ]

        # Load the page and inject the data before it loads results
        await page.add_init_script(f"window.supabaseData = {mock_data}")

        # Patch loadResults to use the window.supabaseData if it exists
        # Actually we need to patch the fetch logic in the page

        current_dir = os.getcwd()
        file_path = f"file://{current_dir}/docs/score.html"
        await page.goto(file_path)

        # Wait for the table to be visible
        try:
            await page.wait_for_selector("#results-table", state="visible", timeout=5000)
        except:
            print("Table not visible, maybe it didn't use the mock data. Trying to force render.")
            await page.evaluate(f"allResults = {mock_data}; filteredResults = allResults; renderResults(); document.getElementById('loading').style.display='none'; document.getElementById('results-table').style.display='table';")

        await page.screenshot(path="/home/jules/verification/score_table_final.png")
        print("Final screenshot saved.")

        # Check if the score is visible
        score_text = await page.inner_text("tbody tr:first-child .dashboard-score-badge")
        print(f"Score for User 1: {score_text}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
