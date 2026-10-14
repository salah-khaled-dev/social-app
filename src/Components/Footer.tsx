import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 5000)
    }
  }

  return (
    <footer
      className="border-t relative overflow-hidden mt-auto transition-colors"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Subtle top ambient light glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-purple-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Top Community Feature Highlights ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-b"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          
          {/* Card 1: Real-time Feed */}
          <div
            className="flex items-center gap-4 p-4 rounded-2xl border transition-all"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Real-Time Feed</h4>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Instant updates & interactive posts</p>
            </div>
          </div>

          {/* Card 2: Creator Community */}
          <div
            className="flex items-center gap-4 p-4 rounded-2xl border transition-all"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Vibrant Community</h4>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Connect with creators & friends</p>
            </div>
          </div>

          {/* Card 3: Privacy & Safety */}
          <div
            className="flex items-center gap-4 p-4 rounded-2xl border transition-all"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Safe & Private</h4>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Encrypted sessions & guidelines</p>
            </div>
          </div>

          {/* Card 4: Multi-Device Accessible */}
          <div
            className="flex items-center gap-4 p-4 rounded-2xl border transition-all"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Cross-Platform</h4>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Fluid on desktop, tablet & mobile</p>
            </div>
          </div>
        </div>

        {/* ── Main 4-Column Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">

          {/* Col 1: Brand & Community Identity */}
          <div className="flex flex-col gap-4">
            <NavLink to="/home" className="flex items-center gap-3 font-extrabold text-xl tracking-tight hover:opacity-95 transition-all" style={{ color: 'var(--text-primary)' }}>
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/25 text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h1v3l3-3h2a3 3 0 0 0 3-3V9Z" />
                  <path d="M18 9h1a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-1v3l-3-3h-4a3 3 0 0 1-2.83-2" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tight">
                Social<span className="bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"> App</span>
              </span>
            </NavLink>

            <p className="text-xs leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
              A modern social community connecting minds, stories, and creative voices. Express your thoughts, share moments, and explore what is trending today.
            </p>

            {/* Platform Live Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Platform Live & Active</span>
            </div>
          </div>

          {/* Col 2: Platform Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>
              Platform & Feed
              <span className="block w-6 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full mt-2" />
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              {[
                { to: '/home', label: 'Community Feed (الرئيسية)' },
                { to: '/explore', label: 'Explore Channels (استكشاف)' },
                { to: '/profile', label: 'My Profile (الملف الشخصي)' },
                { to: '/about', label: 'About Social App (عن المنصة)' },
                { to: '/contact', label: 'Contact Support (الدعم)' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span className="text-purple-500">→</span>
                    <span className="hover:underline">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Community & Guidelines */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>
              Community & Safety
              <span className="block w-6 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full mt-2" />
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              {[
                { to: '/policy', label: 'Community Guidelines (إرشادات المجتمع)' },
                { to: '/policy', label: 'Privacy Policy (سياسة الخصوصية)' },
                { to: '/policy', label: 'Terms of Service (شروط الاستخدام)' },
                { to: '/contact', label: 'Help Center (مركز المساعدة)' },
              ].map((l, i) => (
                <li key={i}>
                  <Link
                    to={l.to}
                    className="hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span className="text-purple-500">→</span>
                    <span className="hover:underline">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Stay Connected */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>
              Stay in the Loop
              <span className="block w-6 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full mt-2" />
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Get weekly highlights on trending community stories, new features, and creator insights.
            </p>

            <form className="relative flex items-center mt-1" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-3.5 pr-12 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: 'var(--input-border)',
                  color: 'var(--input-text)',
                }}
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 w-8 h-8 rounded-lg bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shadow-sm shadow-purple-500/25"
                aria-label="Subscribe"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            {isSubscribed && (
              <p className="text-emerald-500 text-[11px] font-semibold flex items-center gap-1.5">
                <span>✓</span> Subscribed! Welcome to our community.
              </p>
            )}

            {/* Trending Tags */}
            <div className="mt-2">
              <span className="text-[11px] block mb-2 font-medium" style={{ color: 'var(--text-muted)' }}>
                Trending Discussions:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {['#Technology', '#Design', '#Community', '#Creators'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg border text-[10px] font-semibold cursor-default transition-all"
                    style={{
                      backgroundColor: 'var(--surface-card)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--brand-primary)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar: Copyright & Social Links ── */}
        <div
          className="border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs"
          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>© {new Date().getFullYear()} Social App. All rights reserved.</span>
            <span className="hidden sm:inline opacity-30">•</span>
            <span>Connecting minds & communities</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {[
              {
                label: 'GitHub',
                href: 'https://github.com',
                color: 'hover:text-purple-500',
                svg: <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com',
                color: 'hover:text-cyan-500',
                svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com',
                color: 'hover:text-blue-500',
                svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              }
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${soc.color}`}
                style={{
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-muted)',
                }}
                aria-label={soc.label}
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  {soc.svg}
                </svg>
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
