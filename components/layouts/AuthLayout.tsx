import Image from "next/image";
import { BookOpen } from "lucide-react";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left Pane (Branding & Image) */}
      <div className="hidden lg:flex w-1/2 bg-[#eaf2fb] flex-col p-12 relative overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="bg-blue-600 p-1.5 rounded-md text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-blue-600 font-bold text-xl tracking-tight">
            LMS Portal
          </span>
        </div>

        {/* Central Content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Image Container with Floating Badge */}
          <div className="relative max-w-lg w-full mb-10">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/auth-image.png"
                alt="Students studying"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 right-6 md:-right-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-4 z-10 w-fit whitespace-nowrap">
              <div className="bg-blue-50 text-blue-600 p-2.5 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Excellence in Learning
                </p>
                <p className="text-xs text-slate-500">
                  Over 10,000 active students
                </p>
              </div>
            </div>
          </div>

          {/* Copy Text */}
          <div className="max-w-md mt-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
              Empower your academic<br />journey.
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Access your courses, track your progress, and collaborate
              with your peers in a unified digital learning environment
              designed for modern education.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-xs text-slate-400 font-medium">
          © 2024 LMS Portal. All rights reserved.
        </div>
      </div>

      {/* Right Pane (Dynamic Content) */}
      <div className="flex-1 bg-white flex flex-col justify-center px-4 sm:px-12 md:px-24 xl:px-48 relative">
        {children}
        
        {/* Right Footer Links */}
        <div className="absolute bottom-8 left-0 right-0 hidden sm:flex justify-center gap-6 text-xs text-slate-400">
          <a href="#" className="hover:text-slate-600 transition-colors">Help Center</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
