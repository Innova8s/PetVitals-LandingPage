/**
 * Google Apps Script for PetVitals Contact Form
 * Enhanced version with auto-reply emails and robust error handling
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create or open your Google Sheet:
 *    - Go to https://sheets.google.com
 *    - Create new or open existing: "PetVitals Contact Form Responses"
 *    - Copy the Spreadsheet ID from the URL (between /d/ and /edit)
 *    - Update SPREADSHEET_ID below (line 60)
 *    - Make sure Sheet1 has these headers in Row 1:
 *      A1: TimeStamp | B1: Source | C1: Name | D1: Email | E1: Message
 * 
 * 2. Open Apps Script Editor:
 *    - In your Google Sheet, click "Extensions" > "Apps Script"
 *    - Delete any existing code
 *    - Paste this entire script
 *    - Click the disk icon to save
 *    - Name the project "PetVitals Form Handler"
 * 
 * 3. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Click gear icon next to "Select type" → "Web app"
 *    - Description: "PetVitals Contact Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy" → Authorize → Allow
 *    - Copy the Web App URL
 * 
 * 4. Update your website code:
 *    - Open app.js
 *    - Find line 211: const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
 *    - Replace with your Web App URL
 *    - Save
 * 
 * 5. Test:
 *    - Submit a test form on your website
 *    - Check Google Sheet for new entry
 *    - Check your email (and customer's email) for notifications
 */

// ===================================================================
// CONFIGURATION - UPDATE THIS WITH YOUR SPREADSHEET ID
// ===================================================================
const SPREADSHEET_ID = '1LHJWCf3Hu0dAieq4vvYsnGk5_ni4k-sloicubPtyKSE'; // Your PetVitals Spreadsheet ID
const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name
const NOTIFICATION_EMAIL = 'enquiry@innova8s.com'; // Your notification email

// ===================================================================
// MAIN FUNCTION - Handles POST requests from the website
// ===================================================================
function doPost(e) {
  try {
    // Check if event exists
    if (!e) {
      throw new Error('Invalid request: Missing event data');
    }
    
    let data;
    
    // Handle both JSON and FormData submissions
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error('Invalid request: No POST data found');
    }
    
    // Log received data for debugging
    console.log('Received data:', JSON.stringify(data));
    
    // Get the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" not found in spreadsheet`);
    }
    
    // Prepare the row data (5 columns to match your sheet format)
    const rowData = [
      new Date(),                      // Timestamp
      data.source || 'PetVitals',      // Source
      data.name || '',                 // Name
      data.email || '',                // Email
      data.message || ''               // Message
    ];
    
    console.log('Row data to append:', rowData);
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    console.log('Data successfully appended to sheet');
    
    // Send email notification to company
    sendEmailNotification(data);
    
    // Send auto-reply to customer
    sendAutoReply(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success',
        'message': 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===================================================================
// Handle GET requests (for testing)
// ===================================================================
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      'status': 'success', 
      'message': 'PetVitals Form Handler is running. Use POST to submit form data.',
      'timestamp': new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===================================================================
// Send email notification to company
// ===================================================================
function sendEmailNotification(data) {
  try {
    const subject = `New PetVitals Contact Form Submission`;
    
    const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #6C63FF; margin: 0;">🐾 New PetVitals Inquiry</h2>
          </div>
          
          <div style="background: linear-gradient(135deg, #6C63FF 0%, #00C9A7 100%); height: 4px; margin-bottom: 20px; border-radius: 2px;"></div>
          
          <p style="color: #666; margin-bottom: 20px; font-size: 14px;">You have received a new message from your PetVitals website:</p>
          
          <div style="background-color: #f8f9ff; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #333; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #666;">${data.name || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #333; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #666;"><a href="mailto:${data.email}" style="color: #6C63FF; text-decoration: none;">${data.email || 'N/A'}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #333; font-weight: bold;">Timestamp:</td>
                <td style="padding: 8px 0; color: #666;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #fff; border-left: 4px solid #6C63FF; padding: 20px; margin-top: 15px; border-radius: 4px;">
            <p style="margin: 0 0 10px 0; color: #333; font-weight: bold;">Message:</p>
            <p style="margin: 0; color: #666; line-height: 1.6;">${data.message || 'N/A'}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
              This email was automatically generated from the PetVitals contact form<br>
              An auto-reply has been sent to the customer
            </p>
          </div>
        </div>
      </body>
    </html>
    `;
    
    const plainBody = `
New PetVitals Contact Form Submission

Name: ${data.name || 'N/A'}
Email: ${data.email || 'N/A'}
Timestamp: ${new Date().toLocaleString()}

Message:
${data.message || 'N/A'}

---
This email was automatically generated from the PetVitals contact form.
An auto-reply has been sent to the customer.
    `;
    
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });
    
    console.log('Notification email sent to:', NOTIFICATION_EMAIL);
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

// ===================================================================
// Send auto-reply to customer
// ===================================================================
function sendAutoReply(data) {
  try {
    const subject = 'Thank you for contacting PetVitals - We\'ll get back to you soon! 🐾';
    
    const htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6C63FF; margin: 0; font-size: 28px;">🐾 PetVitals</h1>
            <p style="color: #00C9A7; margin: 10px 0 0 0; font-size: 14px; font-weight: bold;">AI-Powered Pet Health Management</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #6C63FF 0%, #00C9A7 100%); height: 4px; margin-bottom: 25px; border-radius: 2px;"></div>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Dear ${data.name},</p>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to <strong style="color: #6C63FF;">PetVitals</strong>! We have received your message and truly appreciate your interest in our AI-powered pet health management solutions.
          </p>
          
          <div style="background-color: #f8f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #6C63FF;">
            <p style="margin: 0 0 10px 0; color: #333; font-weight: bold; font-size: 14px;">Your Message:</p>
            <p style="margin: 0; color: #666; font-style: italic; line-height: 1.6;">"${data.message}"</p>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            Our team will review your inquiry and get back to you <strong>within 24 hours</strong>. In the meantime, feel free to explore our innovative pet health technologies designed to help pet parents, veterinarians, and clinics provide the best care possible.
          </p>
          
          <div style="background: linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(0, 201, 167, 0.1) 100%); padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <p style="margin: 0 0 15px 0; color: #333; font-weight: bold; font-size: 16px;">🌟 What PetVitals offers:</p>
            <ul style="margin: 0; padding-left: 20px; color: #666; line-height: 1.8;">
              <li><strong>Predictive Health Monitoring</strong> with AI-powered early detection</li>
              <li><strong>Smart Symptom Assessment</strong> for intelligent health guidance</li>
              <li><strong>Breed-Specific Insights</strong> tailored to your pet's unique needs</li>
              <li><strong>Visual Health Analysis</strong> using advanced AI vision technology</li>
              <li><strong>24/7 Monitoring</strong> for continuous peace of mind</li>
              <li><strong>Veterinary Network Access</strong> to trusted professionals</li>
            </ul>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            If you have any urgent questions, please don't hesitate to contact us directly at <a href="mailto:enquiry@innova8s.com" style="color: #6C63FF; text-decoration: none; font-weight: bold;">enquiry@innova8s.com</a> or call us at <a href="tel:+61493182200" style="color: #6C63FF; text-decoration: none; font-weight: bold;">+61 493 182 200</a>.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #6C63FF 0%, #00C9A7 100%); color: white; padding: 14px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);">Learn More About PetVitals</a>
          </div>
          
          <div style="border-top: 2px solid #f0f0f0; padding-top: 20px; margin-top: 30px;">
            <p style="color: #333; font-weight: bold; margin: 0 0 10px 0;">Best regards,</p>
            <p style="color: #6C63FF; font-weight: bold; margin: 0;">The PetVitals Team</p>
            <p style="color: #00C9A7; font-weight: bold; margin: 5px 0;">Innova8s Pte Ltd</p>
            <p style="color: #999; font-size: 12px; margin: 15px 0 0 0;">
              Suite 302, 13/15 Wentworth Avenue, Sydney, NSW 2000, Australia
            </p>
          </div>
          
          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #999; font-size: 11px; text-align: center; line-height: 1.5;">
              This is an automated response. Please do not reply to this email.<br>
              For further assistance, contact us at enquiry@innova8s.com
            </p>
          </div>
        </div>
      </body>
    </html>
    `;
    
    const plainBody = `
Dear ${data.name},

Thank you for reaching out to PetVitals! We have received your message and truly appreciate your interest in our AI-powered pet health management solutions.

Your Message:
"${data.message}"

Our team will review your inquiry and get back to you within 24 hours. In the meantime, feel free to explore our innovative pet health technologies designed to help pet parents, veterinarians, and clinics provide the best care possible.

What PetVitals offers:
• Predictive Health Monitoring with AI-powered early detection
• Smart Symptom Assessment for intelligent health guidance
• Breed-Specific Insights tailored to your pet's unique needs
• Visual Health Analysis using advanced AI vision technology
• 24/7 Monitoring for continuous peace of mind
• Veterinary Network Access to trusted professionals

If you have any urgent questions, please don't hesitate to contact us directly at enquiry@innova8s.com or call us at +61 493 182 200.

Best regards,
The PetVitals Team
Innova8s Pte Ltd

Suite 302, 13/15 Wentworth Avenue, Sydney, NSW 2000, Australia

---
This is an automated response. Please do not reply to this email.
For further assistance, contact us at enquiry@innova8s.com
    `;
    
    // Send auto-reply email to the customer
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });
    
    console.log('Auto-reply sent to:', data.email);
    
  } catch (error) {
    console.error('Error sending auto-reply:', error);
  }
}

// ===================================================================
// Test function to verify setup (optional)
// ===================================================================
function testSetup() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    Logger.log("✅ Spreadsheet connected successfully");
    Logger.log("Sheet name: " + sheet.getName());
    Logger.log("Last row: " + sheet.getLastRow());
    Logger.log("Setup is working!");
    
    return "✅ Setup is working!";
  } catch (error) {
    Logger.log("❌ Error: " + error.toString());
    return "❌ Error: " + error.toString();
  }
}
