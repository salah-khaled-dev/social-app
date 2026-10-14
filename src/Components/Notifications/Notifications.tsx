import React from 'react'
import { Bell, Heart, MessageCircle, Share2, Sparkles, UserPlus } from 'lucide-react'

export default function Notifications() {
  const notificationsList = [
    {
      id: 1,
      type: 'like',
      icon: <Heart className="w-4 h-4 text-rose-500" />,
      user: 'Ahmed Abd Al-Muti',
      action: 'liked your post',
      time: '10 minutes ago',
      unread: true,
    },
    {
      id: 2,
      type: 'comment',
      icon: <MessageCircle className="w-4 h-4 text-purple-500" />,
      user: 'Youssef Osama',
      action: 'commented: "Great insights!"',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      type: 'follow',
      icon: <UserPlus className="w-4 h-4 text-indigo-500" />,
      user: 'Mourad Zin',
      action: 'started following you',
      time: '3 hours ago',
      unread: false,
    },
    {
      id: 4,
      type: 'share',
      icon: <Share2 className="w-4 h-4 text-emerald-500" />,
      user: 'malak gamal',
      action: 'shared your update to their network',
      time: 'Yesterday',
      unread: false,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full flex-1">
      {/* Header */}
      <div
        className="flex items-center justify-between pb-6 mb-6 border-b"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1
              className="text-2xl font-black tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Notifications
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Stay updated with your community interactions
            </p>
          </div>
        </div>

        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
          style={{
            backgroundColor: 'var(--accent-purple-bg)',
            borderColor: 'var(--accent-purple-border)',
            color: 'var(--brand-primary)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          2 New
        </span>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {notificationsList.map((n) => (
          <div
            key={n.id}
            className="p-4 sm:p-5 rounded-2xl border transition-all flex items-start gap-3.5"
            style={{
              backgroundColor: n.unread ? 'var(--surface-subtle)' : 'var(--surface-card)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-sm"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              {n.icon}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-bold mr-1" style={{ color: 'var(--text-primary)' }}>
                  {n.user}
                </span>
                {n.action}
              </p>
              <span className="text-[11px] mt-1 block" style={{ color: 'var(--text-muted)' }}>
                {n.time}
              </span>
            </div>

            {n.unread && (
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
