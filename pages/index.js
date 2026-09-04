import React, { useState } from 'react';
import Head from 'next/head';

const WORK = [
  { file: 'work-1.jpg', label: 'Geometric' },
  { file: 'work-2.jpg', label: 'Fine line' },
  { file: 'work-3.jpg', label: 'Portrait' },
  { file: 'work-4.jpg', label: 'Blackwork' },
  { file: 'work-5.jpg', label: 'Floral' },
  { file: 'work-6.jpg', label: 'Sleeve' },
  { file: 'work-7.jpg', label: 'Geometric' },
  { file: 'work-8.jpg', label: 'Fine line' },
  { file: 'work-9.jpg', label: 'Blackwork' },
];

function Tile({ file, label }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="aspect-[4/5] bg-char border border-stone/15 flex items-center justify-center">
        <span className="font-body text-xs text-stone">{label}</span>
      </div>
    );
  }
  return (
    <figure className="aspect-[4/5] overflow-hidden bg-char">
      <img
        src={`/work/${file}`}
        alt={`${label} tattoo by Tony Wulfman`}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </figure>
  );
}

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', description: '' });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const r = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error('That did not go through. Email tonywulfman.art@gmail.com instead.');
      setSent(true);
      setForm({ name: '', email: '', phone: '', date: '', time: '', description: '' });
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  };

  const field = 'w-full bg-ink border border-stone/25 px-4 py-3 font-body text-bone placeholder-stone focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass transition-colors';

  return (
    <>
      <Head>
        <title>Tony Wulfman — Tattoo Artist, Old Town Tatu Chicago</title>
        <meta name="description" content="Geometric, fine-line and blackwork tattooing by Tony Wulfman at Old Town Tatu in Chicago. Free consultations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-ink font-body">

        <nav className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-stone/15">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#top" className="flex items-center gap-3">
              <img src="/tony-wulfman-logo.png" alt="" className="h-9 w-9 object-contain invert" />
              <span className="font-display text-lg tracking-wide text-bone">Tony Wulfman</span>
            </a>
            <div className="flex items-center gap-7 text-sm">
              <a href="#work" className="text-stone hover:text-bone transition-colors hidden sm:inline">Work</a>
              <a href="#about" className="text-stone hover:text-bone transition-colors hidden sm:inline">About</a>
              <a href="#book" className="text-ink bg-brass px-4 py-2 hover:bg-bone transition-colors">Book</a>
            </div>
          </div>
        </nav>

        {/* Hero — inverted to bone. The one bold move on the page. */}
        <header id="top" className="bg-bone text-ink">
          <div className="max-w-5xl mx-auto px-6 py-20 sm:py-28 grid md:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div>
              <h1 className="font-display font-light leading-[0.92] text-6xl sm:text-7xl md:text-8xl">
                Tony<br />Wulfman
              </h1>
              <p className="font-display text-2xl sm:text-3xl mt-6 text-ink/70 leading-snug max-w-md">
                Geometric, fine-line and blackwork tattooing at Old Town Tatu, Chicago.
              </p>
              <p className="mt-8 text-ink/60 max-w-md leading-relaxed">
                Fifteen years of design behind every piece. Consultations are free, and every
                design is drawn for one person only.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#book" className="bg-ink text-bone px-7 py-3 hover:bg-brass hover:text-ink transition-colors">
                  Request an appointment
                </a>
                <a href="#work" className="border border-ink/30 px-7 py-3 hover:border-ink transition-colors">
                  See the work
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="/tony-wulfman-logo.png"
                alt="Tony Wulfman crest — a face split between marble statue and wolf, framed by laurel"
                className="w-full max-w-xs md:max-w-sm object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </header>

        <section id="work" className="max-w-5xl mx-auto px-6 py-20 sm:py-24">
          <div className="flex items-baseline justify-between mb-10 border-b border-stone/20 pb-4">
            <h2 className="font-display text-4xl sm:text-5xl font-light text-bone">Recent work</h2>
            <a href="https://instagram.com/tonywulfman.art" target="_blank" rel="noopener noreferrer"
               className="text-sm text-stone hover:text-brass transition-colors">@tonywulfman.art</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {WORK.map((w) => <Tile key={w.file} {...w} />)}
          </div>
        </section>

        <section id="about" className="border-y border-stone/15 bg-char">
          <div className="max-w-5xl mx-auto px-6 py-20 sm:py-24 grid md:grid-cols-2 gap-14">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-light text-bone mb-7">About Tony</h2>
              <div className="space-y-5 text-stone leading-relaxed max-w-prose">
                <p>
                  Tattooing at Old Town Tatu since 2020, with fifteen years of design work behind
                  it. The focus is geometric composition, fine-line detail and realistic portraits.
                </p>
                <p>
                  Every appointment starts as a conversation. Bring references, a rough idea, or
                  nothing but a feeling — the design gets built around your placement, your budget
                  and how you actually want to wear it.
                </p>
                <p>Consultations are free.</p>
              </div>
            </div>
            <div>
              <h3 className="font-display text-2xl text-bone mb-6">Specialties</h3>
              <ul className="divide-y divide-stone/15 border-y border-stone/15">
                {['Geometric and symmetrical work','Fine line and detail','Portrait and realism','Floral and nature','Bold blackwork','Cover-ups and reworks'].map((s) => (
                  <li key={s} className="py-3.5 text-stone">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="book" className="max-w-2xl mx-auto px-6 py-20 sm:py-24">
          <h2 className="font-display text-4xl sm:text-5xl font-light text-bone mb-3">Request an appointment</h2>
          <p className="text-stone mb-10">
            Tell Tony what you have in mind. He replies within 24 hours to confirm a time.
          </p>

          {sent && (
            <div className="border border-brass/50 bg-brass/10 px-5 py-4 mb-8 text-bone">
              Sent. Check your email for a copy — Tony will confirm within 24 hours.
            </div>
          )}
          {err && (
            <div className="border border-red-500/50 bg-red-500/10 px-5 py-4 mb-8 text-bone">{err}</div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input className={field} name="name" value={form.name} onChange={change} required placeholder="Your name" />
              <input className={field} name="email" type="email" value={form.email} onChange={change} required placeholder="Email" />
            </div>
            <input className={field} name="phone" type="tel" value={form.phone} onChange={change} required placeholder="Phone" />
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="block text-sm text-stone mb-2">Preferred date</span>
                <input className={field} name="date" type="date" value={form.date} onChange={change} required />
              </label>
              <label className="block">
                <span className="block text-sm text-stone mb-2">Preferred time</span>
                <input className={field} name="time" type="time" value={form.time} onChange={change} required />
              </label>
            </div>
            <textarea className={`${field} h-36 resize-none`} name="description" value={form.description} onChange={change} required
              placeholder="What are you thinking? Style, size, placement, any references you have." />
            <button type="submit" disabled={busy}
              className="w-full bg-brass text-ink py-3.5 font-medium hover:bg-bone transition-colors disabled:opacity-50">
              {busy ? 'Sending…' : 'Send request'}
            </button>
          </form>
        </section>

        <footer className="border-t border-stone/15">
          <div className="max-w-5xl mx-auto px-6 py-14 grid sm:grid-cols-3 gap-10">
            <div>
              <img src="/tony-wulfman-logo.png" alt="" className="h-12 w-12 object-contain invert mb-4" />
              <p className="font-display text-lg text-bone">Old Town Tatu</p>
              <p className="text-stone text-sm">Chicago, Illinois</p>
            </div>
            <div>
              <p className="text-bone mb-2">Get in touch</p>
              <a href="mailto:tonywulfman.art@gmail.com" className="text-stone hover:text-brass transition-colors text-sm break-all">
                tonywulfman.art@gmail.com
              </a>
            </div>
            <div>
              <p className="text-bone mb-2">Follow</p>
              <a href="https://instagram.com/tonywulfman.art" target="_blank" rel="noopener noreferrer"
                 className="text-stone hover:text-brass transition-colors text-sm">@tonywulfman.art</a>
            </div>
          </div>
          <div className="border-t border-stone/15 py-6 text-center text-xs text-stone">
            © 2026 Tony Wulfman
          </div>
        </footer>
      </div>
    </>
  );
}
