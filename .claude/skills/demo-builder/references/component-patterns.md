# コンポーネントパターン

## 共通UIコンポーネント

### Button

```tsx
// src/components/ui/button.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "error";
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
        variant === "error" &&
          "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
        // Size
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg w-full",
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
```

### Card

```tsx
// src/components/ui/card.tsx
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-100 p-5",
        className
      )}
    >
      {children}
    </div>
  );
}
```

### Badge

```tsx
// src/components/ui/badge.tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        // Variant
        variant === "default" && "bg-gray-100 text-gray-700",
        variant === "success" && "bg-green-100 text-green-700",
        variant === "warning" && "bg-yellow-100 text-yellow-700",
        variant === "error" && "bg-red-100 text-red-700",
        variant === "info" && "bg-blue-100 text-blue-700",
        // Size
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
```

### Progress

```tsx
// src/components/ui/progress.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
  color?: string;
}

export function Progress({
  value,
  max = 100,
  size = "md",
  className,
  showLabel = false,
  color = "#06C755",
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-gray-200 rounded-full overflow-hidden",
          size === "sm" && "h-1.5",
          size === "md" && "h-2.5",
          size === "lg" && "h-4"
        )}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
```

### Input

```tsx
// src/components/ui/input.tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-[#06C755] focus:border-transparent",
            "transition-all duration-200",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
```

---

## LINEミニアプリ向けコンポーネント

### Header

```tsx
// src/components/mini/header.tsx
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  backHref?: string;
  onBack?: () => void;
}

export function Header({ title, backHref, onBack }: HeaderProps) {
  const BackButton = () => (
    <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full">
      <ChevronLeft className="w-6 h-6 text-gray-600" />
    </button>
  );

  const BackLink = () => (
    <Link href={backHref!} className="p-1 hover:bg-gray-100 rounded-full">
      <ChevronLeft className="w-6 h-6 text-gray-600" />
    </Link>
  );

  return (
    <header className="sticky top-0 bg-white border-b border-gray-100 z-10">
      <div className="flex items-center h-12 px-4">
        {backHref ? <BackLink /> : onBack ? <BackButton /> : null}
        <h1 className="font-bold text-gray-800 ml-2">{title}</h1>
      </div>
    </header>
  );
}
```

### BottomNavigation

```tsx
// src/components/mini/bottom-navigation.tsx
"use client";

import { Home, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const defaultItems: NavItem[] = [
  { href: "/mini", icon: Home, label: "ホーム" },
  { href: "/mini/search", icon: Search, label: "検索" },
  { href: "/mini/profile", icon: User, label: "マイページ" },
];

interface BottomNavigationProps {
  items?: NavItem[];
  primaryColor?: string;
}

export function BottomNavigation({
  items = defaultItems,
  primaryColor = "#06C755",
}: BottomNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe">
      <div className="flex justify-around py-2">
        {items.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center py-1 px-4"
            >
              <Icon
                className="w-6 h-6"
                style={{ color: isActive ? primaryColor : "#9CA3AF" }}
              />
              <span
                className="text-xs mt-1"
                style={{ color: isActive ? primaryColor : "#9CA3AF" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

---

## デモ環境向けコンポーネント

### Alert Card（条件付き表示）

```tsx
// src/components/demo/alert-card.tsx
"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AlertCardProps {
  title: string;
  message: string;
  variant?: "warning" | "info" | "success";
}

export function AlertCard({
  title,
  message,
  variant = "warning",
}: AlertCardProps) {
  const colors = {
    warning: {
      bg: "bg-[#FFF7ED]",
      border: "border-[#FF6B35]/20",
      icon: "bg-[#FF6B35]",
      title: "text-[#FF6B35]",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "bg-blue-500",
      title: "text-blue-700",
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "bg-green-500",
      title: "text-green-700",
    },
  };

  const c = colors[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className={`${c.bg} ${c.border} border`}>
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 ${c.icon} rounded-full flex items-center justify-center flex-shrink-0`}
          >
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className={`font-bold ${c.title}`}>{title}</p>
            <p className="text-sm text-gray-600 mt-1">{message}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
```

### Promo Banner（魅力的品質）

```tsx
// src/components/demo/promo-banner.tsx
"use client";

import { motion } from "framer-motion";
import { ChevronRight, Gift } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface PromoBannerProps {
  href: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

export function PromoBanner({
  href,
  title,
  description,
  icon,
  gradientFrom = "#06C755",
  gradientTo = "#05a648",
}: PromoBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Link href={href}>
        <Card
          className="text-white"
          style={{
            background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              {icon || <Gift className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <p className="font-bold">{title}</p>
              <p className="text-sm text-white/80">{description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
```

### Refresh Button

```tsx
// src/components/demo/refresh-button.tsx
"use client";

import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  isRefreshing: boolean;
  onClick: () => void;
}

export function RefreshButton({ isRefreshing, onClick }: RefreshButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      disabled={isRefreshing}
    >
      <RefreshCw
        className={`w-5 h-5 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`}
      />
    </button>
  );
}
```

---

## ユーティリティ

### cn（クラス名マージ）

```tsx
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
