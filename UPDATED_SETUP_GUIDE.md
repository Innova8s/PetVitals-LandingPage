# 🎯 PetVitals Contact Form - Updated Setup Guide
## With Auto-Reply Emails & Professional Error Handling

---

## ✨ New Features
- ✅ **Auto-reply emails** sent to customers instantly
- ✅ **Email notifications** sent to you (enquiry@innova8s.com)
- ✅ **Professional HTML emails** with PetVitals branding
- ✅ **Better error handling** and logging
- ✅ **Source tracking** to identify form origin
- ✅ **Robust data validation**

---

## 📋 Step-by-Step Setup

### **Step 1: Create Google Sheet**

1. Go to https://sheets.google.com
2. Create a new spreadsheet
3. Name it: **"PetVitals Contact Form Responses"**
4. In Row 1, add these column headers **exactly**:

| A1 | B1 | C1 | D1 | E1 | F1 | G1 |
|----|----|----|----|----|----|----|
| **Timestamp** | **Source** | **Name** | **Email** | **Interest** | **Pet Type** | **Message** |

5. **IMPORTANT:** Copy the Spreadsheet ID from the URL
   - The URL looks like: `https://docs.google.com/spreadsheets/d/`**`1LHJWCf3Hu0dAieq4vvYsnGk5_ni4k-sloicubPtyKSE`**`/edit`
   - The bold part is your Spreadsheet ID
   - **Save it somewhere - you'll need it in Step 2!**

---

### **Step 2: Setup Apps Script**

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Open the file `google-apps-script.js` from your project
4. Copy **ALL** the code
5. Paste it into the Apps Script editor

#### **CRITICAL: Update Configuration**

6. Find these lines near the top (around line 46-48):

```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Sheet1';
const NOTIFICATION_EMAIL = 'enquiry@innova8s.com';
```

7. **Replace `'YOUR_SPREADSHEET_ID_HERE'`** with your actual Spreadsheet ID from Step 1

   **Before:**
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```
   
   **After:**
   ```javascript
   const SPREADSHEET_ID = '1LHJWCf3Hu0dAieq4vvYsnGk5_ni4k-sloicubPtyKSE';
   ```

8. If your sheet name is different from "Sheet1", update `SHEET_NAME`
9. If you want notifications sent to a different email, update `NOTIFICATION_EMAIL`
10. **Save** the script (Ctrl+S or Cmd+S)
11. Name the project: **"PetVitals Form Handler"**

---

### **Step 3: Deploy Web App**

1. Click **Deploy** → **New deployment**
2. Click the **⚙️ gear icon** next to "Select type"
3. Choose **"Web app"**
4. Fill in deployment settings:
   - **Description:** `PetVitals Contact Form Handler`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
5. Click **Deploy**

#### **Authorization Steps**

6. You'll see "Authorization required" - Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** (at the bottom)
9. Click **"Go to PetVitals Form Handler (unsafe)"**
10. Review permissions and click **Allow**

#### **Get Your Web App URL**

11. **IMPORTANT:** Copy the **Web App URL**
    - It looks like: `https://script.google.com/macros/s/AKfycbz.../exec`
    - **Save it - you'll need it in Step 4!**
12. Click **Done**

---

### **Step 4: Update Website Code**

1. Open `app.js` in your code editor
2. Press **Ctrl+F** (or Cmd+F) to open Find
3. Search for: `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`
4. Should jump to line 214
5. Replace the placeholder with your Web App URL from Step 3

**Before:**
```javascript
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

**After:**
```javascript
const scriptURL = 'https://script.google.com/macros/s/AKfycbz.../exec';
```

6. **Save** the file

---

### **Step 5: Test Everything**

#### **Test 1: Submit Form**

1. Open `index.html` in your web browser
2. Scroll to the Contact section
3. Fill out the form:
   - **Name:** Test User
   - **Email:** your-email@example.com (use your real email!)
   - **Interest:** Pet Parent Solutions
   - **Pet Type:** Dog
   - **Message:** This is a test of the auto-reply feature

4. Click **Send Message**
5. You should see:
   - ✅ Loading spinner: "Sending..."
   - ✅ Success message: "Message Sent Successfully!"
   - ✅ Green notification popup
   - ✅ Form clears automatically

#### **Test 2: Check Google Sheet**

1. Go back to your Google Sheet
2. Refresh the page (F5)
3. You should see a new row with:
   - Timestamp (current date/time)
   - Source: PetVitals
   - Name: Test User
   - Email: your-email@example.com
   - Interest: Pet Parent Solutions
   - Pet Type: Dog
   - Message: This is a test...

#### **Test 3: Check Emails**

1. **Check company notification email:**
   - Open email at: enquiry@innova8s.com
   - Subject: "New PetVitals Contact Form Submission - Pet Parent Solutions"
   - Beautiful HTML email with all form data
   - Should arrive within 1-2 minutes

2. **Check customer auto-reply:**
   - Open the email address you used in the test form
   - Subject: "Thank you for contacting PetVitals - We'll get back to you soon! 🐾"
   - Professional branded email with PetVitals features
   - Should arrive within 1-2 minutes

**Note:** Check spam/junk folder if emails don't appear in inbox!

---

## 🎨 Email Templates

### **Company Notification Email:**
- Professional design with PetVitals colors
- All form data in easy-to-read format
- Clickable email address
- Timestamp included

### **Customer Auto-Reply Email:**
- Branded with PetVitals logo colors
- Shows their submitted message
- Lists PetVitals features
- Contact information
- Professional signature

---

## 🔧 Customization Options

### **Change Email Recipients:**

In `google-apps-script.js` line 48:
```javascript
const NOTIFICATION_EMAIL = 'your-email@example.com';
```

### **Customize Auto-Reply:**

Edit the `sendAutoReply()` function (starting line 239) to:
- Change email subject
- Modify email content
- Add/remove features list
- Update contact information

### **Change Sheet Name:**

In `google-apps-script.js` line 47:
```javascript
const SHEET_NAME = 'YourSheetName';
```

---

## 🐛 Troubleshooting

### **Issue: "Failed to Send" Error**

**Solutions:**
1. ✅ Check Web App URL in `app.js` is correct (no extra spaces)
2. ✅ Verify deployment is set to "Anyone" can access
3. ✅ Check browser console (F12) for specific errors
4. ✅ Try redeploying: Deploy → Manage deployments → Edit → New version

### **Issue: No Data in Google Sheet**

**Solutions:**
1. ✅ Verify SPREADSHEET_ID in Apps Script is correct
2. ✅ Check column headers match exactly (case-sensitive)
3. ✅ Check Apps Script logs: View → Executions
4. ✅ Run testSetup() function in Apps Script

### **Issue: No Emails Received**

**Solutions:**
1. ✅ Check spam/junk folder
2. ✅ Verify NOTIFICATION_EMAIL is correct in Apps Script
3. ✅ Check customer email address was entered correctly
4. ✅ Look at Apps Script logs for email errors
5. ✅ Gmail may delay emails by 1-5 minutes

### **Issue: Error in Apps Script**

**Solutions:**
1. ✅ Check SPREADSHEET_ID format (no extra quotes/spaces)
2. ✅ Verify sheet name matches exactly
3. ✅ Run testSetup() to diagnose connection
4. ✅ Check Apps Script Executions for error details

---

## 📊 View Logs & Executions

### **Check if form submissions are working:**

1. Open Apps Script editor
2. Click **View** → **Executions**
3. See all form submissions with:
   - Timestamp
   - Status (Success/Error)
   - Execution time
   - Any error messages

### **Run Test Function:**

1. In Apps Script, select `testSetup` from function dropdown
2. Click **Run**
3. Check logs: View → Logs
4. Should see: "✅ Setup is working!"

---

## 🔐 Security Notes

- ✅ Web App URL is safe to include in public code
- ✅ Only you can access the Google Sheet
- ✅ Apps Script validates all data
- ✅ HTTPS encryption on all transmissions
- ✅ Email addresses are protected
- ✅ No sensitive data exposed

---

## 📈 Next Steps

### **Immediate:**
- [ ] Complete all 5 setup steps
- [ ] Test form thoroughly
- [ ] Verify emails are received
- [ ] Test on mobile device

### **Recommended:**
- [ ] Set up Google Sheets filters/views
- [ ] Create email response templates
- [ ] Add form to website navigation
- [ ] Monitor submissions weekly
- [ ] Backup sheet data monthly

### **Advanced (Optional):**
- [ ] Add reCAPTCHA for spam protection
- [ ] Connect to CRM system
- [ ] Create analytics dashboard
- [ ] Add Slack/Discord webhooks
- [ ] Setup automated follow-ups

---

## 💡 Pro Tips

1. **Test Monthly:** Submit a test form each month to ensure everything works
2. **Check Spam:** First few emails might go to spam - mark as "Not Spam"
3. **Backup Data:** Download sheet as Excel/CSV monthly
4. **Monitor Logs:** Check Apps Script Executions weekly
5. **Response Time:** Set up email alerts for new submissions
6. **Template Emails:** Create quick response templates in Gmail

---

## 📧 Email Examples

### **What Customers Receive:**

```
Subject: Thank you for contacting PetVitals - We'll get back to you soon! 🐾

Dear [Name],

Thank you for reaching out to PetVitals! We have received your message 
and truly appreciate your interest in our AI-powered pet health 
management solutions.

Your Message:
"[Their message]"

Our team will review your inquiry and get back to you within 24 hours...

[Full branded email with features list, contact info, etc.]
```

### **What You Receive:**

```
Subject: New PetVitals Contact Form Submission - [Interest Type]

🐾 New PetVitals Inquiry

You have received a new message from your PetVitals website:

Name: [Name]
Email: [Email]
Interested In: [Interest]
Pet Type: [Pet Type]
Timestamp: [Date/Time]

Message:
[Their message]

An auto-reply has been sent to the customer.
```

---

## ✅ Final Checklist

- [ ] Google Sheet created with 7 columns
- [ ] Spreadsheet ID copied
- [ ] Apps Script code pasted
- [ ] SPREADSHEET_ID updated in script
- [ ] SHEET_NAME verified (default: Sheet1)
- [ ] NOTIFICATION_EMAIL verified
- [ ] Script saved
- [ ] Web App deployed with "Anyone" access
- [ ] Web App URL copied
- [ ] `app.js` updated with Web App URL
- [ ] Test form submitted successfully
- [ ] Data appears in Google Sheet
- [ ] Company notification email received
- [ ] Customer auto-reply email received
- [ ] Mobile browser tested

---

**🎉 Congratulations! Your PetVitals contact form is now fully operational with auto-reply emails!**

For additional help, see:
- `README_CONTACT_FORM.md` - Complete overview
- `HOW_IT_WORKS.md` - Technical documentation
- `SETUP_CHECKLIST.txt` - Printable checklist

---

**Last Updated:** October 7, 2025
**Version:** 2.0 (Enhanced with Auto-Reply)
