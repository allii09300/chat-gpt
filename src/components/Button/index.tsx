import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "ghost" | "neutral"
  size?: "sm" | "md" | "lg" | "icon";
  radius?: "none" | "sm" | "md" | "lg" | "full";
}

export default function Button({
  children,
  variant = "default",
  size = "md",
  className = "",
  disabled = false,
  radius = "lg",
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex justify-center items-center font-light transition-all outline-none";

  const variants = {
    default: "bg-surface text-primary border border-subtle",
    secondary: "bg-surface-inverse text-inverse",
    ghost: "bg-slate-50 text-primary",
    neutral: "bg-surface-accent"
  };

  const sizes = {
    sm: "px-2 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  const radiusStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  

  return (
    <button
      onClick={props.onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        radiusStyles[radius],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
