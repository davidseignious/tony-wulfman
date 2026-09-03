import React, { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', date: '', time: '', description: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tony Wulfman | Tattoo Artist | Old Town Tatu Chicago</title>
        <meta name="description" content="Professional tattoo artist specializing in geometric patterns, fine-line work, and custom designs at Old Town Tatu, Chicago." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <nav className="fixed w-full bg-black z-50 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/tony-wulfman-logo.png"
              alt="Tony Wulfman"
              fill
              className="object-contain"
              sizes="40px"
            />
          </div>
          <h1 className="text-white text-lg font-light tracking-widest">TONY WULFMAN</h1>
          <a href="#book" className="text-white text-sm border border-white px-4 py-2 hover:bg-white hover:text-black transition">
            BOOK
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 sm:h-96">
              <Image
                src="/tony-wulfman-logo.png"
                alt="Tony Wulfman - Tattoo Artist"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-4 tracking-wider">
                GEOMETRIC TATTOOS
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
                Fine line work. Bold black. Custom designs. Each piece is custom-designed to match your vision perfectly and crafted to be a masterpiece on your skin.
              </p>
              <p className="text-sm text-gray-400 mb-8">
                Established 2020 • 15+ Years Professional Design Experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#portfolio" className="bg-white text-black px-8 py-3 font-medium text-center hover:bg-gray-200 transition">
                  View Work
                </a>
                <a href="#book" className="border-2 border-white text-white px-8 py-3 font-medium text-center hover:bg-white hover:text-black transition">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-light tracking-wider mb-8">ABOUT TONY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                With over 15 years of professional design and tattooing experience, Tony specializes in creating custom geometric patterns, fine-line work, and realistic portraits. Every piece is designed to match your vision perfectly.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Working exclusively at Old Town Tatu in Chicago, Tony maintains the highest standards of hygiene, professionalism, and artistry. Every appointment is treated as a collaboration—your ideas matter.
              </p>
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-light tracking-wider mb-4">SPECIALTIES</h4>
              <ul className="text-gray-300 space-y-3 text-base sm:text-lg">
                <li className="flex items-start"><span className="mr-3">•</span><span>Geometric & Symmetrical Work</span></li>
                <li className="flex items-start"><span className="mr-3">•</span><span>Fine Line & Detail</span></li>
                <li className="flex items-start"><span className="mr-3">•</span><span>Portrait & Realism</span></li>
                <li className="flex items-start"><span className="mr-3">•</span><span>Floral & Nature</span></li>
                <li className="flex items-start"><span className="mr-3">•</span><span>Bold Black Work</span></li>
                <li className="flex items-start"><span className="mr-3">•</span><span>Cover-ups & Reworks</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sleeve Work Showcase */}
      <section id="portfolio" className="py-16 sm:py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-light tracking-wider mb-12 text-center">PORTFOLIO</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Geometric Patterns', desc: 'Symmetrical & intricate designs' },
              { title: 'Fine Line Work', desc: 'Detailed & delicate linework' },
              { title: 'Portraits', desc: 'Realistic faces & expressions' },
              { title: 'Floral & Nature', desc: 'Organic & botanical themes' },
              { title: 'Bold Black Work', desc: 'Strong & striking designs' },
              { title: 'Sleeve Work', desc: 'Full & half sleeve designs' }
            ].map((item, i) => (
              <div key={i} className="border border-gray-800 bg-gray-950 p-6 hover:border-gray-600 transition">
                <div className="aspect-square bg-gradient-to-br from-gray-900 to-black mb-4 flex items-center justify-center rounded">
                  <span className="text-gray-600">Portfolio Sample</span>
                </div>
                <h4 className="text-lg font-light mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="book" className="py-16 sm:py-20 bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-light tracking-wider mb-2 text-center">REQUEST APPOINTMENT</h3>
          <p className="text-center text-gray-400 mb-12">Consultations are free. Let's create your perfect piece.</p>
          
          {submitted && (
            <div className="bg-green-900 border border-green-700 text-green-100 p-4 rounded mb-8 text-center">
              ✓ Appointment request sent! We'll contact you within 24 hours to confirm.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-light mb-2 uppercase tracking-wide">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-gray-700 px-4 py-3 text-white placeholder-gray-600 focus:border-white focus:outline-none transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-light mb-2 uppercase tracking-wide">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-gray-700 px-4 py-3 text-white placeholder-gray-600 focus:border-white focus:outline-none transition"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light mb-2 uppercase tracking-wide">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-black border border-gray-700 px-4 py-3 text-white placeholder-gray-600 focus:border-white focus:outline-none transition"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-light mb-2 uppercase tracking-wide">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-700 px-4 py-3 text-white focus:border-white focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-light mb-2 uppercase tracking-wide">Preferred Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-700 px-4 py-3 text-white focus:border-white focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light mb-2 uppercase tracking-wide">Describe Your Tattoo Idea *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full bg-black border border-gray-700 px-4 py-3 text-white placeholder-gray-600 focus:border-white focus:outline-none transition h-32 resize-none"
                placeholder="Style, size, placement, inspiration, references, etc..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 font-medium uppercase tracking-wide hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? 'SENDING...' : 'REQUEST APPOINTMENT'}
            </button>

            <p className="text-center text-xs text-gray-500 pt-4">
              We'll review your request and contact you to confirm timing and discuss your design in detail.
            </p>
          </form>
        </div>
      </section>

      {/* Contact/Hours */}
      <section className="py-16 bg-black text-white border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-sm font-light tracking-widest mb-3 uppercase">Location</h4>
              <p className="text-base text-gray-300">Old Town Tatu</p>
              <p className="text-sm text-gray-500">Chicago, IL</p>
            </div>
            <div>
              <h4 className="text-sm font-light tracking-widest mb-3 uppercase">Contact</h4>
              <a href="mailto:tonywulfman.art@gmail.com" className="text-base text-gray-300 hover:text-white transition">
                tonywulfman.art@gmail.com
              </a>
            </div>
            <div>
              <h4 className="text-sm font-light tracking-widest mb-3 uppercase">Follow</h4>
              <a href="https://instagram.com/tonywulfman.art" target="_blank" rel="noopener noreferrer" className="text-base text-gray-300 hover:text-white transition">
                @tonywulfman.art
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative w-8 h-8">
              <Image
                src="/tony-wulfman-logo.png"
                alt="Tony Wulfman"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
          </div>
          <p className="text-gray-400 text-sm">&copy; 2026 Tony Wulfman | Old Town Tatu Chicago</p>
          <p className="text-gray-500 text-xs mt-2">Professional Tattoo Design & Artistry</p>
        </div>
      </footer>
    </>
  );
}
