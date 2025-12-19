import clsx from "clsx";
import React from "react";

export default function HamburgerMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("flex flex-col gap-2", className)} {...props}>
      <span className="w-5 h-0.5 bg-surface-inverse rounded"></span>
      <span className="w-3 h-0.5 bg-surface-inverse rounded"></span>
    </div>
  );
}
