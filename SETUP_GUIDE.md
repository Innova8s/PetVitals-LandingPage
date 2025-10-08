# PetVitals Contact Form Setup Guide

## Overview
This guide will help you connect your PetVitals contact form to Google Sheets using Google Apps Script. When visitors submit the contact form, their information will be automatically saved to a Google Sheet and you'll receive notifications.

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it **"PetVitals Contact Form Responses"**
4. In Row 1, add the following column headers:
   - **A1:** `Timestamp`
   - **B1:** `Name`
   - **C1:** `Email`
   - **D1:** `Interest`
   - **E1:** `Pet Type`
   - **F1:** `Message`

Your sheet should look like this:

```
| Timestamp | Name | Email | Interest | Pet Type | Message |
|-----------|------|-------|----------|----------|---------|
|           |      |       |          |          |         |
```

---

## Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. You'll see a new tab open with the Apps Script editor
3. Delete any existing code in the editor
4. Open the `google-apps-script.js` file from your project folder
5. Copy ALL the code from that file
6. Paste it into the Apps Script editor
7. Click the **💾 Save** icon (or press `Ctrl+S` / `Cmd+S`)
8. Name the project **"PetVitals Form Handler"**

---

## Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the **⚙️ gear icon** next to "Select type"
3. Choose **"Web app"**
4. Fill in the deployment settings:
   - **Description:** `PetVitals Contact Form Handler`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone`
5. Click **Deploy**
6. You may see a warning: "Authorization required"
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to PetVitals Form Handler (unsafe)**
   - Click **Allow**
7. **IMPORTANT:** Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/AKfycbz.../exec`)
8. Click **Done**

---

## Step 4: Update Your Website Code

1. Open the `app.js` file in your project
2. Find line **211** which looks like this:
   ```javascript
   const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'` with your Web App URL from Step 3
4. It should look like this:
   ```javascript
   const scriptURL = 'https://script.google.com/macros/s/AKfycbz.../exec';
   ```
5. **Save** the `app.js` file

---

## Step 5: Test Your Form

1. Open your `index.html` file in a web browser
2. Scroll to the **Contact** section
3. Fill out the form with test data:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Interest:** Pet Parent Solutions
   - **Pet Type:** Dog
   - **Message:** This is a test message
4. Click **Send Message**
5. You should see:
   - A loading spinner
   - A success message: "Message Sent Successfully!"
   - A notification in the top-right corner
6. Check your Google Sheet - you should see a new row with the submitted data!

---

## Step 6: Enable Email Notifications (Optional)

If you want to receive email notifications when someone submits the form:

1. Open the `google-apps-script.js` file in the Apps Script editor
2. Find this line (around line 68):
   ```javascript
   // sendEmailNotification(params);
   ```
3. Remove the `//` to uncomment it:
   ```javascript
   sendEmailNotification(params);
   ```
4. Change the recipient email on line 86 to your email:
   ```javascript
   var recipient = "your-email@example.com"; // Change this to your email
   ```
5. Save the script
6. **Re-deploy** the web app:
   - Click **Deploy** → **Manage deployments**
   - Click the **✏️ Edit** icon (pencil)
   - Under "Version", select **New version**
   - Click **Deploy**
   - Click **Done**

---

## Troubleshooting

### Issue: Form shows "Failed to Send" message

**Solution:**
1. Check that the Web App URL in `app.js` is correct
2. Make sure you deployed the Apps Script as "Anyone" can access
3. Check the browser console for errors (press F12)

### Issue: No data appears in Google Sheet

**Solution:**
1. Verify the column headers match exactly (Timestamp, Name, Email, Interest, Pet Type, Message)
2. Make sure you're looking at the correct Google Sheet
3. Check that the Apps Script is properly saved and deployed

### Issue: CORS or Authorization errors

**Solution:**
1. Re-deploy the Apps Script with "Anyone" access
2. Clear your browser cache
3. Try submitting from an incognito/private window

### Issue: Email notifications not working

**Solution:**
1. Make sure you uncommented the `sendEmailNotification(params);` line
2. Verify the recipient email address is correct
3. Check your spam folder
4. Re-deploy with a new version (Step 6)

---

## Security Notes

- The Web App URL is safe to include in your public website code
- Form submissions are sent directly to Google's servers
- Only you can access the Google Sheet and its data
- You can revoke access anytime from the Apps Script deployment settings

---

## Need Help?

If you encounter any issues:
1. Check the Apps Script logs: In the editor, click **View** → **Logs**
2. Test the script directly: In the editor, click **Run** → **testSetup**
3. Review the browser console (F12) for JavaScript errors
4. Ensure your Google Sheet is in the same Google account as the Apps Script

---

## What's Next?

Once everything is working:
- ✅ You'll receive all form submissions in your Google Sheet
- ✅ Visitors will see success/error notifications
- ✅ Form data is automatically timestamped
- ✅ Optional email notifications keep you informed in real-time

Enjoy your automated contact form! 🎉
