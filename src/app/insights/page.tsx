"use client";

import React, { useState, useEffect } from "react";
import { 
  AlertCircle, 
  Hash, 
  UserPlus, 
  Quote, 
  Copy, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const insightsData = [
  {
    id: "problems",
    title: "Key Problems",
    icon: AlertCircle,
    color: "text-rose-500",
    bg: "bg-rose-50/50",
    items: [
      { id: "p1", text: "Onboarding drop-off is at 24% for mobile users", detail: "The 'Welcome' modal is too heavy for smaller screens, leading to immediate churn." },
      { id: "p2", text: "Latency in PRD generation for large documents", detail: "Users report waiting more than 15 seconds for AI processing on docs over 2k words." },
      { id: "p3", text: "Lack of offline mode for field researchers", detail: "Field notes often get lost when syncing fails in low-connectivity areas." }
    ]
  },
  {
    id: "themes",
    title: "Repeated Themes",
    icon: Hash,
    color: "text-brand-beige-hover",
    bg: "bg-brand-beige/10",
    items: [
      { id: "t1", text: "Collaboration is the #1 requested feature", detail: "Mentions of 'Team', 'Sharing', and 'Comments' appeared in 45/50 feedback logs." },
      { id: "t2", text: "Desire for more visual documentation", detail: "Users are manually adding diagrams to PRDs after generation." },
      { id: "t3", text: "Need for better version control", detail: "Request for 'Undo' and 'History' logs across decision nodes." }
    ]
  },
  {
    id: "pain-points",
    title: "User Pain Points",
    icon: UserPlus,
    color: "text-amber-500",
    bg: "bg-amber-50/50",
    items: [
      { id: "u1", text: "Confused by 'Decision Logic' terminology", detail: "Non-technical PMs find the internal AI terms intimidating." },
      { id: "u2", text: "Exporting to Jira is tedious", detail: "Mapping fields from Claryo to Jira takes average 8 minutes per PRD." }
    ]
  },
  {
    id: "quotes",
    title: "Key Quotes",
    icon: Quote,
    color: "text-sky-500",
    bg: "bg-sky-50/50",
    items: [
      { id: "q1", text: "\"I feel like I'm finally thinking clearly about my product.\"", detail: "- Lead PM, Google Cloud Portfolio" },
      { id: "q2", text: "\"The AI insights caught patterns I missed in 3 months of interviews.\"", detail: "- Senior Researcher, FinTech Hub" }
    ]
  }
];

export default function InsightsPage() {
  const [visibleCards, setVisibleCards] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Progressive appearance simulation
    const timers = insightsData.map((card, i) => {
      return setTimeout(() => {
        setVisibleCards(prev => [...prev, card.id]);
      }, 400 * (i + 1));
    });
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-brand-beige-hover mb-2"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-bold tracking-[0.2em] uppercase">Intelligence Extraction</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-bold text-stone-900 tracking-tight"
        >
          Structured Insights
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-stone-500 max-w-2xl leading-relaxed font-medium"
        >
          Our engine has distilled 124 raw feedback nodes into 4 core pillars. 
          Clarity has emerged from the chaos.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ring-offset-4">
        <AnimatePresence>
          {insightsData.map((card) => (
            visibleCards.includes(card.id) && (
              <InsightCard 
                key={card.id} 
                card={card} 
                onCopy={copyToClipboard}
                isCopied={copiedId?.startsWith(card.id)}
              />
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Summary Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: visibleCards.length === insightsData.length ? 1 : 0 }}
        className="flex justify-center pt-8"
      >
        <div className="bg-white border border-stone-100 rounded-3xl p-8 shadow-sm flex items-center gap-10 max-w-3xl w-full">
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold text-stone-900">Ready for Strategy?</h3>
            <p className="text-sm text-stone-500 font-medium">Use these insights to generate a multi-factor decision simulation.</p>
          </div>
          <Button size="lg" className="rounded-2xl gap-2 h-14 px-8 shadow-lg shadow-brand-beige/20">
            Simulate Roadmap <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

function InsightCard({ card, onCopy, isCopied }: { card: any, onCopy: any, isCopied: any }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const Icon = card.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="group bg-white border-2 border-stone-100 hover:border-brand-beige/60 rounded-[32px] overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/40"
    >
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn("p-4 rounded-2xl flex items-center justify-center transition-colors group-hover:scale-110 duration-500", card.bg, card.color)}>
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">{card.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-all"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-2">
                {card.items.map((item: any, i: number) => (
                  <div 
                    key={item.id} 
                    className="group/item relative p-4 bg-stone-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-stone-100 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <p className="text-[15px] font-bold text-stone-900 flex items-center gap-2 leading-tight">
                          <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", i === 0 ? "bg-stone-900" : "bg-stone-300")} />
                          {item.text}
                        </p>
                        <p className="text-sm text-stone-500 font-medium leading-relaxed mt-1 pl-4">
                          {item.detail}
                        </p>
                        {/* Pattern Highlight Hint */}
                        {i === 0 && (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 mt-2 ml-4 w-fit bg-brand-beige/20 text-[10px] font-black uppercase tracking-tighter text-brand-beige-hover rounded-md border border-brand-beige/10">
                            <MessageSquare size={10} /> Pattern Detected
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => onCopy(item.text, `${card.id}-${item.id}`)}
                        className="opacity-0 group-hover/item:opacity-100 p-2 text-stone-300 hover:text-brand-beige-hover transition-all shrink-0"
                      >
                        {isCopied && i === 0 ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
