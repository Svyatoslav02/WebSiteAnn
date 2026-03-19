const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

function escapeHtml(str) {
  if (!str && str !== 0) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { email, name, service, budget, message } = JSON.parse(event.body || '{}');

    if (!email || !name || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    const telegramMessage = `<b>New contact form submission</b>\n\n<b>Email:</b> ${escapeHtml(email)}\n<b>Name:</b> ${escapeHtml(name)}\n<b>Service:</b> ${escapeHtml(service)}\n<b>Budget:</b> ${escapeHtml(budget)}\n<b>Message:</b>\n${escapeHtml(message)}`;

    try {
      if (process.env.TG_BOT_TOKEN && process.env.TG_CHAT_ID) {
        const tgUrl = `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`;

        await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TG_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML'
          })
        });
      }
    } catch (err) {
      console.error('Telegram error:', err);
    }

    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
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
      console.error('Email error:', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Failed to send email' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent' })
    };
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error' })
    };
  }
};