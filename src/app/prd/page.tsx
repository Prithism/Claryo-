"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Share2, 
  Download, 
  Copy, 
  MoreVertical, 
  Plus, 
  CheckCircle2, 
  BarChart3, 
  Users2, 
  Layout, 
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function PRDPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-16">
      {/* Document Header */}
      <div className="space-y-8">
        <div className="flex items-center justify-between text-stone-400">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            AI Draft Generated • 2m ago
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-[#f3efe7] hover:bg-[#e7e2d9] text-stone-700 text-sm px-3 py-1.5 rounded-lg transition-all duration-200 font-semibold active:scale-95">
              Regenerate
            </button>
            <button className="bg-[#f3efe7] hover:bg-[#e7e2d9] text-stone-700 text-sm px-3 py-1.5 rounded-lg transition-all duration-200 font-semibold active:scale-95">
              Refine
            </button>
            <div className="w-px h-4 bg-stone-200 mx-2" />
            <button className="p-2 hover:bg-stone-100 rounded-lg transition-all duration-200 text-stone-400 hover:text-stone-900"><Share2 size={18} /></button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-stone-50 rounded-lg transition-all duration-200 border border-stone-200 text-sm font-semibold text-stone-600">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Decision Context */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-[#e7e2d9] rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-2">Insight Summary</p>
            <p className="text-sm text-stone-800 leading-relaxed font-medium">Capture friction is causing 15% data loss in field-research contexts.</p>
          </div>
          <div className="bg-white border border-[#e7e2d9] rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-2">Why This Matters</p>
            <p className="text-sm text-stone-800 leading-relaxed font-medium">Strategic alignment with Q3 'Data Quality' pillar and retention goals.</p>
          </div>
          <div className="bg-white border border-[#e7e2d9] rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-2">Priority Score</p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-lg font-bold text-stone-900">8.4</span>
              <span className="bg-[#f3efe7] text-stone-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#e7e2d9]">
                High
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <input 
            type="text" 
            defaultValue="PRD: Mobile-First Insight Workspace" 
            className="w-full bg-transparent border-none p-0 text-5xl font-bold text-stone-900 focus:ring-0 placeholder:text-stone-200 tracking-tight"
            placeholder="Untitled Document"
          />
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=PM${i}`} alt="Avatar" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-beige flex items-center justify-center text-[10px] font-bold text-stone-700">
                AI
              </div>
            </div>
            <span className="text-sm text-stone-400 font-medium">Collaborating with ProdMind Engine</span>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <PRDSection 
          id="problem"
          icon={Layout}
          title="Problem Statement"
          content="We are losing critical field-based product feedback because our current desktop-first workspace has high friction for immediate capture. Mobile users drop off 15% more often when trying to document insights on-site, resulting in fragmented product strategy and delayed decision-making loops."
          insight="Mobile users are 15% more likely to drop off when documenting insights in the field."
        />

        <PRDSection 
          id="persona"
          icon={Users2}
          title="User Persona"
          content="Primary: The 'On-the-go' Product Manager. These PMs spend 40% of their time in client meetings or field research. They need to capture messy thoughts as they happen, without the burden of complex feature categorization which can happen later on the desktop."
        />

        <PRDSection 
          id="features"
          icon={CheckCircle2}
          title="Key Features"
          isList
          items={[
            "One-Tap Quick Capture: A dedicated entry point bypassing the main app silo.",
            "Local Offline Buffer: Automatic syncing when connectivity is re-established.",
            "AI Thought Structuring: Voice-to-text with auto-bullet generation.",
            "Context-Aware Tagging: Suggests tags based on current GPS/Calendar event."
          ]}
        />

        <PRDSection 
          id="metrics"
          icon={BarChart3}
          title="Success Metrics"
          isList
          items={[
            "10% increase in daily mobile-captured nodes.",
            "Reduced 'time-to-insight' from 24h to <1h.",
            "High satisfaction score on mobile 'capture ease' survey (>4.5)."
          ]}
        />
      </div>

      {/* Footer Navigation */}
      <div className="pt-12 border-t border-brand-beige/30 flex items-center justify-between">
        <div className="flex items-center gap-2 text-stone-400 group cursor-pointer hover:text-stone-900 transition-colors">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-bold tracking-tight">Add Comments</span>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-xl border-stone-200">Save as Template</Button>
          <Button className="rounded-xl shadow-lg shadow-brand-beige/20">Finalize Document</Button>
        </div>
      </div>
    </div>
  );
}

interface PRDSectionProps {
  id: string;
  title: string;
  content?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isList?: boolean;
  items?: string[];
  insight?: string;
}
function PRDSection({ id, title, content, icon: Icon, isList, items, insight }: PRDSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [text, setText] = useState(content || "");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`prd-section-content-${id}`);
      if (saved !== null) {
        setText(saved);
      }
    }
  }, [id, content]);

  const handleBlur = (e: React.FocusEvent<HTMLParagraphElement>) => {
    const newText = e.currentTarget.textContent || "";
    setText(newText);
    if (typeof window !== "undefined") {
      localStorage.setItem(`prd-section-content-${id}`, newText);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    }
  };

  return (
    <div 
      className="group relative mb-8 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Side Actions (Notion-like) */}
      <div className={cn(
        "absolute -left-12 top-0 flex flex-col items-center gap-1 transition-opacity duration-200",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <button className="p-2 text-stone-300 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-all duration-200">
          <Plus size={16} />
        </button>
        <button className="p-2 text-stone-300 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-all duration-200">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="bg-[#f3efe7] px-3 py-1 rounded-lg inline-flex items-center gap-2 transition-all duration-200 hover:bg-[#e7e2d9]/50">
            <Icon size={16} className="text-stone-600" />
            <h2 className="text-sm font-semibold text-gray-900 tracking-tight">{title}</h2>
          </div>
          {isSaved && (
            <span className="ml-3 text-xs text-emerald-600 font-semibold flex items-center gap-1.5 transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Autosaved
            </span>
          )}
          <button className={cn(
            "ml-auto p-2 text-stone-300 hover:text-stone-900 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <Copy size={16} />
          </button>
        </div>
        
        <div className="border-l-2 border-[#e7e2d9] pl-4 mt-3">
          {isList && items ? (
            <ul className="space-y-3">
              {items.map((item: string, i: number) => (
                <li key={i} className="text-[15px] text-gray-700 leading-relaxed group/item cursor-pointer flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d6c3a3] mr-3 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p 
              contentEditable 
              suppressContentEditableWarning
              onBlur={handleBlur}
              className="text-[15px] text-gray-700 leading-relaxed outline-none focus:text-stone-900 transition-colors"
            >
              {text}
            </p>
          )}

          {insight && (
            <div className="mt-4 bg-[#f3efe7] border border-[#e7e2d9] rounded-xl p-4 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-900 mb-1">💡 Key Insight</p>
              <p className="text-sm text-gray-800 leading-relaxed">
                <strong>{insight}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
