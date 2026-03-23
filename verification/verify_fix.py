from playwright.sync_api import sync_playwright
import time

def verify_fix():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        try:
            # 1. Load the app
            page.goto("http://localhost:8080/index.html")
            print("Page loaded")
            time.sleep(5) # Wait for Supabase sync

            # Print page content to debug
            # print(page.content())

            # Use data-subject selector instead of text
            page.click(".card[data-subject='database']")
            print("Clicked DB subject")
            time.sleep(2)

            # Click on Level 2 (which had the error)
            page.click("text=SQL queries")
            print("Clicked Level 2")
            time.sleep(2)

            # 4. Fill candidate form
            page.fill("#candidate-name", "Verification User")
            page.fill("#evaluator-name", "Jules Bot")
            page.fill("#target-position", "Software Engineer")
            page.click("button:has-text('Comenzar Examen')")
            print("Submitted form")
            time.sleep(3)

            # 5. Check if error is visible
            error_selector = "text=Error cargando ejercicio"
            if page.is_visible(error_selector):
                print("FAIL: Error is still visible!")
                msg = page.inner_text(".feedback-msg")
                print(f"Error message: {msg}")
            else:
                print("SUCCESS: Error is gone. Game area is visible.")

            page.screenshot(path="/home/jules/verification/fixed_game_view.png")

            # 6. Verify Admin Panel
            page.goto("http://localhost:8080/adminPanel.html")
            print("Admin Panel loaded")
            time.sleep(5)

            # Click on a subject then level to see questions
            page.click("#subject-list .sidebar-item") # Just click first subject
            time.sleep(2)
            page.click("#level-list .sidebar-item") # Just click first level
            time.sleep(2)

            # Click "Nueva Pregunta" to check for quiz-diagram option
            page.click("button:has-text('Nueva Pregunta')")
            print("Clicked Nueva Pregunta")
            time.sleep(2)

            # Check if quiz-diagram is in the select
            options = page.inner_text("#q-type")
            if "Diagrama Estático (Quiz)" in options:
                print("SUCCESS: quiz-diagram option found in Admin Panel.")
            else:
                print("FAIL: quiz-diagram option missing in Admin Panel.")

            page.screenshot(path="/home/jules/verification/admin_quiz_diagram_option.png")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="/home/jules/verification/error_screenshot.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_fix()
