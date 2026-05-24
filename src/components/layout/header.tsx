"use client";

import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import Link from "next/link";

export function Header() {
  const [avatarError, setAvatarError] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] backdrop-blur-sm bg-[var(--background)]/80">
      <div className="flex items-center justify-between px-5 sm:px-7 h-14 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-7 h-7 bg-[var(--brand)] rounded-lg flex items-center justify-center shadow-sm group-hover:bg-[var(--brand-hover)] transition-colors duration-150">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 7C2 4.24 4.24 2 7 2C9.76 2 12 4.24 12 7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M7 12C7 12 4 10.5 4 7.5M7 12C7 12 10 10.5 10 7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="7" r="1.2" fill="white"/>
            </svg>
          </div>
          <span className="text-base font-semibold text-[var(--foreground)] tracking-tight">Claryo</span>
        </Link>

        {/* Centre — Search */}
        <div className="flex-1 max-w-sm mx-6 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted-fg)]" />
            <input
              id="global-search"
              type="text"
              placeholder="Search decisions, PRDs, insights..."
              aria-label="Search decisions, PRDs and insights"
              className="w-full bg-[var(--muted)] border border-[var(--border)] rounded-lg pl-9 pr-4 py-1.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/40 focus:bg-[var(--card)] transition-all duration-150"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center rounded border border-[var(--border)] bg-[var(--card)] px-1.5 font-mono text-[10px] text-[var(--muted-fg)]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-[var(--muted-fg)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] rounded-lg transition-colors duration-150">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
          </button>
          <button className="w-7 h-7 rounded-full overflow-hidden border border-[var(--border)] hover:ring-2 hover:ring-[var(--brand)]/40 transition-all duration-150 flex items-center justify-center bg-[var(--brand-hover)] text-stone-900 font-bold text-xs">
            {avatarError ? (
              <span>P</span>
            ) : (
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Prithvi"
                alt="User Avatar"
                className="w-full h-full object-cover"
                onError={() => setAvatarError(true)}
              />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
