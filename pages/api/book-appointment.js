const PRIMARY_RECIPIENT = 'ddseign@gmail.com';
const TONY_EMAIL = 'tonywulfman.art@gmail.com';

const clean = (value, max = 5000) => String(value ?? '')
  .replace(/[<>]/g, '')
  .trim()
  .slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const demo = req.method === 'GET' && req.query?.demo === '1';
  const body = demo ? {
    name: 'David — DEMO',
    email: 'ddseign@gmail.com',
    phone: 'Demo only',
    style: 'Website booking demo',
    placement: 'Demo only',
    size: 'Demo only',
    budget: 'Demo only',
    date: 'Demo',
    time: 'Demo',
    flexibility: 'Demo only',
    firstTattoo: false,
    ageConfirmed: true,
    consent: true,
    description: 'Demo from David for your new website. This was submitted through the real website booking endpoint to verify the booking system works end to end.',
    website: '',
  } : (req.body || {});

  // Honeypot: silently accept obvious bot submissions without sending them.
  if (body.website) return res.status(200).json({ success: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 180);
  const phone = clean(body.phone, 80);
  const description = clean(body.description, 5000);

  if (!demo) {
    if (!name || !email || !phone || description.length < 20) {
      return res.status(400).json({ error: 'Please complete the required contact and tattoo details.' });
    }
    if (!body.ageConfirmed) {
      return res.status(400).json({ error: 'You must confirm that you are 18 or older.' });
    }
    if (!body.consent) {
      return res.status(400).json({ error: 'Please confirm that you understand this is an appointment request.' });
    }
  }

  const payload = new URLSearchParams({
    _to: PRIMARY_RECIPIENT,
    _cc: TONY_EMAIL,
    _subject: demo
      ? 'DEMO from David — Tony Wulfman New Website Booking'
      : `New Tony Wulfman Website Booking — ${name}`,
    _replyto: email,
    'Client name': name,
    'Client email': email,
    Phone: phone,
    Style: clean(body.style, 120),
    Placement: clean(body.placement, 120),
    'Approximate size': clean(body.size, 120),
    'Budget comfort range': clean(body.budget, 120),
    'Preferred date': clean(body.date, 80),
    'Preferred time': clean(body.time, 80),
    'Schedule flexibility': clean(body.flexibility, 160),
    'First tattoo': body.firstTattoo ? 'Yes' : 'No',
    '18+ confirmed': body.ageConfirmed ? 'Yes' : 'No',
    'Appointment-request consent': body.consent ? 'Yes' : 'No',
    'Reference image': body.referenceImage?.name
      ? `${clean(body.referenceImage.name, 200)} (reference file selected on website)`
      : 'None',
    'Tattoo idea / message': description,
  });

  try {
    const response = await fetch('https://flowform.to/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: payload.toString(),
      redirect: 'manual',
    });

    // FlowForm returns a success redirect/HTML response. Any 2xx or 3xx means it accepted the submission.
    if (response.status < 200 || response.status >= 400) {
      const details = await response.text().catch(() => '');
      return res.status(502).json({
        error: 'The booking delivery service did not accept the request.',
        details: details.slice(0, 300) || null,
      });
    }

    return res.status(200).json({
      success: true,
      demo,
      confirmationEmailSent: false,
      delivery: 'David + Tony CC',
    });
  } catch (error) {
    return res.status(502).json({
      error: 'The booking delivery service could not be reached.',
      details: error.message,
    });
  }
}
