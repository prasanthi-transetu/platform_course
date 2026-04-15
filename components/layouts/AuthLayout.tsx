import Image from "next/image";
import { BookOpen } from "lucide-react";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex w-full font-sans selection:bg-blue-100">
      {/* Left Pane (Branding & Image) */}
      <div className="hidden lg:flex w-[45%] bg-[#F0F7FF] flex-col p-16 relative overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-20">
          <div className="bg-[#2563EB] p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <BookOpen size={24} fill="currentColor" />
          </div>
          <span className="text-[#2563EB] font-bold text-2xl tracking-tight">
            LMS Portal
          </span>
        </div>

        {/* Central Content */}
        <div className="flex-1 flex flex-col justify-center max-w-md">
          {/* Image Container with Floating Badge */}
          <div className="relative w-full mb-12">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border-[10px] border-white">
              <Image
                src="/auth-image.png"
                alt="Students studying"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 flex items-center gap-5 z-10 border border-slate-50 animate-in fade-in zoom-in duration-500 delay-300">
              <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-900 leading-tight">
                  Excellence in Learning
                </p>
                <p className="text-[13px] font-semibold text-slate-400 mt-1">
                  Over 10,000 active students
                </p>
              </div>
            </div>
          </div>

          {/* Copy Text */}
          <div className="space-y-6">
            <h1 className="text-[36px] font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Empower your academic<br />journey.
            </h1>
            <p className="text-slate-500 text-[16px] leading-relaxed font-medium">
              Access your courses, track your progress, and collaborate
              with your peers in a unified digital learning environment
              designed for modern education.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto text-[14px] text-slate-400 font-bold tracking-wide opacity-60">
          © 2024 LMS Portal. All rights reserved.
        </div>
      </div>

      {/* Right Pane (Dynamic Content) */}
      <div className="flex-1 bg-white flex flex-col justify-center px-6 sm:px-16 md:px-24 xl:px-40 relative">
        <div className="w-full max-w-[440px] mx-auto">
          {children}
        </div>
        
        {/* Right Footer Links */}
        <div className="absolute bottom-12 left-0 right-0 hidden sm:flex justify-center gap-10 text-[12px] font-extrabold text-slate-300">
          <a href="#" className="hover:text-slate-500 transition-colors uppercase tracking-[0.15em]">Help Center</a>
          <a href="#" className="hover:text-slate-500 transition-colors uppercase tracking-[0.15em]">Privacy Policy</a>
          <a href="#" className="hover:text-slate-500 transition-colors uppercase tracking-[0.15em]">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
