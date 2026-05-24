"use client";

import React from "react";
import {
  SquarePen,
  Lightbulb,
  BrainCircuit,
  FileText,
  Settings,
  HelpCircle,
  Plus,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./app-layout";

const navItems = [
  { icon: SquarePen, label: "Input",    id: "input",    href: "/input",    order: 0 },
  { icon: Lightbulb, label: "Insights", id: "insights", href: "/insights", order: 1 },
  { icon: BrainCircuit, label: "Decide", id: "decision", href: "/decision", order: 2 },
  { icon: FileText,  label: "PRD",     id: "prd",      href: "/prd",      order: 3 },
];

export function Sidebar() {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const pathname = usePathname();
  const currentIndex = navItems.find((item) => item.href === pathname)?.order ?? -1;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 220 }}
      transition={{ type: "spring", stiffness: 340, damping: 32 }}
      className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-[var(--background)] border-r border-[var(--border-subtle)] z-40 flex flex-col overflow-hidden"
    >
      <div className="flex-1 px-3 py-4 space-y-1 overflow-hidden">

        {/* New Session CTA */}
        <div className="mb-4">
          <Link
            href="/input"
            className={cn(
              "flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
              "bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white",
              isCollapsed && "justify-center px-2"
            )}
          >
            <Plus className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden font-semibold tracking-tight"
                >
                  New Analysis
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Section Label */}
        {!isCollapsed && (
          <p className="label-eyebrow px-3 pb-1">Pipeline</p>
        )}

        {/* Nav Items */}
        <div className="space-y-0.5 relative">
          {/* Connector line */}
          {!isCollapsed && (
            <div className="absolute left-[22px] top-8 bottom-8 w-px bg-[var(--border)] z-0 pointer-events-none" />
          )}

          {navItems.map((navItem) => {
            const Icon = navItem.icon;
            const isActive = pathname === navItem.href;
            const isCompleted = navItem.order < currentIndex;
            const isUpcoming = navItem.order > currentIndex && currentIndex !== -1;

            return (
              <Link
                key={navItem.id}
                href={navItem.href}
                className={cn(
                  "relative flex items-center w-full rounded-lg transition-all duration-150 z-10",
                  isCollapsed ? "p-2.5 justify-center" : "px-3 py-2 gap-3",
                  isActive
                    ? "bg-[var(--accent)] text-[var(--foreground)]"
                    : isUpcoming
                    ? "text-[var(--muted-fg)] opacity-50 cursor-default"
                    : "text-[var(--muted-fg)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
                )}
              >
                {/* Icon slot */}
                <div className="w-5 h-5 shrink-0 flex items-center justify-center relative z-10 bg-[var(--background)]">
                  <AnimatePresence mode="wait">
                    {isCompleted && !isActive ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="w-4 h-4 rounded-full bg-[var(--success-subtle)] flex items-center justify-center"
                      >
                        <Check className="w-2.5 h-2.5 text-[var(--success)]" strokeWidth={2.5} />
                      </motion.div>
                    ) : (
                      <motion.div key="icon">
                        <Icon
                          className={cn(
                            "w-4 h-4",
                            isActive ? "text-[var(--foreground)]" : ""
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {navItem.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active pill indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[var(--brand)] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom utilities */}
      <div className="px-3 py-3 border-t border-[var(--border-subtle)] space-y-0.5">
        {[
          { icon: HelpCircle, label: "Support" },
          { icon: Settings, label: "Settings" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className={cn(
              "flex items-center w-full rounded-lg text-[var(--muted-fg)] hover:bg-[var(--accent)] hover:text-[var(--foreground)] transition-all duration-150",
              isCollapsed ? "p-2.5 justify-center" : "px-3 py-2 gap-3"
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-[var(--card)] border border-[var(--border)] rounded-full flex items-center justify-center hover:bg-[var(--accent)] shadow-sm z-50 transition-colors duration-150"
        aria-label="Toggle sidebar"
      >
        <motion.svg
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          width="10" height="10" viewBox="0 0 10 10" fill="none"
        >
          <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </button>
    </motion.aside>
  );
}
