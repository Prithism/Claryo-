"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Loader({ className, size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) {
  const sizes = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-10 h-10"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin text-brand-beige-hover", sizes[size])} />
    </div>
  );
}

export function Section({ 
  children, 
  title, 
  description, 
  className,
  headerAction 
}: { 
  children: React.ReactNode; 
  title?: string; 
  description?: string; 
  className?: string;
  headerAction?: React.ReactNode;
}) {
  return (
    <section className={cn("space-y-6", className)}>
      {(title || description) && (
        <div className="flex items-end justify-between border-b border-stone-100 pb-4">
          <div className="space-y-1">
            {title && <h2 className="text-2xl font-bold text-stone-900 tracking-tight">{title}</h2>}
            {description && <p className="text-sm text-stone-500 font-medium">{description}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="pt-2">
        {children}
      </div>
    </section>
  );
}
