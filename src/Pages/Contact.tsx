import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface ContactFormData {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      })
    }, 900)
  }

  const contactChannels = [
    {
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone Support',
      desc: 'Mon–Sat from 9:00 AM to 8:00 PM',
      value: '+20 101 234 5678',
      link: 'tel:+201012345678',
      badge: 'Call Us Now',
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25',
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email Desk',
      desc: 'Average response under 15 minutes',
      value: 'support@social-app.com',
      link: 'mailto:support@social-app.com',
      badge: 'Email Us',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25',
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Live Chat',
      desc: 'Available 24/7 inside the app',
      value: 'Chat with Us',
      link: '#',
      badge: 'Online Now',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Community HQ',
      desc: 'Smart Village, Cairo, Egypt',
      value: 'Get Directions',
      link: '#',
      badge: 'Cairo Hub',
      color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/25',
    },
  ]

  const departments = [
    { name: 'Customer Care & Orders', email: 'care@social-app.com', time: '< 15 mins' },
    { name: 'Creator & Partner Relations', email: 'creators@social-app.com', time: '< 2 hrs' },
    { name: 'Security & Privacy Compliance', email: 'privacy@social-app.com', time: '< 1 hr' },
    { name: 'Press & Media Relations', email: 'press@social-app.com', time: '< 4 hrs' },
  ]

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* ── 1. Hero Header ── */}
      <section
        className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-87.5 bg-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-semibold mb-6 shadow-sm"
            style={{
              backgroundColor: 'var(--accent-indigo-bg)',
              borderColor: 'var(--accent-indigo-border)',
              color: 'var(--accent-indigo-text)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>WE ARE ACTIVE & READY TO ASSIST YOU</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.15]"
            style={{ color: 'var(--text-primary)' }}
          >
            Have a Question or Need Support?{' '}
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Let&apos;s Connect
            </span>
          </h1>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Whether you need assistance with an ongoing order, product recommendations, warranty claims, or business inquiries, our team is here around the clock.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-10 text-xs sm:text-sm font-medium">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              <span className="text-emerald-500">⚡</span> Average reply: &lt; 15 mins
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              <span className="text-indigo-500">🌍</span> 24/7 Global Customer Care
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-secondary)',
              }}
            >
              <span className="text-purple-500">🔒</span> 100% Encrypted & Private
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Contact Channels Grid ── */}
      <section className="py-14 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactChannels.map((channel, i) => (
              <a
                key={i}
                href={channel.link}
                className="p-6 rounded-2xl border hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                style={{
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-color)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${channel.color} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      {channel.icon}
                    </div>
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider"
                      style={{
                        backgroundColor: 'var(--surface-subtle)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {channel.badge}
                    </span>
                  </div>
                  <h3
                    className="text-base font-bold transition-colors group-hover:text-purple-600"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {channel.title}
                  </h3>
                  <p
                    className="text-xs mt-1 leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {channel.desc}
                  </p>
                </div>
                <div
                  className="mt-5 pt-4 border-t flex items-center justify-between text-xs font-bold"
                  style={{
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--brand-primary)',
                  }}
                >
                  <span>{channel.value}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Main Form & Office Info Section ── */}
      <section
        className="py-12 border-y relative"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form */}
            <div
              className="lg:col-span-7 p-6 sm:p-10 rounded-3xl border shadow-xl backdrop-blur-md"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="mb-8">
                <span
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                  style={{
                    backgroundColor: 'var(--accent-purple-bg)',
                    borderColor: 'var(--accent-purple-border)',
                    color: 'var(--accent-purple-text)',
                  }}
                >
                  DIRECT MESSAGE
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Send Us a Message
                </h2>
                <p
                  className="text-xs sm:text-sm mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Fill in your details below and our customer team will get back to you shortly.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl text-emerald-500">
                    ✓
                  </div>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Thank You! Message Received
                  </h3>
                  <p
                    className="text-xs sm:text-sm max-w-md leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    We have safely received your inquiry. One of our specialists will review it and reply directly to your email address within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-3 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="fullName"
                        className="text-xs sm:text-sm font-semibold mb-1.5"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Salah Khaled"
                        className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          borderColor: 'var(--input-border)',
                          color: 'var(--input-text)',
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="email"
                        className="text-xs sm:text-sm font-semibold mb-1.5"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="salah@example.com"
                        className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          borderColor: 'var(--input-border)',
                          color: 'var(--input-text)',
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone (Optional) */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="phone"
                        className="text-xs sm:text-sm font-semibold mb-1.5"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Phone Number <span style={{ color: 'var(--text-muted)' }} className="text-xs">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01012345678"
                        className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          borderColor: 'var(--input-border)',
                          color: 'var(--input-text)',
                        }}
                      />
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="subject"
                        className="text-xs sm:text-sm font-semibold mb-1.5"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Inquiry Topic <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                        style={{
                          backgroundColor: 'var(--input-bg)',
                          borderColor: 'var(--input-border)',
                          color: 'var(--input-text)',
                        }}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Order Tracking & Status">Order Tracking & Status</option>
                        <option value="Refund & Return Request">Refund & Return Request</option>
                        <option value="Product Technical Issue">Product Technical Issue</option>
                        <option value="Partnership & Wholesale">Partnership & Wholesale</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="message"
                        className="text-xs sm:text-sm font-semibold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Detailed Message <span className="text-rose-500">*</span>
                      </label>
                      <span
                        className="text-[11px]"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {formData.message.length} / 1000
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      maxLength={1000}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please describe how we can help you with your order, item inquiry, or feedback..."
                      className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all resize-none"
                      style={{
                        backgroundColor: 'var(--input-bg)',
                        borderColor: 'var(--input-border)',
                        color: 'var(--input-text)',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 rounded-xl font-bold text-sm text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 shadow-xl shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Your Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Office Hours & Department Directory */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Department Directory */}
              <div
                className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-4"
                style={{
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-color)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <h3
                  className="text-lg font-bold flex items-center gap-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span className="text-purple-500">🏢</span> Department Inboxes
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Route your inquiry directly to the specialized division for expedited response:
                </p>

                <div className="flex flex-col gap-3 mt-2">
                  {departments.map((dept, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs"
                      style={{
                        backgroundColor: 'var(--surface-subtle)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <div>
                        <div
                          className="font-semibold"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {dept.name}
                        </div>
                        <a
                          href={`mailto:${dept.email}`}
                          className="hover:underline mt-0.5 block"
                          style={{ color: 'var(--brand-primary)' }}
                        >
                          {dept.email}
                        </a>
                      </div>
                      <span
                        className="px-2.5 py-1 rounded-md border text-[10px] font-bold shrink-0"
                        style={{
                          backgroundColor: 'var(--surface-card)',
                          borderColor: 'var(--border-subtle)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {dept.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policy & Help Link Card */}
              <div
                className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-3"
                style={{
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-color)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-xl text-purple-600 dark:text-purple-300">
                  📑
                </div>
                <h4
                  className="text-base font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Looking for Immediate Answers?
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Most common customer questions regarding our return window, community rules, and privacy protection are answered in detail inside our Policy page.
                </p>
                <div className="mt-2">
                  <Link
                    to="/policy"
                    className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline transition-colors"
                    style={{ color: 'var(--brand-primary)' }}
                  >
                    <span>Read Community Policies & Guarantees</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Security & Response Guarantee */}
              <div
                className="p-5 rounded-2xl border flex items-center gap-4 text-xs"
                style={{
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 text-lg shrink-0">
                  🛡️
                </div>
                <div>
                  <span
                    className="font-bold block"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Strict Privacy Commitment
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    Your information is never shared with third parties.
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Showroom & Physical Location Card ── */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="p-8 sm:p-12 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-8"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div className="max-w-xl text-center md:text-left">
              <span
                className="text-xs font-bold tracking-wide uppercase"
                style={{ color: 'var(--brand-primary)' }}
              >
                COME VISIT OUR HUB
              </span>
              <h3
                className="text-2xl sm:text-3xl font-black mt-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Experience Social App Hub
              </h3>
              <p
                className="text-xs sm:text-sm mt-2 leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                Meet our creator experience team, discuss feature suggestions, or speak with our platform advisors face-to-face.
              </p>
              <div
                className="mt-4 flex flex-col sm:flex-row gap-4 text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">📍</span>
                  <span>Smart Village, Building B4, Cairo, Egypt</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-500">⏰</span>
                  <span>Sun–Thu: 9:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                to="/explore"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-indigo-500 to-purple-500 hover:opacity-95 shadow-md shadow-purple-500/25 transition-all cursor-pointer"
              >
                <span>Explore Catalog</span>
                <span>→</span>
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm border transition-all"
                style={{
                  backgroundColor: 'var(--surface-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>About Our Journey</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
