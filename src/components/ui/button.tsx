"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : motion.button
    
    const variants = {
      default: "bg-brand-beige text-stone-900 border border-brand-beige-hover hover:bg-brand-beige-hover",
      destructive: "bg-rose-50 text-rose-600 hover:bg-rose-100",
      outline: "border-2 border-stone-100 bg-transparent hover:bg-stone-50 text-stone-600 hover:text-stone-900 hover:border-stone-200",
      secondary: "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900",
      ghost: "hover:bg-stone-50 text-stone-500 hover:text-stone-900",
      link: "text-stone-900 underline-offset-4 hover:underline decoration-brand-beige",
    }

    const sizes = {
      default: "h-12 px-6 py-2 rounded-2xl",
      sm: "h-9 rounded-xl px-4",
      lg: "h-14 rounded-3xl px-10 text-base",
      icon: "h-12 w-12 rounded-2xl",
    }

    const motionProps = asChild ? {} : {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring", stiffness: 400, damping: 25 }
    };

    return (
      <Comp
        {...(motionProps as any)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
