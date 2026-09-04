import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const TONY_EMAIL = process.env.TONY_EMAIL || 'tonywulfman.art@gmail.com';
const MAX_REFERENCE_BYTES = 2 * 1024 * 1024;
const ALLOWED_REFERENCE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

let calendarApi = null;
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  calendarApi = google.calendar({ version: 'v3', auth: oauth2Client });
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return value || '';
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Chicago',
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

function formatTime(value) {
  if (!/^\d{2}:\d{2}$/.test(value || '')) return value || '';
  const [hours, minutes] = value.split(':').map(Number);
  const date = new Date(Date.UTC(2000, 0, 1, hours, minutes));
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: 'UTC',
  }).format(date);
}

function addMinutesToLocalDateTime(date, time, minutesToAdd) {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  const adjusted = new Date(Date.UTC(year, month - 1, day, hours, minutes + minutesToAdd));
  const pad = (n) => String(n).padStart(2, '0');
  return `${adjusted.getUTCFullYear()}-${pad(adjusted.getUTCMonth() + 1)}-${pad(adjusted.getUTCDate())}T${pad(adjusted.getUTCHours())}:${pad(adjusted.getUTCMinutes())}:00`;
}

function validateReference(referenceImage) {
  if (!referenceImage) return { attachment: null, error: null };

  const { name, type, data } = referenceImage;
  if (!name || !type || !data || !ALLOWED_REFERENCE_TYPES.has(type)) {
    return { attachment: null, error: 'The reference image must be a JPG, PNG, or WebP file.' };
  }

  let buffer;
  try {
    buffer = Buffer.from(data, 'base64');
  } catch {
    return { attachment: null, error: 'The reference image could not be read.' };
  }

  if (!buffer.length || buffer.length > MAX_REFERENCE_BYTES) {
    return { attachment: null, error: 'The reference image must be 2 MB or smaller.' };
  }

  const safeName = String(name).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100) || 'reference-image';
  return {
    attachment: { filename: safeName, content: buffer, contentType: type },
    error: null,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const {
      name, email, phone, style, placement, size, budget, date, time,
      flexibility, firstTattoo, description, referenceImage,
      ageConfirmed, consent,
    } = body;

    const requiredText = { name, email, phone, style, placement, size, budget, date, time, description };
    const missing = Object.entries(requiredText).find(([, value]) => !String(value || '').trim());
    if (missing) return res.status(400).json({ error: `Missing required field: ${missing[0]}` });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return res.status(400).json({ error: 'Enter a valid email address.' });
    }
    if (String(phone).replace(/\D/g, '').length < 7) {
      return res.status(400).json({ error: 'Enter a valid phone number.' });
    }
    if (!ageConfirmed) {
      return res.status(400).json({ error: 'You must confirm that you are 18 or older.' });
    }
    if (!consent) {
      return res.status(400).json({ error: 'Confirm that you understand this is an appointment request.' });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ error: 'Choose a valid preferred date and time.' });
    }

    const requestedDate = new Date(`${date}T23:59:59`);
    if (!Number.isNaN(requestedDate.getTime()) && requestedDate < new Date()) {
      return res.status(400).json({ error: 'Please choose a date that has not passed.' });
    }

    const { attachment, error: referenceError } = validateReference(referenceImage);
    if (referenceError) return res.status(400).json({ error: referenceError });

    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_PASSWORD;
    if (!gmailUser || !gmailPassword) {
      console.error('Booking email is not configured: missing GMAIL_USER or GMAIL_PASSWORD.');
      return res.status(503).json({ error: 'Booking email is temporarily unavailable. Please email Tony directly.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPassword },
    });

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      style: escapeHtml(style),
      placement: escapeHtml(placement),
      size: escapeHtml(size),
      budget: escapeHtml(budget),
      date: escapeHtml(formatDate(date)),
      time: escapeHtml(formatTime(time)),
      flexibility: escapeHtml(flexibility || 'Flexible if needed'),
      description: escapeHtml(description).replace(/\n/g, '<br />'),
      firstTattoo: firstTattoo ? 'Yes' : 'No',
      ageConfirmed: ageConfirmed ? 'Yes — client confirmed 18+' : 'No',
      reference: attachment ? 'Attached' : 'None',
    };

    const row = (label, value) => `<tr><td style="padding:11px 14px;border-bottom:1px solid #ddd"><strong>${label}</strong></td><td style="padding:11px 14px;border-bottom:1px solid #ddd">${value}</td></tr>`;

    const tonyEmailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#161412">
        <div style="background:#0C0B0A;padding:24px;color:#E8E4DC;border-bottom:3px solid #B08D57">
          <p style="margin:0 0 6px;color:#B08D57;font-size:12px;letter-spacing:.08em">TONY WULFMAN</p>
          <h1 style="margin:0;font-size:26px;font-weight:500">New appointment request</h1>
        </div>
        <div style="padding:28px;background:#F4F1EB">
          <p style="margin-top:0">This is a request, not a confirmed appointment.</p>
          <table style="width:100%;border-collapse:collapse;background:#fff"><tbody>
            ${row('Name', safe.name)}
            ${row('Email', `<a href="mailto:${safe.email}">${safe.email}</a>`)}
            ${row('Phone', safe.phone)}
            ${row('Style', safe.style)}
            ${row('Placement', safe.placement)}
            ${row('Size', safe.size)}
            ${row('Budget', safe.budget)}
            ${row('Preferred date', safe.date)}
            ${row('Preferred time', safe.time)}
            ${row('Flexibility', safe.flexibility)}
            ${row('First tattoo', safe.firstTattoo)}
            ${row('18+ confirmed', safe.ageConfirmed)}
            ${row('Reference image', safe.reference)}
          </tbody></table>
          <h2 style="margin:26px 0 10px;font-size:18px">Tattoo description</h2>
          <div style="background:#fff;padding:16px;border-left:4px solid #B08D57;line-height:1.55">${safe.description}</div>
        </div>
      </div>`;

    await transporter.sendMail({
      from: `Tony Wulfman Website <${gmailUser}>`,
      to: TONY_EMAIL,
      replyTo: email,
      subject: `Appointment request — ${name} — ${formatDate(date)}`,
      html: tonyEmailHtml,
      attachments: attachment ? [attachment] : [],
    });

    const clientEmailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#161412">
        <div style="background:#0C0B0A;padding:24px;color:#E8E4DC;border-bottom:3px solid #B08D57">
          <p style="margin:0 0 6px;color:#B08D57;font-size:12px;letter-spacing:.08em">TONY WULFMAN</p>
          <h1 style="margin:0;font-size:25px;font-weight:500">Request received</h1>
        </div>
        <div style="padding:28px;background:#F4F1EB;line-height:1.6">
          <p>Hi ${safe.name},</p>
          <p>Your tattoo appointment request was sent to Tony. Your preferred date is not reserved yet; Tony will confirm availability, pricing and any deposit requirement directly with you.</p>
          <div style="margin:22px 0;background:#fff;padding:18px;border-left:4px solid #B08D57">
            <p style="margin:0 0 8px"><strong>Preferred date:</strong> ${safe.date}</p>
            <p style="margin:0 0 8px"><strong>Preferred time:</strong> ${safe.time}</p>
            <p style="margin:0 0 8px"><strong>Style:</strong> ${safe.style}</p>
            <p style="margin:0 0 8px"><strong>Placement:</strong> ${safe.placement}</p>
            <p style="margin:0"><strong>Approximate size:</strong> ${safe.size}</p>
          </div>
          <p>If you need to add context, reply to this email or contact <a href="mailto:${TONY_EMAIL}">${TONY_EMAIL}</a>.</p>
        </div>
      </div>`;

    let confirmationEmailSent = true;
    try {
      await transporter.sendMail({
        from: `Tony Wulfman <${gmailUser}>`,
        to: email,
        replyTo: TONY_EMAIL,
        subject: 'Tony Wulfman — appointment request received',
        html: clientEmailHtml,
      });
    } catch (confirmationError) {
      confirmationEmailSent = false;
      console.error('Client confirmation email failed:', confirmationError.message);
    }

    if (calendarApi) {
      try {
        await calendarApi.events.insert({
          calendarId: process.env.CALENDAR_ID || 'primary',
          resource: {
            summary: `Tentative tattoo request: ${name}`,
            description: [
              'This calendar item is an appointment request and is not confirmed yet.',
              '', `Style: ${style}`, `Placement: ${placement}`, `Size: ${size}`,
              `Budget: ${budget}`, `Flexibility: ${flexibility || 'Flexible if needed'}`,
              `First tattoo: ${firstTattoo ? 'Yes' : 'No'}`, '18+ confirmed: Yes', '',
              `Description: ${description}`, '', `Client: ${name}`, `Phone: ${phone}`, `Email: ${email}`,
            ].join('\n'),
            status: 'tentative',
            start: { dateTime: `${date}T${time}:00`, timeZone: 'America/Chicago' },
            end: { dateTime: addMinutesToLocalDateTime(date, time, 60), timeZone: 'America/Chicago' },
          },
          sendUpdates: 'none',
        });
      } catch (calendarError) {
        console.error('Calendar event creation skipped:', calendarError.message);
      }
    }

    return res.status(200).json({ success: true, confirmationEmailSent, message: 'Appointment request submitted' });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ error: 'Failed to process appointment. Please email Tony directly.' });
  }
}
