# ⚡ Quick Start - Contact Form Setup

## 🎯 What You Need to Do

Follow these 4 simple steps to connect your contact form to Google Sheets:

---

### 1️⃣ Create Google Sheet
- Go to: https://sheets.google.com
- Create new sheet: **"PetVitals Contact Form Responses"**
- Add headers in Row 1: `Timestamp | Name | Email | Interest | Pet Type | Message`

---

### 2️⃣ Setup Apps Script
1. In Google Sheet: **Extensions** → **Apps Script**
2. Delete existing code
3. Copy & paste code from `google-apps-script.js`
4. **Save** (name it "PetVitals Form Handler")

---

### 3️⃣ Deploy Web App
1. Click **Deploy** → **New deployment**
2. Select type: **Web app**
3. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy** → **Authorize** → **Allow**
5. **Copy the Web App URL** ✨

---

### 4️⃣ Update Website
1. Open `app.js`
2. Find line 211:
   ```javascript
   const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace with your Web App URL
4. **Save**

---

## ✅ Test It!
1. Open `index.html` in browser
2. Fill out contact form
3. Submit
4. Check Google Sheet for new entry!

---

## 📧 Want Email Notifications?
In `google-apps-script.js`:
1. Line 68: Remove `//` from `// sendEmailNotification(params);`
2. Line 86: Change email to yours
3. Save & re-deploy (Deploy → Manage deployments → Edit → New version)

---

## 🆘 Issues?
- **Not working?** Check `SETUP_GUIDE.md` for detailed troubleshooting
- **CORS errors?** Make sure deployment is set to "Anyone" can access
- **No data in sheet?** Verify column headers match exactly

---

## 📋 Checklist
- [ ] Google Sheet created with correct headers
- [ ] Apps Script code copied and saved
- [ ] Web App deployed with "Anyone" access
- [ ] Web App URL copied
- [ ] `app.js` updated with Web App URL
- [ ] Form tested and working
- [ ] Data appears in Google Sheet

---

**Need more help?** See the complete `SETUP_GUIDE.md` for detailed instructions and troubleshooting.
