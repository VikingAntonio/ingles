
import sys
import time
from playwright.sync_api import sync_playwright

def test_admin_panel():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Enable console logging to debug JS errors
        page.on("console", lambda msg: print(f"JS CONSOLE: {msg.text}"))

        # 1. Load Admin Panel
        page.goto("http://localhost:8080/adminPanel.html")
        page.wait_for_selector("#subject-list")
        print("Admin Panel loaded.")

        # 2. Add New Subject
        page.click("button[onclick='addNewSubject()']")
        page.wait_for_selector("#modal-subject.active")
        page.fill("#subject-title-input", "Playwright Test Subject")
        page.fill("#subject-description-input", "Automated description")
        page.click("button[onclick='saveSubject()']")

        page.wait_for_selector("text=Playwright Test Subject", timeout=15000)
        print("Subject created successfully.")

        # 3. Select Subject and Add Level
        page.click("text=Playwright Test Subject")
        page.wait_for_selector("#levels-section", state="visible")
        page.click("xpath=//div[@id='levels-section']//button[contains(@onclick, 'addNewLevel()')]")

        page.wait_for_selector("text=Nivel 1", timeout=15000)
        print("Level created successfully.")

        # 4. Select Level and Add Question
        page.click("text=Nivel 1")
        page.wait_for_selector("#level-editor", state="visible")
        page.click("xpath=//div[@id='level-editor']//button[contains(@onclick, 'addNewQuestion()')]")
        page.wait_for_selector("#modal-question.active")

        page.fill("#q-title", "Test Question 1")
        page.fill("#q-instruction", "Instruction 1")

        # Set a breakpoint or screenshot if it fails here
        page.screenshot(path="before_question_save.png")
        page.click("button[onclick='saveQuestion()']")

        # Wait and screenshot to see if error popped up
        time.sleep(5)
        page.screenshot(path="after_question_save.png")

        # Try to close modal forcefully if it's stuck due to alert
        # Actually the script would stop if there is an unhandled alert
        # But we don't have an alert handler yet for this part.

        page.wait_for_selector("#modal-question", state="hidden", timeout=15000)
        print("Question created successfully.")

        # 5. Handle Dialog for deletion
        page.on("dialog", lambda dialog: dialog.accept())

        # 6. Clean up (Delete Subject)
        page.locator("li:has-text('Playwright Test Subject') button.delete").click()

        time.sleep(5)

        subject_text_after = page.inner_text("#subject-list")
        if "Playwright Test Subject" in subject_text_after:
             print("FAILED: Subject still exists after deletion")
             browser.close()
             sys.exit(1)

        print("Cleanup successful.")
        browser.close()

if __name__ == "__main__":
    test_admin_panel()
