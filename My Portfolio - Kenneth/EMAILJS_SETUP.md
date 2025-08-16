# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to make your contact form functional and send emails directly to your inbox.

## ✅ Current Configuration

Your EmailJS is now properly configured with:
- **Public Key**: `y0v7q3t4IHyrar8hO`
- **Service ID**: `jk_lacorte`
- **Template ID**: `template_rsf8awb`

## 📧 Your Email Template

**IMPORTANT**: You need to update your EmailJS template to show the full contact form details instead of an auto-reply.

### Current Template (Auto-Reply):
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px">
  <a style="text-decoration: none; outline: none" href="[Website Link]" target="_blank">
    <img style="height: 32px; vertical-align: middle" height="32px" src="https://drive.google.com/uc?export=view&id=1_jlSHASKFkjVFpwVwdorvXXoMET-V2yX" alt="logo" />
  </a>
  <p style="padding-top: 16px; border-top: 1px solid #eaeaea">Hi {{name}},</p>
  <p>
    Thank you for reaching out! i have received your request: "{{title}}", and i'll do my
    best to answer it as soon as possible.
  </p>
  <p style="padding-top: 16px; border-top: 1px solid #eaeaea">
    Best regards,<br /> John Kenneth D. Lacorte <br />0915-731-4082
  </p>
</div>
```

### Updated Template (Contact Form Notification):
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
      {{name}} ({{email}})
    </div>
    
    <div style="margin-bottom: 15px;">
      <strong style="color: #3b82f6;">Subject:</strong><br>
      {{title}}
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

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. Log in to your EmailJS dashboard
2. Go to "Email Services" tab
3. Click "Add New Service"
4. Choose your email provider (Gmail, Outlook, etc.)
5. Follow the authentication steps
6. Note down your **Service ID** (you'll need this later)

## Step 3: Update Your Email Template

1. Go to "Email Templates" tab in EmailJS dashboard
2. Find your template `template_rsf8awb`
3. Click "Edit" on the template
4. Replace the content with the "Updated Template" shown above
5. Save the template

## Step 4: Get Your Public Key

1. Go to "Account" tab in EmailJS dashboard
2. Find your **Public Key** in the API Keys section
3. Copy it for later use

## Step 5: Update Your Code

Your code is now properly configured with the correct values:

```javascript
// EmailJS initialization
emailjs.init("y0v7q3t4IHyrar8hO"); // Your EmailJS public key

// Email sending configuration
emailjs.send('jk_lacorte', 'template_rsf8awb', templateParams)
// Service ID: jk_lacorte, Template ID: template_rsf8awb

// Template parameters matching your template
const templateParams = {
    name: name,                    // {{name}} in your template
    title: subject,                // {{title}} in your template
    email: email,                  // {{email}} in your template
    message: message,              // {{message}} in your template
    date: new Date().toLocaleDateString() // {{date}} in your template
};
```

## Step 6: Test Your Contact Form

1. Open your portfolio website
2. Go to the contact section
3. Fill out the form and submit
4. Check your email inbox (johnkennethlacortee@gmail.com) for the message
5. Check the browser console for any error messages

## 🔧 Troubleshooting Guide

### Common Issues and Solutions:

#### 1. **"Service not found" error:**
- **Solution**: Verify your Service ID is correct in EmailJS dashboard
- **Check**: Go to Email Services → Copy the exact Service ID
- **Current**: Should be `jk_lacorte`

#### 2. **"Template not found" error:**
- **Solution**: Check your Template ID is correct
- **Check**: Go to Email Templates → Copy the exact Template ID
- **Current**: Should be `template_rsf8awb`

#### 3. **"Public key invalid" error:**
- **Solution**: Verify your public key is correct
- **Check**: Go to Account → API Keys → Copy the Public Key
- **Current**: Should be `y0v7q3t4IHyrar8hO`

#### 4. **Form not sending emails:**
- **Check**: Browser console for JavaScript errors
- **Verify**: All EmailJS credentials are correct
- **Ensure**: EmailJS script is loaded properly

#### 5. **Emails not received:**
- **Check**: Spam/junk folder
- **Verify**: Email service is properly connected in EmailJS
- **Test**: Send a test email from EmailJS dashboard

#### 6. **Rate limiting issues:**
- **Free Plan**: 200 emails per month limit
- **Solution**: Upgrade to paid plan if needed

### Debugging Steps:

1. **Open Browser Console** (F12)
2. **Fill out the contact form**
3. **Submit and check console logs**
4. **Look for these messages:**
   - "DOM loaded, initializing..."
   - "EmailJS initialized with public key: y0v7q3t4IHyrar8hO"
   - "Contact form found, setting up event listener..."
   - "Form submitted, processing..."
   - "Form data: {name, email, subject, message}"
   - "Sending email with params: {...}"
   - "SUCCESS!" or "FAILED..." messages

### Testing Checklist:

- [ ] EmailJS script loads without errors
- [ ] Form validation works (all fields required)
- [ ] Email validation works (valid email format)
- [ ] Loading state shows when submitting
- [ ] Success notification appears
- [ ] Error notification appears for invalid data
- [ ] Email is received in your inbox (johnkennethlacortee@gmail.com)
- [ ] Email contains all form data correctly

## 📧 Email Template Variables

Your template uses these variables:
- `{{name}}` - Sender's name (from form name field)
- `{{title}}` - Email subject (from form subject field)
- `{{email}}` - Sender's email (from form email field)
- `{{message}}` - Email message (from form message field)
- `{{date}}` - Current date

## 🔒 Security Notes

- Your public key is safe to use in client-side code
- EmailJS handles the email sending securely
- No sensitive credentials are exposed in your code
- Form data is validated before sending

## 📊 Free Plan Limitations

- **200 emails per month** on free plan
- **For more emails**: Consider upgrading to a paid plan
- **Rate limiting**: May experience delays during high usage

## 🆘 Support

If you still encounter issues:

1. **Check EmailJS documentation**: https://www.emailjs.com/docs/
2. **Visit EmailJS community forum**
3. **Contact EmailJS support**
4. **Verify your EmailJS account status**

## Alternative Solutions

If EmailJS continues to have issues, consider:
- **Formspree**: Simple form handling
- **Netlify Forms**: If hosting on Netlify
- **Getform**: Another popular option
- **Custom backend**: PHP, Node.js, or Python solution

---

**Your contact form should now work properly!** 🎉

**Last Updated**: Template updated to send contact form details to recipient
