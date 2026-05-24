import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-brand-beige text-stone-900",
    secondary: "border-transparent bg-stone-100 text-stone-900",
    outline: "text-stone-500 border-stone-200",
    destructive: "border-transparent bg-rose-50 text-rose-600",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase tracking-tighter",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
