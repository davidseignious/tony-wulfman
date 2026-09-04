import React, { useState } from 'react';

const EMPTY = {
  name: '', email: '', phone: '', style: '', placement: '', size: '', budget: '',
  date: '', time: '', flexibility: 'Flexible if needed', firstTattoo: false,
  description: '', referenceImage: null, ageConfirmed: false, consent: false,
};

const FIELD = 'w-full border border-stone/30 bg-ink px-4 py-3 text-bone placeholder:text-stone focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass';
const LABEL = 'mb-2 block text-sm text-bone';

function ErrorText({ id, children }) {
  if (!children) return null;
  return <p id={id} className="mt-2 text-sm text-brass" role="alert">{children}</p>;
}

export default function BookingForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadKey, setUploadKey] = useState(0);
  const [referenceName, setReferenceName] = useState('');
  const [result, setResult] = useState(null);

  const setValue = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const change = (event) => {
    const { name, type, checked, value } = event.target;
    setValue(name, type === 'checkbox' ? checked : value);
  };

  const handleReference = (event) => {
    const file = event.target.files?.[0];
    setErrors((current) => ({ ...current, referenceImage: '' }));

    if (!file) {
      setValue('referenceImage', null);
      setReferenceName('');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrors((current) => ({ ...current, referenceImage: 'Use a JPG, PNG, or WebP image.' }));
      event.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((current) => ({ ...current, referenceImage: 'Keep the reference image under 2 MB.' }));
      event.target.value = '';
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === 'string' ? reader.result : '';
      const data = value.includes(',') ? value.split(',')[1] : '';
      setValue('referenceImage', { name: file.name, type: file.type, data });
      setReferenceName(file.name);
      setUploading(false);
    };
    reader.onerror = () => {
      setErrors((current) => ({ ...current, referenceImage: 'That image could not be read. Try another file.' }));
      setUploading(false);
      event.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.';
    if (form.phone.replace(/\D/g, '').length < 7) next.phone = 'Enter a valid phone number.';
    if (!form.style) next.style = 'Choose the closest style.';
    if (!form.placement) next.placement = 'Choose a placement.';
    if (!form.size) next.size = 'Choose an approximate size.';
    if (!form.budget) next.budget = 'Choose a budget comfort range.';
    if (!form.date) next.date = 'Choose a preferred date.';
    if (!form.time) next.time = 'Choose a preferred time.';
    if (form.description.trim().length < 20) next.description = 'Give Tony a little more detail about the idea.';
    if (!form.ageConfirmed) next.ageConfirmed = 'Confirm that you are 18 or older and will bring valid photo ID.';
    if (!form.consent) next.consent = 'Confirm that you understand this is an appointment request.';

    if (form.date) {
      const requested = new Date(`${form.date}T23:59:59`);
      if (!Number.isNaN(requested.getTime()) && requested < new Date()) next.date = 'Choose a date that has not passed.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    setResult(null);
    if (!validate()) return;
    if (uploading) {
      setErrors((current) => ({ ...current, referenceImage: 'Your image is still being prepared.' }));
      return;
    }

    setBusy(true);
    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'The request did not go through.');

      setResult({
        ok: true,
        text: payload.confirmationEmailSent === false
          ? 'Your request reached Tony. The confirmation copy could not be emailed, but the request was received.'
          : 'Your request was sent. A copy was emailed to you for your records.',
      });
      setForm(EMPTY);
      setReferenceName('');
      setUploadKey((value) => value + 1);
    } catch (error) {
      setResult({ ok: false, text: error.message || 'The request did not go through.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="book" className="border-y border-stone/15 bg-char" aria-labelledby="book-title">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <h2 id="book-title" className="font-display text-4xl font-light text-bone sm:text-5xl">Request an appointment</h2>
          <p className="mt-4 leading-relaxed text-stone">
            This sends a request, not an automatic booking. Tony can review the project and confirm availability, pricing and any deposit requirement directly with you.
          </p>
        </div>

        {result && (
          <div className="mt-8 border border-brass/60 bg-brass/10 px-5 py-4 text-bone" role={result.ok ? 'status' : 'alert'}>
            {result.text}{!result.ok && <> <a className="underline underline-offset-4 hover:text-brass" href="mailto:tonywulfman.art@gmail.com">Email Tony directly.</a></>}
          </div>
        )}

        <form onSubmit={submit} noValidate className="mt-10 space-y-8">
          <fieldset>
            <legend className="font-display text-2xl text-bone">Contact</legend>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label>
                <span className={LABEL}>Name</span>
                <input className={FIELD} name="name" value={form.name} onChange={change} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                <ErrorText id="name-error">{errors.name}</ErrorText>
              </label>
              <label>
                <span className={LABEL}>Email</span>
                <input className={FIELD} name="email" type="email" value={form.email} onChange={change} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                <ErrorText id="email-error">{errors.email}</ErrorText>
              </label>
              <label className="sm:col-span-2">
                <span className={LABEL}>Phone</span>
                <input className={FIELD} name="phone" type="tel" value={form.phone} onChange={change} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                <ErrorText id="phone-error">{errors.phone}</ErrorText>
              </label>
            </div>
          </fieldset>

          <fieldset className="border-t border-stone/15 pt-8">
            <legend className="font-display text-2xl text-bone">The tattoo</legend>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label>
                <span className={LABEL}>Closest style</span>
                <select className={FIELD} name="style" value={form.style} onChange={change} aria-invalid={Boolean(errors.style)} aria-describedby={errors.style ? 'style-error' : undefined}>
                  <option value="">Choose one</option>
                  <option>Geometric / symmetrical</option><option>Fine line / detail</option><option>Portrait / realism</option>
                  <option>Floral / nature</option><option>Blackwork</option><option>Cover-up / rework</option><option>Mixed / not sure</option>
                </select>
                <ErrorText id="style-error">{errors.style}</ErrorText>
              </label>

              <label>
                <span className={LABEL}>Placement</span>
                <select className={FIELD} name="placement" value={form.placement} onChange={change} aria-invalid={Boolean(errors.placement)} aria-describedby={errors.placement ? 'placement-error' : undefined}>
                  <option value="">Choose one</option>
                  <option>Arm / forearm</option><option>Upper arm / shoulder</option><option>Leg / calf</option><option>Thigh</option>
                  <option>Chest</option><option>Back</option><option>Ribs / torso</option><option>Hand / fingers</option><option>Neck</option><option>Other / not sure</option>
                </select>
                <ErrorText id="placement-error">{errors.placement}</ErrorText>
              </label>

              <label>
                <span className={LABEL}>Approximate size</span>
                <select className={FIELD} name="size" value={form.size} onChange={change} aria-invalid={Boolean(errors.size)} aria-describedby={errors.size ? 'size-error' : undefined}>
                  <option value="">Choose one</option><option>Small — under 3 inches</option><option>Medium — about 3 to 6 inches</option>
                  <option>Large — about 6 to 10 inches</option><option>Extra large / multi-session</option><option>Not sure yet</option>
                </select>
                <ErrorText id="size-error">{errors.size}</ErrorText>
              </label>

              <label>
                <span className={LABEL}>Budget comfort range</span>
                <select className={FIELD} name="budget" value={form.budget} onChange={change} aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? 'budget-error' : undefined}>
                  <option value="">Choose one</option><option>Under $300</option><option>$300–$600</option><option>$600–$1,000</option><option>$1,000+</option><option>I need a quote first</option>
                </select>
                <ErrorText id="budget-error">{errors.budget}</ErrorText>
              </label>
            </div>

            <label className="mt-5 block">
              <span className={LABEL}>Describe the idea</span>
              <textarea className={`${FIELD} min-h-40 resize-y`} name="description" value={form.description} onChange={change} placeholder="Subject matter, feel, details to keep or avoid, and anything Tony should know about the area." aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : 'description-help'} />
              <p id="description-help" className="mt-2 text-xs text-stone">A specific description makes the first reply more useful.</p>
              <ErrorText id="description-error">{errors.description}</ErrorText>
            </label>

            <div className="mt-5">
              <label className="block">
                <span className={LABEL}>Reference image <span className="text-stone">(optional)</span></span>
                <input key={uploadKey} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleReference} className="block w-full border border-dashed border-stone/35 bg-ink px-4 py-4 text-sm text-stone file:mr-4 file:border-0 file:bg-brass file:px-4 file:py-2 file:font-medium file:text-ink hover:file:bg-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-brass" aria-invalid={Boolean(errors.referenceImage)} aria-describedby="reference-help reference-error" />
              </label>
              <p id="reference-help" className="mt-2 text-xs text-stone">One JPG, PNG, or WebP file up to 2 MB. It is attached to the email Tony receives.</p>
              {referenceName && <p className="mt-2 text-sm text-bone">Attached: {referenceName}</p>}
              <ErrorText id="reference-error">{errors.referenceImage}</ErrorText>
            </div>

            <label className="mt-6 flex items-start gap-3 border border-stone/20 bg-ink p-4">
              <input type="checkbox" name="firstTattoo" checked={form.firstTattoo} onChange={change} className="mt-1 h-4 w-4 accent-[#B08D57]" />
              <span>
                <span className="block text-bone">This would be my first tattoo.</span>
                {form.firstTattoo && <span className="mt-1 block text-sm leading-relaxed text-stone">That context will be included with your request. Ask about preparation, placement, pacing or anything else before confirming.</span>}
              </span>
            </label>
          </fieldset>

          <fieldset className="border-t border-stone/15 pt-8">
            <legend className="font-display text-2xl text-bone">Preferred timing</legend>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label>
                <span className={LABEL}>Preferred date</span>
                <input className={FIELD} name="date" type="date" value={form.date} onChange={change} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'date-error' : undefined} />
                <ErrorText id="date-error">{errors.date}</ErrorText>
              </label>
              <label>
                <span className={LABEL}>Preferred time</span>
                <input className={FIELD} name="time" type="time" value={form.time} onChange={change} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? 'time-error' : undefined} />
                <ErrorText id="time-error">{errors.time}</ErrorText>
              </label>
              <label className="sm:col-span-2">
                <span className={LABEL}>Schedule flexibility</span>
                <select className={FIELD} name="flexibility" value={form.flexibility} onChange={change}>
                  <option>Flexible if needed</option><option>I need this exact date if available</option><option>Any time that week works</option><option>I am open to Tony’s next availability</option>
                </select>
              </label>
            </div>
          </fieldset>

          <div className="border-t border-stone/15 pt-8">
            <div className="mb-5 border-l-2 border-brass bg-brass/5 p-4">
              <p className="text-sm leading-relaxed text-stone"><span className="font-medium text-bone">18+ only.</span> Illinois prohibits tattooing anyone under 18. Bring a current government-issued photo ID showing your birth date and photograph.</p>
            </div>
            <label className="flex items-start gap-3">
              <input type="checkbox" name="ageConfirmed" checked={form.ageConfirmed} onChange={change} className="mt-1 h-4 w-4 accent-[#B08D57]" aria-invalid={Boolean(errors.ageConfirmed)} aria-describedby={errors.ageConfirmed ? 'age-error' : undefined} />
              <span className="text-sm leading-relaxed text-stone">I am 18 or older and will bring valid government-issued photo ID to my appointment.</span>
            </label>
            <ErrorText id="age-error">{errors.ageConfirmed}</ErrorText>

            <label className="mt-4 flex items-start gap-3">
              <input type="checkbox" name="consent" checked={form.consent} onChange={change} className="mt-1 h-4 w-4 accent-[#B08D57]" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} />
              <span className="text-sm leading-relaxed text-stone">I understand this is an appointment request. My date is not reserved until Tony confirms it directly.</span>
            </label>
            <ErrorText id="consent-error">{errors.consent}</ErrorText>
            <button type="submit" disabled={busy || uploading} className="mt-6 w-full bg-brass py-4 font-medium text-ink hover:bg-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-char disabled:cursor-not-allowed disabled:opacity-50">
              {busy ? 'Sending request…' : uploading ? 'Preparing image…' : 'Send appointment request'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
