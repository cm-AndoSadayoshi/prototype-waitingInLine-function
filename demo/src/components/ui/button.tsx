"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2",
        // Variant
        variant === "primary" &&
          "bg-[#06C755] text-white hover:bg-[#05a648] active:bg-[#049040]",
        variant === "secondary" &&
          "bg-[#333333] text-white hover:bg-[#444444] active:bg-[#222222]",
        variant === "outline" &&
          "bg-white text-[#06C755] border-2 border-[#06C755] hover:bg-[#f0fdf4] active:bg-[#dcfce7]",
        variant === "ghost" &&
          "bg-transparent text-[#666666] hover:bg-gray-100 active:bg-gray-200",
        // Size
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        // Disabled
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
