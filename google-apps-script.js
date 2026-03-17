function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var rows = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j];
    }
    row["rowIndex"] = i + 1;
    rows.push(row);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ success: true, data: rows }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var action = e.parameter.action;
    
    if (action === "addInquiry") {
      var name = e.parameter.name || "";
      var email = e.parameter.email || "";
      var phone = e.parameter.phone || "";
      var service = e.parameter.service || "";
      var message = e.parameter.message || "";
      var timestamp = new Date();

      sheet.appendRow([timestamp, name, email, phone, service, message]);
      
      return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Inquiry added" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (action === "addProject") {
      var projectName = e.parameter.projectName || "";
      var projectDesc = e.parameter.projectDesc || "";
      var projectImage = e.parameter.projectImage || "";
      var projectCategory = e.parameter.projectCategory || "";
      var timestamp = new Date();

      sheet.appendRow([timestamp, "PROJECT", projectName, projectDesc, projectCategory, projectImage]);
      
      return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Project added" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (action === "update") {
      var rowIndex = parseInt(e.parameter.rowIndex);
      var field = e.parameter.field;
      var value = e.parameter.value;
      
      var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var colIndex = headers.indexOf(field) + 1;
      
      if (colIndex > 0 && rowIndex > 1) {
        sheet.getRange(rowIndex, colIndex).setValue(value);
        return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Updated" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Invalid field or row" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (action === "delete") {
      var rowIndex = parseInt(e.parameter.rowIndex);
      
      if (rowIndex > 1) {
        sheet.deleteRow(rowIndex);
        return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Deleted" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Invalid row" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Invalid action" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
