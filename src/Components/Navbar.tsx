import React, { useState, useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/home', label: 'Feed' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { userLogin, setUserLogin } = useContext(AuthContext)
  const navigate = useNavigate()

  function logOut() {
    localStorage.removeItem("userToken")
    setUserLogin(null)
    navigate("/login")
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-200"
        style={{
          backgroundColor: 'var(--navbar-bg)',
          borderColor: 'var(--navbar-border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-17.5 flex items-center justify-between gap-4">

          {/* ── Brand Logo ── */}
          <NavLink
            to={userLogin ? "/home" : "/login"}
            className="group flex items-center gap-3 font-extrabold text-xl tracking-tight hover:opacity-95 transition-all"
            style={{ color: 'var(--text-primary)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-30"></div>
              {/* Social Community / Chat Bubbles Logo Icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <path d="M14 9a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h1v3l3-3h2a3 3 0 0 0 3-3V9Z" />
                <path d="M18 9h1a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-1v3l-3-3h-4a3 3 0 0 1-2.83-2" />
              </svg>
            </div>
            <span className="font-black text-xl tracking-tight">
              Social<span className="bg-linear-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"> App</span>
            </span>
          </NavLink>

          {/* ── Desktop Navigation Links ── */}
          {userLogin ? (
            <ul
              className="hidden md:flex items-center gap-1.5 p-1 rounded-full border transition-colors"
              style={{
                backgroundColor: 'var(--surface-subtle)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              {links.map(({ to, label }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                        isActive
                          ? 'border border-purple-500/40 shadow-sm font-bold'
                          : 'border border-transparent hover:opacity-100 opacity-80'
                      }`
                    }
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                      backgroundColor: isActive ? 'var(--accent-purple-bg)' : 'transparent',
                    })}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : null}

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-3">
            {/* Day / Night toggle */}
            <ThemeToggle />

            {/* Auth Buttons */}
            {!userLogin ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
                  style={{
                    color: 'var(--text-secondary)',
                  }}
                >
                  Sign In / الدخول
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 shadow-md shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  Register / التسجيل
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/profile"
                  className="px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 border"
                  style={{
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--surface-subtle)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Profile</span>
                </Link>
                <button
                  type="button"
                  onClick={logOut}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-rose-500 hover:text-white bg-rose-500/10 hover:bg-rose-500 border border-rose-500/30 hover:border-rose-500 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--surface-subtle)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              onClick={() => setMenuOpen(p => !p)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Dropdown ── */}
        {menuOpen && (
          <div
            className="md:hidden flex flex-col gap-1 p-4 backdrop-blur-2xl border-b shadow-2xl"
            style={{
              backgroundColor: 'var(--popover-bg)',
              borderColor: 'var(--popover-border)',
            }}
          >
            {userLogin ? (
              <>
                {links.map(({ to, label }) => (
                  <NavLink
                    key={label}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'font-bold border border-purple-500/30'
                          : 'opacity-85 hover:opacity-100'
                      }`
                    }
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--brand-primary)' : 'var(--text-primary)',
                      backgroundColor: isActive ? 'var(--accent-purple-bg)' : 'transparent',
                    })}
                  >
                    {label}
                  </NavLink>
                ))}

                <div className="h-px my-2" style={{ backgroundColor: 'var(--border-subtle)' }} />

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span className="text-purple-500">👤</span>
                  <span>My Profile (الملف الشخصي)</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    logOut()
                  }}
                  className="mt-2 w-full py-3 rounded-xl text-center text-sm font-bold text-rose-500 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                >
                  Log Out (تسجيل الخروج)
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span className="text-cyan-500">🔑</span>
                  <span>Sign In (تسجيل الدخول)</span>
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 w-full py-3 rounded-xl text-center text-sm font-bold text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md shadow-purple-500/25"
                >
                  Create Account (التسجيل)
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className="h-17.5" />
    </>
  )
}
