from playwright.sync_api import Page, expect, sync_playwright
import time

def verify_pages(page: Page):
    # Verify Home Page
    page.goto("http://localhost:8000/index.html")
    expect(page).to_have_title("Plataforma de Aprendizaje Técnico")
    page.screenshot(path="/home/jules/verification/home.png")
    print("Home page verified")

    # Verify Candidate Modal
    page.click("div.card[data-subject='programming']")
    # Wait for level cards
    page.wait_for_selector(".level-card")
    page.click(".level-card:first-child")

    # Wait for candidate modal
    expect(page.locator("#candidate-modal")).to_have_class("modal active")
    page.screenshot(path="/home/jules/verification/candidate_modal.png")
    print("Candidate modal verified")

    # Verify Score Page
    page.goto("http://localhost:8000/score.html")
    # It will show "Cargando resultados..." or the timeout message since we don't have real Supabase data here
    # but we can verify the UI structure.
    expect(page.locator("h1")).to_contain_text("Dashboard de Resultados")

    # Wait a bit to see if our timeout message appears (it shouldn't if we don't wait 6s, but let's wait 7s to test it)
    print("Waiting for timeout message in score.html...")
    time.sleep(7)
    page.screenshot(path="/home/jules/verification/score_page.png")
    print("Score page verified")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_pages(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
