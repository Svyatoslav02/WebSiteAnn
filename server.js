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

  function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  const messageHtml = `&lt;b&gt;New contact form submission&lt;/b&gt;\n\n&lt;b&gt;Email:&lt;/b&gt; ${escapeHtml(email)}\n&lt;b&gt;Name:&lt;/b&gt; ${escapeHtml(name)}\n&lt;b&gt;Service:&lt;/b&gt; ${escapeHtml(service)}\n&lt;b&gt;Budget:&lt;/b&gt; ${escapeHtml(budget)}\n&lt;b&gt;Message:&lt;/b&gt;\n${escapeHtml(message)}`;

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

  try {
    if (process.env.SMTP_HOST && process.env.EMAIL_TO) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: process.env.EMAIL_TO,
        subject: 'New contact form submission',
        text: `Email: ${email}
Name: ${name}
Service: ${service}
Budget: ${budget}
Message: ${message}`
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
