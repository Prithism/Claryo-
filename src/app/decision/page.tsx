"use client";

import React, { useState } from "react";
import { 
  Target, 
  TrendingUp, 
  Zap, 
  RefreshCcw, 
  Edit3, 
  Check, 
  HelpCircle,
  AlertCircle,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DecisionPage() {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => setIsRegenerating(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-10">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-stone-200 pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-beige-hover font-bold text-xs uppercase tracking-widest">
            <Zap className="w-4 h-4" />
            Decision Engine Active
          </div>
          <h1 className="text-4xl font-bold text-stone-900 tracking-tight">Prioritization Logic</h1>
          <p className="text-stone-500 font-medium max-w-xl">
            We've mapped your insights to technical feasibility and business goals. 
            Adjust the inputs to refine its priority.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-stone-200 text-stone-500 hover:text-stone-900">
            Export to Jira
          </Button>
          <Button 
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="rounded-xl gap-2 h-11 px-6"
          >
            <RefreshCcw className={cn("w-4 h-4", isRegenerating && "animate-spin")} />
            {isRegenerating ? "Recalculating..." : "Regenerate Analysis"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Decision Details */}
        <div className="lg:col-span-8 space-y-6">
          
          <DecisionCard 
            icon={AlertCircle}
            title="Problem Clarity"
            content="The current mobile workspace forces PMs to 'save for later' instead of 'capture in moment', leading to a 35% loss of high-fidelity ground data. Friction in the entry point is the primary churn cause."
            label="Root Cause Identified"
          />

          <div className="grid grid-cols-2 gap-6">
            <DecisionCard 
              icon={Target}
              title="Target Users"
              content="Mid-to-Senior PMs in high-growth startups who spend >3 hours daily in field/mobile contexts."
              label="Segment Priority: High"
            />
            <DecisionCard 
              icon={TrendingUp}
              title="Business Impact"
              content="Directly impacts Retention (+12% est.) and Data Quality for AI insights (+40%)."
              label="Strategic Alignment"
              impactValue={85}
            />
          </div>

          <Card className="p-8 border-2 border-stone-100 bg-stone-50/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-stone-900 tracking-tight">Executive Summary</h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-400">
                <Edit3 className="w-3 h-3" /> Editable
              </div>
            </div>
            <textarea 
              className="w-full bg-white border-stone-100 rounded-2xl p-6 text-stone-600 leading-relaxed min-h-[120px] focus:ring-brand-beige focus:border-brand-beige border-2 transition-all outline-none"
              defaultValue="Implementing a 'Quick Capture' layer on mobile will reduce friction from 4 taps to 1. This bypasses the heavy workspace init and stores local encrypted buffers. The high technical cost is offset by the critical data retention increase."
            />
          </Card>
        </div>

        {/* Right: Score and Actions */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <Card className="p-8 border-2 border-brand-beige bg-white shadow-xl shadow-brand-beige/5">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-beige/30 border-4 border-brand-beige text-brand-beige-hover font-black text-4xl mb-4">
                8.4
              </div>
              <div>
                <h4 className="text-2xl font-bold text-stone-900 leading-none">Priority Score</h4>
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mt-3">High Confidence (92%)</p>
              </div>
              
              <div className="space-y-4 pt-6">
                <ScoreMetric label="Demand Intensity" value={9} />
                <ScoreMetric label="Technical Effort" value={4} invert />
                <ScoreMetric label="Strategic Value" value={8} />
              </div>

              <div className="pt-8 w-full">
                <Button className="w-full h-14 rounded-2xl text-lg font-bold gap-2 group">
                  Proceed to PRD <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter mt-4 flex items-center justify-center gap-1">
                  <HelpCircle className="w-3 h-3" /> Requires Senior Architect sign-off
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h5 className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] px-2">Decision Context</h5>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 space-y-3">
              <p className="text-xs text-stone-500 font-medium leading-relaxed">
                Based on <span className="text-stone-900 border-b border-brand-beige">Insight Cluster #24</span> and <span className="text-stone-900 border-b border-brand-beige">Market Trend Log (Q2)</span>.
              </p>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-full h-1 bg-brand-beige rounded-full opacity-30" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DecisionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  label?: string;
  impactValue?: number;
}
function DecisionCard({ icon: Icon, title, content, label, impactValue }: DecisionCardProps) {
  return (
    <Card className="group p-6 border-2 border-stone-100 hover:border-brand-beige/50 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-stone-50 rounded-xl text-stone-400 group-hover:text-brand-beige-hover group-hover:bg-brand-beige/20 transition-all">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest text-stone-400">{title}</h3>
            {label && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" /> {label}
              </span>
            )}
          </div>
          <p className="text-[15px] font-medium text-stone-600 leading-relaxed">
            {content}
          </p>
          
          {impactValue !== undefined && (
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
                <span>Impact Analysis</span>
                <span>{impactValue}% Criticality</span>
              </div>
              <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${impactValue}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-brand-beige rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

interface ScoreMetricProps {
  label: string;
  value: number;
  invert?: boolean;
}
function ScoreMetric({ label, value, invert }: ScoreMetricProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-bold text-stone-500 shrink-0">{label}</span>
      <div className="flex-1 flex gap-1 justify-end">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-3 w-1.5 rounded-sm transition-all",
              i < value 
                ? (invert && i > 6 ? "bg-rose-400" : "bg-brand-beige") 
                : "bg-stone-100"
            )} 
          />
        ))}
      </div>
    </div>
  );
}
