"use client";

import React from "react";
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  BrainCircuit,
  FileText,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

const stats = [
  { icon: TrendingUp,  label: "Insight Velocity",  value: "+24%",   trend: "up" },
  { icon: Users,       label: "User Pulse",         value: "92/100", trend: "stable" },
  { icon: Clock,       label: "Time Saved",         value: "14.5 hrs", trend: "up" },
  { icon: CheckCircle2, label: "Decisions Closed",  value: "12",     trend: "up" },
];

const decisions = [
  {
    title: "Prioritize Mobile-First Workspace",
    description: "User feedback indicates 40% growth in field-based usage. Current mobile experience leads to 15% drop-off in PRD drafting.",
    status: "Analyzing",
    tags: ["Market Trend", "UX Logic"],
  },
  {
    title: "Deprecate Legacy Feedback API",
    description: "Maintenance overhead for v1.0 feedback sync is outpacing usage. 85% of users migrated to v2.5 automatically.",
    status: "Ready for PRD",
    tags: ["Technical Debt", "Migration"],
  },
];

export default function Home() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      {/* ── Hero ── */}
      <motion.div variants={item} className="space-y-3">
        <p className="label-eyebrow flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          Welcome back, Prithvi
        </p>
        <h1 className="text-foreground">Active Product Strategy</h1>
        <p className="text-base text-[var(--muted-fg)] max-w-lg leading-relaxed">
          Your AI engine has analyzed recent customer feedback and market trends.
          Three critical insights are ready for multi-factor decision analysis.
        </p>
      </motion.div>

      {/* ── Quick Stats ── */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </motion.div>

      {/* ── Main Grid ── */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Priority Insights — 2/3 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[var(--foreground)]">Priority Insights</h3>
            <button className="text-xs font-medium text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors duration-150">
              View all →
            </button>
          </div>
          {decisions.map((d) => (
            <DecisionCard key={d.title} {...d} />
          ))}
        </div>

        {/* Side column — 1/3 */}
        <div className="space-y-6">
          {/* CTA card */}
          <div className="rounded-xl bg-[var(--muted)] border border-[var(--border)] p-5 space-y-4">
            <div>
              <p className="label-eyebrow">AI Assistant</p>
              <h3 className="text-[var(--foreground)] mt-1">Run Decision AI</h3>
              <p className="text-sm text-[var(--muted-fg)] mt-1">Compare 3 paths for Q3 roadmap</p>
            </div>
            <Link
              href="/decision"
              className="flex items-center justify-center gap-2 w-full bg-[var(--foreground)] text-[var(--background)] rounded-lg py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity duration-150"
            >
              <BrainCircuit className="w-4 h-4" />
              Execute Simulation
            </Link>
          </div>

          {/* Recent PRDs */}
          <div className="space-y-3">
            <p className="label-eyebrow">Recent PRDs</p>
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[var(--muted)] border border-transparent hover:border-[var(--border)] transition-all duration-150 text-left group"
              >
                <div className="w-9 h-9 bg-[var(--card)] border border-[var(--border)] rounded-lg flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-[var(--muted-fg)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">Feature: Dynamic Grids v{i + 1}</p>
                  <p className="text-xs text-[var(--muted-fg)]">Modified {i * 2}h ago</p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted-fg)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Stat Card ── */
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: string;
}
function StatCard({ icon: Icon, label, value, trend }: StatCardProps) {
  return (
    <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-5 hover:border-[var(--brand)]/30 hover:shadow-sm transition-all duration-150">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[var(--muted)] rounded-lg">
          <Icon className="w-4 h-4 text-[var(--muted-fg)]" />
        </div>
        <span className={cn(
          "text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider",
          trend === "up"
            ? "bg-[var(--success-subtle)] text-[var(--success)]"
            : "bg-[var(--muted)] text-[var(--muted-fg)]"
        )}>
          {trend === "up" ? "↑ Growth" : "Stable"}
        </span>
      </div>
      <p className="mono-data text-2xl text-[var(--foreground)]">{value}</p>
      <p className="label-eyebrow mt-1">{label}</p>
    </div>
  );
}

/* ── Decision Card ── */
interface DecisionCardProps {
  title: string;
  description: string;
  status: string;
  tags: string[];
}
function DecisionCard({ title, description, status, tags }: DecisionCardProps) {
  return (
    <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-5 hover:border-[var(--brand)]/30 hover:shadow-sm transition-all duration-150 group">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[var(--muted)] rounded-xl flex items-center justify-center shrink-0 border border-[var(--border)]">
          <MessageSquare className="w-4.5 h-4.5 text-[var(--muted-fg)]" />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-[var(--foreground)] leading-snug">{title}</h4>
            <span className={cn(
              "shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border",
              status === "Analyzing"
                ? "bg-[var(--warning-subtle)] text-[var(--warning)] border-[var(--warning)]/20"
                : "bg-blue-50 text-blue-600 border-blue-100"
            )}>
              {status}
            </span>
          </div>
          <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{description}</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[var(--muted)] text-[var(--muted-fg)] text-[10px] font-medium border border-[var(--border)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button className="p-1.5 text-[var(--muted-fg)] hover:text-[var(--foreground)] transition-colors opacity-0 group-hover:opacity-100">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
