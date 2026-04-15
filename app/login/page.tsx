"use client";

import React, { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { loginToApi } from "@/features/login/api";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginToApi(email, password);
      
      // Normalize role and add admin fallback for the user's email
      const rawRole = data?.role || (
        email.toLowerCase().includes("admin") || 
        email.toLowerCase() === "prasanthitransetu@gmail.com" ? "admin" : "student"
      );
      const role = rawRole.toLowerCase();
      
      document.cookie = `mock_auth_role=${role}; path=/;`;
      
      if (data?.token || data?.accessToken) {
        document.cookie = `token=${data.token || data.accessToken}; path=/;`;
      }

      // Use full page navigation so the server-side middleware
      // picks up the newly set cookie on the next request.
      window.location.href = "/admin/dashboard";
    } catch (error: any) {
      console.error("Login Error:", error);
      alert(error.message || "Access Denied: Unrecognized role or invalid credentials.");
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full animate-in fade-in slide-in-from-right-8 duration-1000">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-[32px] font-[900] text-slate-900 mb-2.5 tracking-tight leading-tight">
            Welcome to LMS Portal
          </h2>
          <p className="text-slate-400 text-[15px] font-semibold tracking-wide">
            Please enter your details to sign in to your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-7">
          {/* Email Check */}
          <div className="space-y-2.5">
            <label
              htmlFor="email"
              className="text-[12px] font-extrabold text-slate-900 uppercase tracking-[0.12em] block ml-1 opacity-80"
            >
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-500 transition-colors">
                <Mail size={20} strokeWidth={2.5} />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-slate-900 pl-14 pr-5 py-4.5 bg-slate-50/40 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-[15px] font-semibold placeholder:text-slate-200"
              />
            </div>
          </div>

          {/* Password Check */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1.5">
              <label
                htmlFor="password"
                className="text-[12px] font-extrabold text-slate-900 uppercase tracking-[0.12em] block opacity-80"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[12px] font-extrabold text-blue-600 hover:text-blue-700 transition-colors tracking-wider"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-500 transition-colors">
                <Lock size={20} strokeWidth={2.5} />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-slate-900 pl-14 pr-14 py-4.5 bg-slate-50/40 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all text-[15px] font-semibold placeholder:text-slate-200 tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-slate-500 transition-colors"
              >
                {showPassword ? (
                  <EyeOff size={20} strokeWidth={2.5} />
                ) : (
                  <Eye size={20} strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center px-1.5">
            <div className="relative flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-5 w-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer accent-blue-600"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-3.5 block text-[14px] text-slate-500 font-bold cursor-pointer"
            >
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-5 px-6 border border-transparent rounded-[20px] shadow-[0_12px_24px_-4px_rgba(37,99,235,0.24)] text-[16px] font-extrabold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-[14px] text-slate-400 font-semibold">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-extrabold text-blue-600 hover:text-blue-700 transition-colors">
              Contact your administrator
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
