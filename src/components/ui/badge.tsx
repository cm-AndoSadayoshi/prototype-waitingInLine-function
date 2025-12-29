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
