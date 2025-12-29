# 💳 Amex Platinum Rewards Tracker Automator

This Google Apps Script automatically monitors your shared Amex Platinum benefits and sends a monthly reminder to a list of recipients. It only sends an email if there are **unused** credits for the current month or quarter, ensuring your group never leaves money on the table.

## 🚀 Features
* **Smart Detection:** Automatically identifies the current month and quarter.
* **Auto-Year Tracking:** Dynamically looks for a tab named after the current year (e.g., "2025", "2026").
* **Usage Logic:** Compares actual spend (**Row 4**) against the max benefit (**Row 5**).
* **Zero-Noise:** If all benefits for the period are used, no email is sent.
* **Direct Link:** Includes a link back to the spreadsheet for easy updating.

---

## 🛠️ Spreadsheet Setup
Your Google Sheet must follow this specific structure for the script to function:

### 1. The "Recipients" Tab
Create a tab named `Recipients`. This is who will receive the emails.

| Name (Column A) | Email (Column B) |
| :--- | :--- |
| Alex | alex@example.com |
| Jordan | jordan@example.com |

### 2. The Annual Tracker Tab (e.g., "2026")
Create a tab named with the 4-digit year. The structure must be:
* **Row 1 (Headers):** Must include these exact names:
    * `Stream Jan`, `Stream Feb` ... (thru Dec)
    * `Uber Jan`, `Uber Feb` ... (thru Dec)
    * `RESY Q1`, `RESY Q2`, `RESY Q3`, `RESY Q4`
    * `Lulu Q1`, `Lulu Q2`, `Lulu Q3`, `Lulu Q4`
    * `Hotel Q1/Q2`, `Hotel Q3/Q4`
* **Row 4 (Credit Amount):** Where you enter how much you have spent.
* **Row 5 (Max Benefit):** The limit for that credit (e.
