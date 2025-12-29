function sendAmexReminders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const recipientSheet = ss.getSheetByName("Recipients");
  
  // 1. Identify the current year and find the corresponding sheet
  const currentYear = new Date().getFullYear().toString(); 
  const dataSheet = ss.getSheetByName(currentYear);
  
  // Safety check: If a sheet for the current year doesn't exist, stop the script
  if (!dataSheet) {
    console.error(`Error: Sheet named "${currentYear}" not found.`);
    return;
  }

  const spreadsheetUrl = ss.getUrl();
  const amexData = dataSheet.getDataRange().getValues();
  
  // 2. Map the data based on your row requirements
  const headers = amexData[1];      // Row 1 (Headers)
  const sharedUsage = amexData[3];  // Row 4 (Actual Spent)
  const maxBenefits = amexData[4];  // Row 5 (Max Limits)
  
  // 3. Determine current month and quarter
  const now = new Date();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthName = monthNames[now.getMonth()];
  const currentQuarter = Math.floor((now.getMonth() / 3)) + 1;

  // 4. Build the Checklist
  let checklist = [];
  
  // Monthly items
  checklist.push(getBenefitStatus(headers, maxBenefits, sharedUsage, `Stream ${currentMonthName}`, "Digital Entertainment"));
  checklist.push(getBenefitStatus(headers, maxBenefits, sharedUsage, `Uber ${currentMonthName}`, "Uber/Uber Eats"));
  
  // Quarterly items
  checklist.push(getBenefitStatus(headers, maxBenefits, sharedUsage, `RESY Q${currentQuarter}`, "RESY"));
  checklist.push(getBenefitStatus(headers, maxBenefits, sharedUsage, `Lulu Q${currentQuarter}`, "Lulu"));

  // Semi-Annual Hotel Credit
  const hotelColName = (now.getMonth() < 6) ? "Hotel Q1/Q2" : "Hotel Q3/Q4";
  checklist.push(getBenefitStatus(headers, maxBenefits, sharedUsage, hotelColName, "Fine Hotels & Resorts"));

  // Filter out the items that are already fully used
  const remainingItems = checklist.filter(item => item !== "");

  // 5. Send to all recipients
  if (remainingItems.length > 0) {
    const recipientsData = recipientSheet.getDataRange().getValues();
    const subject = `💳 Action Required: Amex Credits for ${currentMonthName} ${currentYear}`;
    
    for (let i = 1; i < recipientsData.length; i++) {
      const name = recipientsData[i][0];
      const email = recipientsData[i][1];
      
      if (email && email.includes("@")) {
        const body = `Hi ${name},\n\n` +
                     `This quarter is ending soon! This is your reminder to use your Amex Platinum credits before they expire at the end of next month.\n\n` +
                     `Quick Checklist of remaining items:\n` +
                     remainingItems.join("\n") + 
                     `\n✅ Any expiring Amex Offers\n\n` +
                     `Log in here: https://www.americanexpress.com/\n\n` +
                     `---\n` +
                     `Update the shared tracker here: ${spreadsheetUrl}`;
        
        MailApp.sendEmail(email, subject, body);
      }
    }
    console.log(`Monthly status emails sent using data from sheet: ${currentYear}`);
  } else {
    console.log(`All credits for ${currentMonthName} are fully used. No email sent.`);
  }
}

/**
 * Helper to compare shared usage (Row 4) against Max Benefit (Row 5)
 */
function getBenefitStatus(headers, maxRow, usageRow, columnName, label) {
  const colIndex = headers.indexOf(columnName);
  // If the header isn't found, skip it
  if (colIndex === -1) return "";

  const maxVal = maxRow[colIndex];
  const userVal = usageRow[colIndex] || 0;

  // Only return a string if the benefit hasn't been fully utilized
  if (userVal < maxVal) {
    const remaining = maxVal - userVal;
    // Format to 2 decimal places for currency
    return `❌ ${label}: $${Number(userVal).toFixed(2)} used of $${Number(maxVal).toFixed(2)} ($${Number(remaining).toFixed(2)} remaining)`;
  }
  return "";
}
