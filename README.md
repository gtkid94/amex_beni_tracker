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
* **Row 5 (Max Benefit):** The limit for that credit (e.g., 25.00 for Streaming).



---

## 💻 Installation
> **CRITICAL:** This script **must** be added directly to your **Monthly Amex Rewards Tracker Spreadsheet**. Do not create a standalone script file in Google Drive, or it will not be able to "see" your tracking data.

1.  Open your **Monthly Amex Rewards Tracker Spreadsheet**.
2.  In the top menu, go to **Extensions** > **Apps Script**.
3.  Delete any code in the editor and paste the provided script code.
4.  Click the **Save** (floppy disk) icon and name the project "Amex Reminder Bot".
5.  Click the **Run** button at the top.
    * *Note: You will see a "Permissions required" popup. Click **Review Permissions** > Select your Google Account > **Advanced** > **Go to Amex Reminder Bot (unsafe)** > **Allow**.*

---

## ⏰ Setting the Automation (The Trigger)
The script won't run on its own until you set a "Trigger":
1.  In the Apps Script editor, click the **Triggers** icon (the clock ⏰ on the left sidebar).
2.  Click **+ Add Trigger** at the bottom right.
3.  Set **Choose which function to run** to `sendAmexReminders`.
4.  Set **Select event source** to `Time-driven`.
5.  Set **Select type of time based trigger** to `Month timer`.
6.  Set **Select day of month** to `1st`.
7.  Select a time (e.g., 9am to 10am) and click **Save**.



---

## ⚠️ Important Notes
* **Data Types:** Row 4 and Row 5 must contain numbers/currency. Avoid putting text like "N/A" in those specific rows.
* **New Years:** On January 1st, simply create a new tab for the new year (e.g., "2027") with the same header structure. The script will find it automatically.
* **Shared Logic:** The script checks **Row 4** for the whole group. If you mark a credit as "Full" there, no one will get an email for that specific credit.
