require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
  const { email, name, service, budget, message } = req.body || {};
  if (!email && !name && !message) return res.status(400).json({ message: 'Missing fields' });

  // Build a safe HTML-formatted message for Telegram
  function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  const messageHtml = `&lt;b&gt;New contact form submission&lt;/b&gt;\n\n&lt;b&gt;Email:&lt;/b&gt; ${escapeHtml(email)}\n&lt;b&gt;Name:&lt;/b&gt; ${escapeHtml(name)}\n&lt;b&gt;Service:&lt;/b&gt; ${escapeHtml(service)}\n&lt;b&gt;Budget:&lt;/b&gt; ${escapeHtml(budget)}\n&lt;b&gt;Message:&lt;/b&gt;\n${escapeHtml(message)}`;

  // Send Telegram message (if configured)
  try {
    if (process.env.TG_BOT_TOKEN && process.env.TG_CHAT_ID) {
      const tgUrl = `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`;
      await fetch(tgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: process.env.TG_CHAT_ID, text: messageHtml, parse_mode: 'HTML' })
      });
    }
  } catch (err) {
    console.error('Telegram error', err);
  }

  // Send email via SMTP (if configured)
  try {
    if (process.env.SMTP_HOST && email) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
      });

      const emailText = `Hi! Thank you for contacting PLAnn.

To better understand your project and your expectations, please complete a short project brief.

The brief takes about 5–7 minutes and helps collect the key details about your project, style preferences and goals.

You can start here:
[LINK TO BRIEF]

After reviewing your answers, I will contact you with the next steps, timeline and project details.

Looking forward to learning more about your project!
— Anna
PLAnn Design`;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: email,
        subject: 'Thank you for contacting PLAnn',
        text: emailText
      });
    }
  } catch (err) {
    console.error('Email error', err);
    return res.status(500).json({ message: 'Failed to send email' });
  }

  res.json({ message: 'Message sent' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
