# EmailJS Setup Guide for Contact Form

## ✅ What I've Done

I've integrated EmailJS into your portfolio's contact form. The code is ready - you just need to complete the EmailJS setup to activate it.

## 📧 Setup Steps (5-10 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up Free"**
3. Create account with your email (or use Google/GitHub)
4. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook**
   - Or any other supported service
4. Click **"Connect Account"** and authorize
5. **Copy the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template configuration:

**Template Settings:**
- **Template Name:** Portfolio Contact Form
- **Subject:** 新しいお問い合わせ from {{from_name}}

**Email Template Content:**
```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

**Recipients:**
- **To Email:** Your email address (where you want to receive messages)
- You can add your email in the "To email" field

4. Click **"Save"**
5. **Copy the Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key
1. Go to **"Account"** → **"General"**
2. Find your **"Public Key"** (e.g., `abcdefg123456`)
3. **Copy the Public Key**

### Step 5: Update Your Code
Open `script.js` and replace these three values:

**Line 202:** Replace `YOUR_PUBLIC_KEY` with your actual public key
```javascript
emailjs.init("YOUR_PUBLIC_KEY_HERE");
```

**Line 231:** Replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID`
```javascript
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
```

**Final example:**
```javascript
// Line 202
emailjs.init("abcdefg123456");

// Line 231
emailjs.send("service_abc123", "template_xyz789", {
```

### Step 6: Test It!
1. Open your portfolio
2. Fill out the contact form
3. Click **"送信する"**
4. Check your email inbox - you should receive the message!

## 🎯 Features Implemented

✅ **Real Email Sending** - Messages are sent to your inbox via EmailJS
✅ **Loading State** - Shows "送信中..." with spinner during submission
✅ **Error Handling** - Shows error message if sending fails
✅ **Success Confirmation** - Shows success message when email is sent
✅ **Form Reset** - Automatically clears form after successful submission
✅ **Email Validation** - Validates all fields before sending
✅ **Free Tier** - 200 emails/month free (upgradable if needed)

## 📊 Free Tier Limits

- **200 emails per month** (enough for most personal portfolios)
- **2 email services**
- **2 email templates**
- No credit card required

## 🚀 After Setup

Once you've updated the three IDs in `script.js`:
1. Commit and push your changes
2. Your contact form will be fully functional!
3. All messages will be sent directly to your email

## 🔧 Troubleshooting

**"emailjs is not defined" error:**
- Make sure the EmailJS script is loading (check browser console)
- The script tag is already added to `index.html` line 692

**Not receiving emails:**
- Check your spam folder
- Verify your Service ID, Template ID, and Public Key are correct
- Make sure you authorized your email account in EmailJS dashboard
- Check EmailJS dashboard for delivery logs

**Rate limit reached:**
- Free tier: 200 emails/month
- Upgrade to paid plan if needed ($7/month for 1000 emails)

## 📝 Notes

- Your email address is protected (not visible in source code)
- Emails are sent through EmailJS servers (secure)
- No backend server required
- Works with static hosting (Vercel, Netlify, GitHub Pages)

---

Need help? Check [EmailJS Documentation](https://www.emailjs.com/docs/)

