// This code goes in Google Apps Script, not in script.js
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  sheet.appendRow([
    e.parameter.timestamp,
    e.parameter.source,
    e.parameter.name,
    e.parameter.email,
    e.parameter.interest,
    e.parameter['pet-type'],
    e.parameter.message
  ]);
  return ContentService.createTextOutput("Success");
}