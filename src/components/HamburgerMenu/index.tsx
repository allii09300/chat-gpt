import React from "react";

export default function HamburgerMenu(
  props: React.HTMLAttributes<HTMLDivElement>
) {
  return (
    <div className="flex flex-col gap-2 " {...props}>
      <span className="w-5 h-0.5 bg-bg-contrast rounded"></span>
      <span className="w-3 h-0.5 bg-bg-contrast rounded"></span>
    </div>
  );
}
