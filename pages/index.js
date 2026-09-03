import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Mail, MapPin, Instagram } from 'lucide-react';

export default function OldTownTatu() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const portfolioImages = [
    {
      id: 1,
      title: 'Geometric & Portrait',
      src: 'https://images.unsplash.com/photo-1611501437281-430bbc1e10a9?w=500&h=500&fit=crop',
      category: 'Geometric',
    },
    {
      id: 2,
      title: 'Fine Line Animal',
      src: 'https://images.unsplash.com/photo-1585914924665-02bedff6b7ba?w=500&h=500&fit=crop',
      category: 'Fine Line',
    },
    {
      id: 3,
      title: 'Portrait Work',
      src: 'https://images.unsplash.com/photo-1598808503676-6b6b0b6b8b8b?w=500&h=500&fit=crop',
      category: 'Portraits',
    },
    {
      id: 4,
      title: 'Floral Design',
      src: 'https://images.unsplash.com/photo-1587577734314-20a82a87e64b?w=500&h=500&fit=crop',
      category: 'Floral',
    },
    {
      id: 5,
      title: 'Bold Black Work',
      src: 'https://images.unsplash.com/photo-1618095070708-6733f03c99d1?w=500&h=500&fit=crop',
      category: 'Bold',
    },
    {
      id: 6,
      title: 'Sleeve Work',
      src: 'https://images.unsplash.com/photo-1607408450899-b06fbd58e308?w=500&h=500&fit=crop',
      category: 'Sleeves',
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit appointment');
      }
      
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', date: '', time: '', description: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Old Town Tatu - Tony Wulfman | Professional Tattoo Artist</title>
        <meta name="description" content="Professional tattoo artist specializing in geometric, fine line, and portrait work in Chicago. Book your appointment with Tony Wulfman at Old Town Tatu." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Navigation */}
        <nav className="fixed w-full top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-amber-900/20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-12 h-12 relative">
                <Image
                  src="/tony-wulfman-logo.png"
                  alt="Tony Wulfman Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-lg font-bold tracking-tight hidden sm:block">
                <div className="text-amber-500">OLD TOWN</div>
                <div className="text-xs text-slate-400">TATU</div>
              </div>
            </a>
            <div className="flex gap-6">
              <a href="#portfolio" className="text-sm hover:text-amber-400 transition">
                Portfolio
              </a>
              <a href="#about" className="text-sm hover:text-amber-400 transition">
                About
              </a>
              <a href="#book" className="text-sm hover:text-amber-400 transition">
                Book
              </a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-32 pb-24 px-6 text-center max-w-6xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 sm:w-48 sm:h-48 relative">
              <Image
                src="/tony-wulfman-logo.png"
                alt="Tony Wulfman - Old Town Tatu"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-black mb-6 tracking-tighter">
            TONY WULFMAN
          </h1>
          <p className="text-xl text-amber-400 font-light tracking-widest uppercase mb-8">
            Tattoo Artist & Designer
          </p>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Specializing in geometric, fine line, and portrait work. Every piece is a collaboration between your vision and 15+ years of precision craft.
          </p>
          <div className="mt-12 flex gap-4 justify-center flex-wrap">
            <a
              href="#book"
              className="px-8 py-3 bg-amber-500 text-slate-950 font-bold rounded hover:bg-amber-400 transition"
            >
              Book Appointment
            </a>
            <a
              href="https://instagram.com/tonywulfman.art"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-amber-500 text-amber-400 font-bold rounded hover:bg-amber-500/10 transition flex items-center gap-2"
            >
              <Instagram size={18} /> @tonywulfman.art
            </a>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-16 tracking-tight">Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioImages.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold mb-2">{img.title}</h3>
                    <p className="text-amber-400 text-sm">{img.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-black mb-8 tracking-tight">About Tony</h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Established in 2020, Tony brings over 15 years of professional design and tattooing experience. Specializing in geometric patterns, fine-line work, and realistic portraits, each piece is custom-designed to match your vision perfectly.
              </p>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Working exclusively at Old Town Tatu, Tony maintains the highest standards of hygiene and professionalism. Every appointment is treated as a collaboration—your ideas matter.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Consultations are free. Tony works with clients to develop custom designs that fit their style, body placement, and budget.
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-600/20 to-transparent p-12 rounded-lg border border-amber-600/30">
              <h3 className="text-2xl font-black mb-8">Specialties</h3>
              <ul className="space-y-4">
                {['Geometric & Symmetrical Work', 'Fine Line & Detail', 'Portrait & Realism', 'Floral & Nature', 'Custom Designs', 'Cover-ups'].map((specialty) => (
                  <li key={specialty} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="book" className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-black mb-4 tracking-tight text-center">Book Your Tattoo</h2>
            <p className="text-center text-slate-300 mb-12">
              Fill out the form below and Tony will confirm your appointment within 24 hours.
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500 rounded text-emerald-300">
                ✓ Appointment request sent! Check your email for confirmation.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded text-red-300">
                ✗ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <textarea
                name="description"
                placeholder="Describe your tattoo idea (style, size, placement, reference images, etc.)"
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded hover:bg-amber-400 transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Request Appointment'}
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <Image
                  src="/tony-wulfman-logo.png"
                  alt="Old Town Tatu Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-amber-500">OLD TOWN</span> TATU
              </h3>
              <p className="text-slate-400">Professional Tattoo Artist</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-amber-400" /> Location
                </h3>
                <p className="text-slate-400">Old Town Tatu</p>
                <p className="text-slate-400">Chicago, IL</p>
              </div>
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Mail size={18} className="text-amber-400" /> Contact
                </h3>
                <a href="mailto:tonywulfman.art@gmail.com" className="text-amber-400 hover:text-amber-300">
                  tonywulfman.art@gmail.com
                </a>
              </div>
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Instagram size={18} className="text-amber-400" /> Follow
                </h3>
                <a
                  href="https://instagram.com/tonywulfman.art"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300"
                >
                  @tonywulfman.art
                </a>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
              <p>© 2025 Old Town Tatu. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
