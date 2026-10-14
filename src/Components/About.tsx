import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function About() {
  const stats = [
    { number: '500K+', label: 'Posts Shared' },
    { number: '120K+', label: 'Active Creators' },
    { number: '99.9%', label: 'Feed Uptime' },
    { number: '50+', label: 'Communities' },
  ]

  const values = [
    {
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
      title: 'Authentic Expression',
      desc: 'We empower everyone to express thoughts, share life stories, and engage in meaningful conversations without noise or algorithms getting in the way.',
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30',
      title: 'Creator-Centric Community',
      desc: 'Our platform celebrates positive community culture. We build features that give creators visibility, encouragement, and real connection with their audience.',
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
      title: 'Real-Time Performance',
      desc: 'Lightning-fast feeds, instant comment updates, and fluid interactions powered by modern reactive web technologies.',
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      title: 'Privacy & Safety First',
      desc: 'Your safety is our top priority. We implement robust data encryption, privacy protection, and community guidelines to ensure a respectful environment.',
    },
  ]

  const milestones = [
    {
      year: '2024',
      title: 'The Inception',
      desc: 'Created with a bold vision to give creators and communities a clean, modern social home free from cluttered ads and distracting feeds.',
    },
    {
      year: '2025',
      title: 'Rapid Community Growth',
      desc: 'Reached over 50,000 active members, introducing rich multimedia posts, real-time comment threads, and interactive topic channels.',
    },
    {
      year: '2026',
      title: 'Next-Gen Social Ecosystem',
      desc: 'Now connecting over 120,000+ creators and thinkers with high-speed performance, mobile responsiveness, and vibrant community engagement.',
    },
  ]

  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name="description" content="About" />
      </Helmet>
      
    <div className="w-full flex-1 flex flex-col">
      {/* ── 1. Hero / Story Header ── */}
      <section
        className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        {/* Ambient background light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-137.5 h-87.5 bg-purple-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-semibold mb-6 shadow-sm"
            style={{
              backgroundColor: 'var(--accent-purple-bg)',
              borderColor: 'var(--accent-purple-border)',
              color: 'var(--accent-purple-text)',
            }}
          >
            <span>✨</span> OUR VISION & COMMUNITY
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.15]"
            style={{ color: 'var(--text-primary)' }}
          >
            Empowering Voices, Connecting Communities &{' '}
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Inspiring Stories
            </span>
          </h1>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Social App is crafted to bring people closer together. A space where creators, thinkers, and everyday storytellers share authentic moments, explore trending ideas, and build lasting friendships.
          </p>

          {/* Stats Bar */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-14 pt-10 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-black bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div
                  className="text-xs mt-1 font-semibold"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Core Pillars & Values ── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
              style={{
                backgroundColor: 'var(--accent-purple-bg)',
                borderColor: 'var(--accent-purple-border)',
                color: 'var(--accent-purple-text)',
              }}
            >
              COMMUNITY PRINCIPLES
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3"
              style={{ color: 'var(--text-primary)' }}
            >
              What Defines Our Platform
            </h2>
            <p
              className="text-sm mt-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Our core beliefs guide every feature we create, fostering a healthy, welcoming, and inspiring social space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl border transition-all duration-300 flex items-start gap-5 group"
                style={{
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-color)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div className={`w-12 h-12 rounded-xl ${val.color} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  {val.icon}
                </div>
                <div>
                  <h3
                    className="text-lg font-bold group-hover:text-purple-600 transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {val.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm mt-2 leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Our Journey / Milestones ── */}
      <section
        className="py-16 border-y relative"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Our Journey
            </h2>
            <p
              className="text-xs sm:text-sm mt-1"
              style={{ color: 'var(--text-muted)' }}
            >
              From an ambitious creative concept to a thriving, creator-first social community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border transition-all flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-color)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div>
                  <span className="text-2xl font-black bg-linear-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    {m.year}
                  </span>
                  <h3
                    className="text-base font-bold mt-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="text-xs mt-2 leading-relaxed"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Call to Action Banner ── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="p-8 md:p-14 rounded-3xl border text-center relative overflow-hidden"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h2
              className="text-3xl sm:text-4xl font-black max-w-xl mx-auto"
              style={{ color: 'var(--text-primary)' }}
            >
              Ready to Join the Conversation?
            </h2>
            <p
              className="text-sm max-w-md mx-auto mt-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              Explore trending stories, share your authentic thoughts, and connect with people who share your passions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                to="/home"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 shadow-lg shadow-purple-500/25 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Go to Community Feed</span>
                <span>→</span>
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border transition-all"
                style={{
                  backgroundColor: 'var(--surface-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>Explore Topics</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
