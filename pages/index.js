import Head from 'next/head';
import Portfolio from '../components/Portfolio';
import BookingForm from '../components/BookingForm';

const SPECIALTIES = [
  'Geometric and symmetrical work',
  'Fine line and detail',
  'Portrait and realism',
  'Floral and nature',
  'Bold blackwork',
  'Cover-ups and reworks',
];

const FAQS = [
  {
    question: 'How old do I have to be to get tattooed?',
    answer: 'Tattooing is 18+ in Illinois. Bring a current government-issued photo ID that shows your birth date and photograph. A parent or guardian cannot authorize a tattoo for someone under 18.',
  },
  {
    question: 'How do I get a quote?',
    answer: 'Send the idea, placement, approximate size, budget comfort range and any reference image you have. Tony can review the scope before a session is confirmed.',
  },
  {
    question: 'Is my preferred date guaranteed?',
    answer: 'No. The form sends a request, not a confirmed appointment. Tony will confirm availability directly before anything is locked in.',
  },
  {
    question: 'Can I send reference images?',
    answer: 'Yes. The booking form accepts one JPG, PNG, or WebP image up to 2 MB and attaches it to the request Tony receives.',
  },
  {
    question: 'Do you take cover-ups and reworks?',
    answer: 'Cover-ups and reworks are among Tony’s supplied specialties. Include a clear photo of the existing tattoo and explain what you want to change.',
  },
  {
    question: 'What if this is my first tattoo?',
    answer: 'Mark the first-tattoo box in the request so Tony has that context. Ask about preparation, placement, pacing or anything else before confirming.',
  },
  {
    question: 'What should I do after my tattoo?',
    answer: 'Follow Tony’s specific bandage and aftercare directions first. Keep the area clean, avoid soaking or swimming while it heals, do not pick or scratch, and protect healed tattooed skin from the sun. If redness spreads, pain worsens, pus develops, or you have fever or chills, contact a healthcare professional promptly.',
  },
  {
    question: 'What are Tony’s rate, minimum and deposit?',
    answer: 'Tony approaches pricing as a conversation. Every project is different, so the final quote depends on size, placement, detail and expected session time. Any minimum, deposit or final project price is confirmed directly before booking.',
  },
];

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tony Wulfman',
  jobTitle: 'Tattoo Artist',
  url: 'https://tonywulfman.art',
  email: 'mailto:tonywulfman.art@gmail.com',
  sameAs: ['https://www.instagram.com/tonywulfman.art/'],
  worksFor: {
    '@type': 'TattooParlor',
    name: 'Old Town Tatu',
    url: 'https://www.oldtowntatu.com/',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3313 W Irving Park Rd',
      addressLocality: 'Chicago',
      addressRegion: 'IL',
      postalCode: '60618',
      addressCountry: 'US',
    },
  },
};

const shopSchema = {
  '@context': 'https://schema.org',
  '@type': 'TattooParlor',
  name: 'Old Town Tatu',
  url: 'https://www.oldtowntatu.com/',
  telephone: '+1-773-442-8288',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3313 W Irving Park Rd',
    addressLocality: 'Chicago',
    addressRegion: 'IL',
    postalCode: '60618',
    addressCountry: 'US',
  },
};

function SectionHeading({ id, children, intro }) {
  return (
    <div className="max-w-3xl">
      <h2 id={id} className="font-display text-4xl font-light text-bone sm:text-5xl">{children}</h2>
      {intro && <p className="mt-4 max-w-2xl leading-relaxed text-stone">{intro}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Tony Wulfman — Tattoo Artist in Chicago</title>
        <meta name="description" content="Geometric, fine-line, portrait, floral, blackwork, cover-up and custom tattooing by Tony Wulfman at Old Town Tatu in Chicago." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://tonywulfman.art/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tonywulfman.art/" />
        <meta property="og:title" content="Tony Wulfman — Tattoo Artist in Chicago" />
        <meta property="og:description" content="Selected tattoo work, session information, aftercare and appointment requests for Tony Wulfman at Old Town Tatu in Chicago." />
        <meta property="og:image" content="https://tonywulfman.art/tony-wulfman-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tony Wulfman — Tattoo Artist in Chicago" />
        <meta name="twitter:description" content="Selected tattoo work and appointment requests for Tony Wulfman at Old Town Tatu in Chicago." />
        <meta name="twitter:image" content="https://tonywulfman.art/tony-wulfman-logo.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(shopSchema) }} />
      </Head>

      <a href="#main" className="fixed left-4 -top-24 z-[120] bg-bone px-4 py-3 text-ink focus:top-4">Skip to content</a>

      <div className="min-h-screen bg-ink font-body">
        <nav className="sticky top-0 z-50 border-b border-stone/15 bg-ink/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <a href="#top" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass">
              <img src="/tony-wulfman-logo.png" alt="" className="h-9 w-9 object-contain invert" />
              <span className="font-display text-lg tracking-wide text-bone">Tony Wulfman</span>
            </a>
            <div className="flex items-center gap-6 text-sm">
              <a href="#work" className="hidden text-stone hover:text-bone focus:outline-none focus-visible:text-brass sm:inline">Work</a>
              <a href="#about" className="hidden text-stone hover:text-bone focus:outline-none focus-visible:text-brass sm:inline">About</a>
              <a href="#aftercare" className="hidden text-stone hover:text-bone focus:outline-none focus-visible:text-brass lg:inline">Aftercare</a>
              <a href="#faq" className="hidden text-stone hover:text-bone focus:outline-none focus-visible:text-brass md:inline">FAQ</a>
              <a href="#book" className="bg-brass px-4 py-2 text-ink hover:bg-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-bone">Book</a>
            </div>
          </div>
        </nav>

        <main id="main">
          <header id="top" className="bg-bone text-ink">
            <div className="mx-auto grid min-h-[620px] max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.08fr_.92fr] md:py-24">
              <div>
                <p className="mb-5 text-xs tracking-[0.14em] text-ink/55">TATTOO ARTIST · CHICAGO, ILLINOIS</p>
                <h1 className="font-display text-6xl font-light leading-[0.82] tracking-[-0.035em] sm:text-8xl md:text-9xl">Tony<br />Wulfman</h1>
                <p className="mt-7 max-w-xl font-display text-3xl leading-tight text-ink/70 sm:text-4xl">Precision, composition and detail built around the person wearing the piece.</p>
                <p className="mt-7 max-w-xl leading-relaxed text-ink/60">Tony tattoos at Old Town Tatu in Chicago, working across geometric and symmetrical designs, fine line, portrait and realism, floral and nature, bold blackwork, and cover-ups or reworks.</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#book" className="bg-ink px-7 py-3.5 text-bone hover:bg-brass hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brass">Request an appointment</a>
                  <a href="#work" className="border border-ink/25 px-7 py-3.5 hover:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink">See selected work</a>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <img src="/tony-wulfman-logo.png" alt="Tony Wulfman crest, a split marble face and wolf framed by a triangle and laurels" className="w-full max-w-sm object-contain mix-blend-multiply" />
              </div>
            </div>
          </header>

          <Portfolio />

          <section id="about" className="border-y border-stone/15 bg-char">
            <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:py-24 md:grid-cols-2">
              <div>
                <h2 className="font-display text-4xl font-light text-bone sm:text-5xl">About Tony</h2>
                <div className="mt-7 max-w-prose space-y-5 leading-relaxed text-stone">
                  <p>Tony’s work at Old Town Tatu centers on careful linework, balanced composition and designs shaped around placement rather than treated like a flat graphic.</p>
                  <p>Every request starts with the idea, the area, the size and the way you want the piece to feel. References help, but they are a starting point rather than a template to copy.</p>
                  {/* TODO: Confirm Tony’s start year and prior design experience before publishing either claim. */}
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl text-bone">Specialties</h3>
                <ul className="mt-6 divide-y divide-stone/15 border-y border-stone/15">
                  {SPECIALTIES.map((specialty) => <li key={specialty} className="py-4 text-stone">{specialty}</li>)}
                </ul>
              </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 pb-20 sm:pb-24">
              <div className="grid justify-center gap-4 md:grid-cols-[480px_360px]">
                <img src="https://res.cloudinary.com/hxnwueko/image/upload/v1788485635/tony-tattooing-session.webp" alt="Tony Wulfman tattooing a client at Old Town Tatu" className="h-auto w-full max-w-[480px] self-start object-cover" loading="lazy" />
                <div className="grid gap-4">
                  <img src="https://res.cloudinary.com/hxnwueko/image/upload/v1788485741/tony-with-client.webp" alt="Tony Wulfman working with a client in the tattoo studio" className="h-auto w-full max-w-[360px] object-cover" loading="lazy" />
                  <img src="https://res.cloudinary.com/hxnwueko/image/upload/v1788485853/tony-outside-old-town.webp" alt="Tony Wulfman outside Old Town Tatu in Chicago" className="h-auto w-full max-w-[360px] object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24" aria-labelledby="before-book-title">
            <SectionHeading id="before-book-title" intro="A few things to know before you send a request.">Before you book</SectionHeading>
            <div className="mt-10 grid gap-px border border-stone/15 bg-stone/15 md:grid-cols-3">
              <article className="bg-ink p-7">
                <p className="font-display text-3xl text-bone">18+ only</p>
                <p className="mt-4 leading-relaxed text-stone">Illinois prohibits tattooing anyone under 18. Bring a current government-issued photo ID showing your birth date and photograph.</p>
              </article>
              <article className="bg-ink p-7">
                <p className="font-display text-3xl text-bone">Request, not reservation</p>
                <p className="mt-4 leading-relaxed text-stone">Submitting the form starts the conversation. Your preferred date is not reserved until Tony confirms the project and availability directly.</p>
              </article>
              <article className="bg-ink p-7">
                <p className="font-display text-3xl text-bone">First tattoo?</p>
                <p className="mt-4 leading-relaxed text-stone">Say so in the form. There is space to ask questions about placement, preparation, pacing and what the session will feel like.</p>
              </article>
            </div>
          </section>

          <section className="border-y border-stone/15 bg-char" aria-labelledby="prep-title">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
              <SectionHeading id="prep-title" intro="Arriving rested and prepared makes the appointment easier for both you and the artist.">Before your session</SectionHeading>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="border-t border-brass pt-5">
                  <h3 className="font-display text-2xl text-bone">Eat + hydrate</h3>
                  <p className="mt-3 leading-relaxed text-stone">Have a normal meal and drink water before the appointment. For longer work, bring a simple snack and something to drink.</p>
                </div>
                <div className="border-t border-brass pt-5">
                  <h3 className="font-display text-2xl text-bone">Wear for access</h3>
                  <p className="mt-3 leading-relaxed text-stone">Choose clean, comfortable clothing that gives easy access to the placement and that you would not be upset to stain.</p>
                </div>
                <div className="border-t border-brass pt-5">
                  <h3 className="font-display text-2xl text-bone">Bring your ID</h3>
                  <p className="mt-3 leading-relaxed text-stone">Bring your current government-issued photo ID. The site and request form are for clients age 18 and older.</p>
                </div>
                <div className="border-t border-brass pt-5">
                  <h3 className="font-display text-2xl text-bone">Check the skin</h3>
                  <p className="mt-3 leading-relaxed text-stone">If the area is sunburned, has a rash, an open wound or another issue that may affect tattooing, contact Tony before the session.</p>
                </div>
              </div>
              <p className="mt-10 max-w-3xl border-l-2 border-stone/30 pl-5 text-sm leading-relaxed text-stone">If you have a health concern that could affect tattooing or healing, ask an appropriate healthcare professional and tell Tony about any practical accommodation that may matter. Do not stop or change prescribed medication solely for a tattoo without guidance from the prescriber.</p>
            </div>
          </section>

          <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 sm:py-24" aria-labelledby="pricing-title">
            <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
              <div>
                <SectionHeading id="pricing-title" intro="The idea comes first. The quote follows the actual scope of the piece.">Pricing</SectionHeading>
                <p className="mt-8 max-w-lg leading-relaxed text-stone">Tony’s philosophy around tattooing is personal: body image, self-expression and the experience of living in your own skin all matter. Money should be part of an honest planning conversation, not a reason to avoid asking about the piece you want.</p>
              </div>

              <div className="border border-brass/60 bg-char p-7 sm:p-10">
                <div className="border-b border-brass/35 pb-7 text-center">
                  <p className="font-display text-3xl italic leading-snug text-bone sm:text-4xl">“Your body is your journal, and your tattoos are your story.”</p>
                </div>
                <div className="mt-7 space-y-5 leading-relaxed text-stone">
                  <p>Tony’s approach to tattooing is shaped by his own experiences with body image, love and life.</p>
                  <p>The process is a collaboration. If cost is making you hesitate, start the conversation anyway so the project can be discussed honestly and a realistic plan can be considered.</p>
                  <p>Every piece is different. Pricing depends on factors such as size, placement, detail and expected session time.</p>
                </div>
                <div className="mt-8 border-t border-brass/35 pt-6 text-center">
                  <p className="text-sm tracking-[0.08em] text-bone">CUSTOM QUOTES ARE DISCUSSED DURING CONSULTATION.</p>
                  <p className="mt-3 text-xs leading-relaxed text-stone">No fixed minimum, hourly rate or deposit amount is published here until Tony confirms those details.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="aftercare" className="border-y border-stone/15 bg-char" aria-labelledby="aftercare-title">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
              <SectionHeading id="aftercare-title" intro="Tony’s instructions for your specific bandage and tattoo come first. These are general healing basics to keep handy.">Aftercare</SectionHeading>
              <div className="mt-10 grid gap-px border border-stone/15 bg-stone/15 md:grid-cols-2 lg:grid-cols-4">
                <article className="bg-char p-7">
                  <span className="font-display text-4xl text-brass">01</span>
                  <h3 className="mt-5 font-display text-2xl text-bone">Follow the bandage plan</h3>
                  <p className="mt-3 leading-relaxed text-stone">Different dressings have different timelines. Follow the instructions Tony gives you for the bandage used on your tattoo.</p>
                </article>
                <article className="bg-char p-7">
                  <span className="font-display text-4xl text-brass">02</span>
                  <h3 className="mt-5 font-display text-2xl text-bone">Keep it clean</h3>
                  <p className="mt-3 leading-relaxed text-stone">Wash gently with clean hands as directed, then pat dry. Avoid harsh rubbing and unnecessary handling while the skin is healing.</p>
                </article>
                <article className="bg-char p-7">
                  <span className="font-display text-4xl text-brass">03</span>
                  <h3 className="mt-5 font-display text-2xl text-bone">Let it heal</h3>
                  <p className="mt-3 leading-relaxed text-stone">Avoid soaking, swimming, picking, scratching and heavy friction while it heals. Keep fresh tattooed skin out of direct sun.</p>
                </article>
                <article className="bg-char p-7">
                  <span className="font-display text-4xl text-brass">04</span>
                  <h3 className="mt-5 font-display text-2xl text-bone">Protect it long-term</h3>
                  <p className="mt-3 leading-relaxed text-stone">Once the tattoo is fully healed, protect exposed tattooed skin with broad-spectrum SPF 30+ sunscreen when outdoors.</p>
                </article>
              </div>
              <div className="mt-8 border-l-2 border-brass bg-ink p-5">
                <p className="font-medium text-bone">Know when to get medical help.</p>
                <p className="mt-2 max-w-4xl text-sm leading-relaxed text-stone">If redness spreads or darkens instead of improving, pain worsens, pus or open sores develop, or you have fever or chills, contact an appropriate healthcare professional promptly. For an emergency, seek emergency care.</p>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24" aria-label="Client review">
            <p className="font-display text-3xl italic leading-snug text-bone sm:text-4xl">“He didn’t rush… he took his time with his work… his line work is spectacular.”</p>
            <p className="mt-5 text-sm text-stone">Amanda S. · client review published by Old Town Tatu</p>
          </section>

          <BookingForm />

          <section id="faq" className="mx-auto max-w-4xl px-6 py-20 sm:py-24" aria-labelledby="faq-title">
            <SectionHeading id="faq-title" intro="The practical questions people usually want answered before they send a request.">Frequently asked</SectionHeading>
            <div className="mt-9 border-y border-stone/20">
              {FAQS.map((item) => (
                <details key={item.question} className="group border-b border-stone/15 last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-bone focus:outline-none focus-visible:ring-2 focus-visible:ring-brass">
                    <span className="font-display text-2xl">{item.question}</span>
                    <span aria-hidden="true" className="text-2xl text-brass transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 leading-relaxed text-stone">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t border-stone/15 bg-char">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <img src="/tony-wulfman-logo.png" alt="" className="h-14 w-14 object-contain invert" />
              <p className="mt-4 font-display text-xl text-bone">Tony Wulfman</p>
              <p className="mt-1 text-sm text-stone">Tattoo artist · Chicago</p>
            </div>
            <div>
              <p className="text-bone">Old Town Tatu</p>
              <p className="mt-2 text-sm leading-relaxed text-stone">3313 W Irving Park Rd<br />Chicago, IL 60618</p>
            </div>
            <div>
              <p className="text-bone">Contact</p>
              <a href="mailto:tonywulfman.art@gmail.com" className="mt-2 block break-all text-sm text-stone hover:text-brass">tonywulfman.art@gmail.com</a>
              <a href="https://www.instagram.com/tonywulfman.art/" target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-stone hover:text-brass">@tonywulfman.art</a>
            </div>
            <div>
              <p className="text-bone">Age requirement</p>
              <p className="mt-2 text-sm leading-relaxed text-stone">18+ only. Bring current government-issued photo ID.</p>
            </div>
          </div>
          <div className="border-t border-stone/15 px-6 py-6 text-center text-xs text-stone">© 2026 Tony Wulfman</div>
        </footer>
      </div>
    </>
  );
}
