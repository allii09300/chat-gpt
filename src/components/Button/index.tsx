import React, { ButtonHTMLAttributes } from "react";

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
    default: "bg-bg-default text-text-default border border-border-default",
    secondary: "bg-text-default text-text-contrast",
    ghost: "bg-slate-50 text-text-default",
    neutral: "bg-bg-chat-user"
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
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${radiusStyles[radius]} ${className} ${disabled ? "opacity-50 cursor-not-allowed":""}`}
      {...props}
    >
      {children}
    </button>
  );
}
