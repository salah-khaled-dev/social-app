import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchema,
  type RegisterSchemaType,
} from "../Schemas/auth.schema";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = form;

  function HandleRegister(data: RegisterSchemaType) {
    setApiError(null);
    setIsLoading(true);
    axios
      .post("https://route-posts.routemisr.com/users/signup", data)
      .then((res) => {
        if (
          res.data.success ||
          res.data.message === "account created" ||
          res.data.message === "success" ||
          res.data.status === "success"
        ) {
          navigate("/login");
        }
      })
      .catch((err) => {
        setApiError(
          err.response?.data?.errors ||
            err.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register" />
      </Helmet>
    <section
      className="min-h-[calc(100vh-70px)] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden transition-colors"
      style={{ background: "var(--bg-radial)" }}
    >
      {/* ── Ambient Glow Blobs ── */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-500/15 blur-3xl pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* ── Card ── */}
      <div
        className="relative z-10 w-full max-w-120 rounded-3xl border shadow-2xl overflow-hidden my-4 backdrop-blur-2xl transition-all"
        style={{
          backgroundColor: "var(--surface-card)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Header */}
        <div
          className="p-6 sm:p-8 text-center border-b"
          style={{
            borderColor: "var(--border-subtle)",
            background: "linear-gradient(to bottom, var(--accent-indigo-bg), transparent)",
          }}
        >
          <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25 text-white">
            <svg
              width="26"
              height="26"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Create Account
          </h1>
          <p
            className="text-xs sm:text-sm mt-1"
            style={{ color: "var(--text-muted)" }}
          >
            Join us today — it's fast and easy
          </p>
        </div>

        {/* Form */}
        <form
          className="p-6 sm:p-8 flex flex-col gap-4"
          onSubmit={handleSubmit(HandleRegister)}
        >
          {/* API Error */}
          {apiError && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-xs sm:text-sm font-medium">
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="shrink-0 text-rose-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{apiError}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-semibold mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Full Name
            </label>
            <div className="relative flex items-center">
              <span
                className="absolute left-3.5 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                {...register("name")}
                type="text"
                id="name"
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--input-text)",
                }}
                placeholder="Salah Khaled"
                required
              />
            </div>
            {formState.errors.name?.message && (
              <p className="text-xs font-semibold text-rose-500 mt-1.5 flex items-center gap-1">
                <span>•</span> {formState.errors.name?.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-semibold mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <span
                className="absolute left-3.5 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--input-text)",
                }}
                placeholder="name@company.com"
                required
              />
            </div>
            {formState.errors.email?.message && (
              <p className="text-xs font-semibold text-rose-500 mt-1.5 flex items-center gap-1">
                <span>•</span> {formState.errors.email?.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-semibold mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Password
            </label>
            <div className="relative flex items-center">
              <span
                className="absolute left-3.5 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full pl-11 pr-11 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--input-text)",
                }}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-2.5 p-1.5 rounded-lg transition-colors cursor-pointer hover:opacity-100 opacity-60"
                style={{ color: "var(--text-muted)" }}
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {formState.errors.password?.message && (
              <p className="text-xs font-semibold text-rose-500 mt-1.5 flex items-center gap-1">
                <span>•</span> {formState.errors.password?.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label
              htmlFor="rePassword"
              className="block text-xs sm:text-sm font-semibold mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <span
                className="absolute left-3.5 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <input
                {...register("rePassword")}
                type={showConfirm ? "text" : "password"}
                id="rePassword"
                className="w-full pl-11 pr-11 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--input-text)",
                }}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-2.5 p-1.5 rounded-lg transition-colors cursor-pointer hover:opacity-100 opacity-60"
                style={{ color: "var(--text-muted)" }}
                onClick={() => setShowConfirm((p) => !p)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? (
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {formState.errors.rePassword?.message && (
              <p className="text-xs font-semibold text-rose-500 mt-1.5 flex items-center gap-1">
                <span>•</span> {formState.errors.rePassword?.message}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label
              htmlFor="dateOfBirth"
              className="block text-xs sm:text-sm font-semibold mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Date of Birth
            </label>
            <div className="relative flex items-center">
              <span
                className="absolute left-3.5 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                {...register("dateOfBirth")}
                type="date"
                id="dateOfBirth"
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all"
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--input-text)",
                }}
                required
              />
            </div>
            {formState.errors.dateOfBirth?.message && (
              <p className="text-xs font-semibold text-rose-500 mt-1.5 flex items-center gap-1">
                <span>•</span> {formState.errors.dateOfBirth?.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label
              className="block text-xs sm:text-sm font-semibold mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                htmlFor="gender-male"
                className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all hover:opacity-95"
                style={{
                  backgroundColor: "var(--surface-subtle)",
                  borderColor: "var(--border-color)",
                }}
              >
                <input
                  {...register("gender")}
                  type="radio"
                  id="gender-male"
                  value="male"
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                />
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  Male
                </span>
              </label>

              <label
                htmlFor="gender-female"
                className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all hover:opacity-95"
                style={{
                  backgroundColor: "var(--surface-subtle)",
                  borderColor: "var(--border-color)",
                }}
              >
                <input
                  {...register("gender")}
                  type="radio"
                  id="gender-female"
                  value="female"
                  className="w-4 h-4 accent-purple-600 cursor-pointer"
                />
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  Female
                </span>
              </label>
            </div>
            {formState.errors.gender?.message && (
              <p className="text-xs font-semibold text-rose-500 mt-1.5 flex items-center gap-1">
                <span>•</span> {formState.errors.gender?.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 mt-1">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 mt-1 accent-purple-600 rounded cursor-pointer shrink-0"
              required
            />
            <label
              htmlFor="terms"
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              I agree to the{" "}
              <Link
                to="/policy"
                className="font-semibold hover:underline"
                style={{ color: "var(--brand-primary)" }}
              >
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/policy"
                className="font-semibold hover:underline"
                style={{ color: "var(--brand-primary)" }}
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 shadow-lg shadow-purple-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <span className="flex-1 h-px" style={{ backgroundColor: "var(--border-subtle)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              or sign up with
            </span>
            <span className="flex-1 h-px" style={{ backgroundColor: "var(--border-subtle)" }} />
          </div>

          {/* Social Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm hover:opacity-90"
              style={{
                backgroundColor: "var(--surface-subtle)",
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm hover:opacity-90"
              style={{
                backgroundColor: "var(--surface-subtle)",
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          {/* Login link */}
          <p
            className="text-center text-xs sm:text-sm mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold hover:underline transition-colors"
              style={{ color: "var(--brand-primary)" }}
            >
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </section>
    </>
  );
}
