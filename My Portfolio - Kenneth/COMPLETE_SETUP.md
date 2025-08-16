# 🎯 Complete EmailJS Setup - Two Templates

## Current Status
✅ Your JavaScript code is ready to send two emails
❌ You need to create a second template in EmailJS

## What You Need to Do

### Step 1: Create a New Template in EmailJS

1. **Go to EmailJS Dashboard**
   - Log in to [EmailJS Dashboard](https://dashboard.emailjs.com/)
   - Go to "Email Templates" tab
   - Click "Create New Template"

2. **Template Settings**
   - **Name**: `Contact Form Notification` (or any name you prefer)
   - **Subject**: `New Contact Form Message from {{from_name}}`
   - **Template ID**: Note this down (e.g., `template_xtx41fw`)

3. **Template Content**
   Copy and paste this content:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px">
  <a style="text-decoration: none; outline: none" href="[Website Link]" target="_blank">
    <img style="height: 32px; vertical-align: middle" height="32px" src="https://drive.google.com/uc?export=view&id=1_jlSHASKFkjVFpwVwdorvXXoMET-V2yX" alt="logo" />
  </a>
  <h2 style="color: #333; margin-top: 20px;">New Contact Form Message</h2>
  <p style="padding-top: 16px; border-top: 1px solid #eaeaea">
    You have received a new message from your portfolio website.
  </p>
  
  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <div style="margin-bottom: 15px;">
      <strong style="color: #3b82f6;">From:</strong><br>
      {{from_name}} ({{from_email}})
    </div>
    
    <div style="margin-bottom: 15px;">
      <strong style="color: #3b82f6;">Subject:</strong><br>
      {{subject}}
    </div>
    
    <div style="margin-bottom: 15px;">
      <strong style="color: #3b82f6;">Message:</strong><br>
      {{message}}
    </div>
    
    <div style="margin-bottom: 15px;">
      <strong style="color: #3b82f6;">Date:</strong><br>
      {{date}}
    </div>
  </div>
  
  <p style="padding-top: 16px; border-top: 1px solid #eaeaea">
    Best regards,<br /> John Kenneth D. Lacorte <br />0915-731-4082
  </p>
</div>
```

4. **Save the Template**
   - Click "Save" to create the template
   - Copy the **Template ID** (e.g., `template_xtx41fw`)

### Step 2: Update Your JavaScript Code

1. **Open your `script.js` file**
2. **Find this line** (around line 150):
   ```javascript
   const notificationPromise = emailjs.send('jk_lacorte', 'template_notification', notificationParams);
   ```
3. **Replace `'template_notification'`** with your actual template ID:
   ```javascript
   const notificationPromise = emailjs.send('jk_lacorte', 'template_xtx41fw', notificationParams);
   ```

### Step 3: Test Your Contact Form

1. **Open your portfolio website**
2. **Fill out the contact form**:
   - Name: "Test User"
   - Email: "test@example.com"
   - Subject: "Test Message"
   - Message: "This is a test message"
3. **Submit the form**
4. **Check both emails**:
   - **Sender** should receive an auto-reply
   - **You** (johnkennethlacortee@gmail.com) should receive the full contact form details

## How It Works

### Email 1: Auto-Reply to Sender
- **Template**: `template_rsf8awb` (your existing template)
- **Recipient**: The person who filled out the form
- **Content**: "Thank you for reaching out..."

### Email 2: Notification to You
- **Template**: Your new template (e.g., `template_xtx41fw`)
- **Recipient**: johnkennethlacortee@gmail.com
- **Content**: Full contact form details

## Template Variables

### Auto-Reply Template (existing):
- `{{name}}` - Sender's name
- `{{title}}` - Subject line

### Notification Template (new):
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Subject line
- `{{message}}` - Message content
- `{{date}}` - Current date

## Expected Results

**When someone submits your contact form:**

1. **Sender receives**:
   ```
   Hi John Doe,
   
   Thank you for reaching out! I have received your request: "Job Opportunity", and I'll do my best to answer it as soon as possible.
   
   Best regards,
   John Kenneth D. Lacorte
   0915-731-4082
   ```

2. **You receive**:
   ```
   New Contact Form Message
   
   You have received a new message from your portfolio website.
   
   From: John Doe (john@example.com)
   Subject: Job Opportunity
   Message: Hi, I saw your portfolio and would like to discuss a project...
   Date: 12/15/2024
   
   ```

## Troubleshooting

### If it's not working:
1. **Check Template ID**: Make sure you replaced `'template_notification'` with your actual template ID
2. **Check EmailJS Dashboard**: Verify both templates exist and are published
3. **Check Browser Console**: Look for error messages
4. **Check Spam Folder**: Emails might go to spam

---

**After completing these steps, you should receive all contact form messages in your inbox!** 🎉
