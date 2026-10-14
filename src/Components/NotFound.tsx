import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-[calc(100vh-70px)] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden select-none transition-colors"
      style={{ background: "var(--bg-radial)" }}
    >
      {/* ── Background Ambient Glow Effects ── */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* ── Main Container Card ── */}
      <div
        className="relative z-10 w-full max-w-2xl border rounded-3xl p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center backdrop-blur-2xl"
        style={{
          backgroundColor: "var(--surface-card)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* 404 Big Glowing Number */}
        <div className="relative my-2">
          <span className="text-8xl sm:text-9xl font-black tracking-tight bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
            404
          </span>
          <div className="absolute inset-0 bg-purple-500/15 blur-2xl -z-10 transform scale-110" />
        </div>

        {/* Title & Description */}
        <h1
          className="text-xl sm:text-2xl font-extrabold mt-2 mb-3 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          The Page You Are Looking For Does Not Exist!
        </h1>
        
        <p
          className="text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          Please check the URL or try returning to the home feed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center max-w-md">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm hover:opacity-90"
            style={{
              backgroundColor: "var(--surface-subtle)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <span>Previous Page</span>
          </button>

          <Link
            to="/home"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 shadow-md shadow-purple-500/25 transition-all cursor-pointer"
          >
            <span>Home Feed</span>
            <span>→</span>
          </Link>
        </div>

        {/* Helpful Quick Links Footer */}
        <div
          className="mt-10 pt-6 border-t w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
        >
          <span>روابط سريعة مقترحة:</span>
          <div className="flex items-center gap-4">
            <span>•</span>
            <Link
              to="/about"
              className="hover:underline transition-colors font-medium"
              style={{ color: "var(--brand-primary)" }}
            >
              من نحن (About)
            </Link>
            <span>•</span>
            <Link
              to="/contact"
              className="hover:underline transition-colors font-medium"
              style={{ color: "var(--brand-primary)" }}
            >
              اتصل بنا (Contact)
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
