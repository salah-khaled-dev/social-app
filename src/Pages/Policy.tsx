import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface PolicySection {
  id: string
  title: string
  badge: string
  icon: string
  summary: string
  points: {
    heading: string
    text: string
  }[]
}

export default function Policy() {
  const [activeTab, setActiveTab] = useState<'all' | 'privacy' | 'guidelines' | 'terms' | 'safety'>('all')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const policies: PolicySection[] = [
    {
      id: 'privacy',
      title: 'Privacy & Data Protection Policy',
      badge: 'Data Security',
      icon: '🔒',
      summary: 'How Social App protects your personal information, session tokens, and account data under international privacy standards.',
      points: [
        {
          heading: '1. Information We Collect',
          text: 'We collect information you provide directly to us when creating your account, updating your profile, or publishing posts. This includes your username, email address, profile picture, and the content you share.',
        },
        {
          heading: '2. How Your Information Is Used',
          text: 'Your information is used solely to deliver your social feed, enable real-time post interactions, facilitate community comments, and maintain platform stability. We NEVER sell or rent your personal data to external advertisers.',
        },
        {
          heading: '3. 256-Bit SSL Encryption & Token Security',
          text: 'All account sessions, authentication tokens, and API requests are protected by modern 256-bit SSL encryption. Your credentials and passwords are cryptographically hashed and never stored in plain text.',
        },
        {
          heading: '4. Cookies & Session Management',
          text: 'We use secure local storage and essential session tokens only to keep you logged in and preserve your personal theme preferences. No tracking cookies are shared with third parties.',
        },
      ],
    },
    {
      id: 'guidelines',
      title: 'Community Guidelines & Content Rules',
      badge: 'Community Standards',
      icon: '🤝',
      summary: 'Guidelines that ensure a welcoming, respectful, and safe environment for creators, thinkers, and all community members.',
      points: [
        {
          heading: '1. Authentic & Respectful Expression',
          text: 'We encourage diverse viewpoints, creative storytelling, and open dialogue. We ask that all members engage courteously, honoring everyone’s right to express thoughts safely.',
        },
        {
          heading: '2. Zero Tolerance for Harassment & Hate',
          text: 'Bullying, harassment, hate speech, threats, and discrimination based on race, religion, gender, or nationality are strictly forbidden and result in immediate post removal and account action.',
        },
        {
          heading: '3. Originality & Intellectual Property',
          text: 'Share content you created or have the legal right to share. Respect intellectual property rights and acknowledge original creators when sharing creative works.',
        },
        {
          heading: '4. No Spam, Scams, or Deceptive Links',
          text: 'Automated bots, fake engagement schemes, phishing attempts, and mass-posted advertising spam are actively removed to keep our community feed clean and genuine.',
        },
      ],
    },
    {
      id: 'terms',
      title: 'Terms of Service & Usage',
      badge: 'Legal Terms',
      icon: '⚖️',
      summary: 'The contractual terms governing your membership, usage, and content rights across the Social App platform.',
      points: [
        {
          heading: '1. Account Responsibility',
          text: 'You are responsible for maintaining the confidentiality of your account credentials. Any activity originating from your authenticated account remains under your purview.',
        },
        {
          heading: '2. Content Ownership',
          text: 'You retain full ownership of the text, images, and content you post. By posting, you grant Social App a non-exclusive license to display, host, and distribute your content across the platform.',
        },
        {
          heading: '3. Acceptable Platform Use',
          text: 'You agree not to exploit our APIs, attempt unauthorized server access, reverse engineer features, or disrupt service availability for fellow community members.',
        },
        {
          heading: '4. Enforcement & Termination',
          text: 'Social App reserves the right to suspend or terminate accounts that persistently violate our terms of service, engage in abusive behavior, or compromise platform integrity.',
        },
      ],
    },
    {
      id: 'safety',
      title: 'Safety & Moderation Policy',
      badge: 'Platform Safety',
      icon: '🛡️',
      summary: 'Our dedicated approach to active content moderation, swift reporting resolution, and community protection.',
      points: [
        {
          heading: '1. Proactive Content Moderation',
          text: 'We utilize smart automated checks combined with dedicated moderation review to flag and remove harmful content, malicious links, or disruptive behavior.',
        },
        {
          heading: '2. User Reporting & Rapid Action',
          text: 'Every member can report posts or accounts that violate our guidelines. Our trust and safety team reviews reports around the clock with swift turnarounds.',
        },
        {
          heading: '3. User Controls & Privacy Filters',
          text: 'You are in control of your personal space. You can manage your posts, delete past discussions, or block unwanted interactions with a single tap.',
        },
        {
          heading: '4. Account Security & Verification',
          text: 'We continuously monitor for suspicious login patterns and provide secure session termination to protect your profile from unauthorized takeovers.',
        },
      ],
    },
  ]

  const faqs = [
    {
      q: 'Who can view the posts I publish on Social App?',
      a: 'All posts published to the community feed are publicly visible to registered community members. You can view, manage, or delete your posts at any time from your profile or feed.',
    },
    {
      q: 'How do I report inappropriate content or abusive behavior?',
      a: 'You can flag any post directly or reach out to our team via the Contact page. Our moderation team reviews reported violations and takes immediate corrective action.',
    },
    {
      q: 'Do you sell my personal data or profile details to third parties?',
      a: 'No, never. We believe in respectful social networking. We never sell, rent, or trade your personal data, email, or usage history to third-party data brokers.',
    },
    {
      q: 'Can I permanently delete my posts and account?',
      a: 'Yes! You have full control over your content. You can delete any post you have created instantly, or request a complete account deletion with full data erasure.',
    },
    {
      q: 'What happens when someone violates the community guidelines?',
      a: 'Depending on the severity, violations may result in a content warning, temporary posting restrictions, post removal, or permanent account suspension for repeated abuse.',
    },
  ]

  const filteredPolicies = activeTab === 'all' ? policies : policies.filter((p) => p.id === activeTab)

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* ── 1. Hero Header Section ── */}
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
            <span>🛡️</span>
            <span>COMMUNITY GUIDELINES & SAFETY POLICIES</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.15]"
            style={{ color: 'var(--text-primary)' }}
          >
            Safe, Transparent & Inspiring{' '}
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Community for Everyone
            </span>
          </h1>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            At Social App, we are dedicated to protecting your privacy and fostering authentic, positive interactions. Read our community guidelines, data protection standards, and usage rules.
          </p>

          {/* Trust Guarantees Bar */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div
              className="p-3.5 rounded-2xl border text-center"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">Clean Feed</div>
              <div className="text-xs mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>Zero Spam Tolerance</div>
            </div>
            <div
              className="p-3.5 rounded-2xl border text-center"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">256-Bit SSL</div>
              <div className="text-xs mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>Encrypted Sessions</div>
            </div>
            <div
              className="p-3.5 rounded-2xl border text-center"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">Respect First</div>
              <div className="text-xs mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>Community Guidelines</div>
            </div>
            <div
              className="p-3.5 rounded-2xl border text-center"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400">24/7 Safety</div>
              <div className="text-xs mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>Active Moderation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Interactive Navigation Tabs ── */}
      <section
        className="py-6 border-b sticky top-17.5 z-30 backdrop-blur-xl transition-colors"
        style={{
          backgroundColor: 'var(--navbar-bg)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: '📑 All Policies' },
              { id: 'privacy', label: '🔒 Privacy Policy' },
              { id: 'guidelines', label: '🤝 Community Guidelines' },
              { id: 'terms', label: '⚖️ Terms of Service' },
              { id: 'safety', label: '🛡️ Safety & Moderation' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/25'
                    : 'border hover:opacity-100 opacity-80'
                }`}
                style={
                  activeTab !== tab.id
                    ? {
                        backgroundColor: 'var(--surface-subtle)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-secondary)',
                      }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Policy Cards Section ── */}
      <section className="py-14 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-10">
          {filteredPolicies.map((policy) => (
            <div
              key={policy.id}
              className="p-6 sm:p-10 rounded-3xl border transition-all"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Policy Header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-indigo-bg)',
                      borderColor: 'var(--accent-indigo-border)',
                    }}
                  >
                    {policy.icon}
                  </div>
                  <div>
                    <h2
                      className="text-xl sm:text-2xl font-bold tracking-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {policy.title}
                    </h2>
                    <p
                      className="text-xs mt-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {policy.summary}
                    </p>
                  </div>
                </div>
                <span
                  className="self-start sm:self-auto px-3.5 py-1.5 rounded-full text-xs font-bold border shrink-0"
                  style={{
                    backgroundColor: 'var(--accent-indigo-bg)',
                    borderColor: 'var(--accent-indigo-border)',
                    color: 'var(--brand-indigo)',
                  }}
                >
                  {policy.badge}
                </span>
              </div>

              {/* Policy Clauses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {policy.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border flex flex-col justify-start"
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <h3
                      className="text-sm font-bold mb-2"
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      {pt.heading}
                    </h3>
                    <p
                      className="text-xs sm:text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {pt.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Interactive FAQ Section ── */}
      <section
        className="py-16 border-y relative"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
              style={{
                backgroundColor: 'var(--accent-purple-bg)',
                borderColor: 'var(--accent-purple-border)',
                color: 'var(--accent-purple-text)',
              }}
            >
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3"
              style={{ color: 'var(--text-primary)' }}
            >
              Common Questions About Social App
            </h2>
            <p
              className="text-xs sm:text-sm mt-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Have questions about privacy, posting rules, or moderation? Find answers here.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className="rounded-2xl border overflow-hidden transition-all"
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-sm transition-transform duration-200 border ${
                        isOpen ? 'rotate-180 bg-purple-500/20 text-purple-600' : ''
                      }`}
                      style={{
                        backgroundColor: 'var(--surface-subtle)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t"
                      style={{
                        color: 'var(--text-secondary)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Legal Inquiries & Direct Support Box ── */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            className="p-8 sm:p-12 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-8"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div className="max-w-lg text-center md:text-left">
              <span
                className="text-xs font-bold tracking-wide uppercase"
                style={{ color: 'var(--brand-primary)' }}
              >
                HAVE A QUESTION OR NEED TO REPORT AN ISSUE?
              </span>
              <h3
                className="text-2xl sm:text-3xl font-black mt-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Our Community Support Team Is Here
              </h3>
              <p
                className="text-xs sm:text-sm mt-2 leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                If you have inquiries regarding privacy, need help resolving an account issue, or want to submit feedback, contact our support team anytime.
              </p>
              <div
                className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-purple-500">✉️</span> support@social-app.com
                </span>
                <span className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-cyan-500">🛡️</span> safety@social-app.com
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                to="/home"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 shadow-md shadow-purple-500/25 transition-all cursor-pointer"
              >
                <span>Back to Feed</span>
                <span>→</span>
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm border transition-all"
                style={{
                  backgroundColor: 'var(--surface-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
