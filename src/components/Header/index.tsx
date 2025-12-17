"use client";

import { useScrollStore } from "@/stores";
import { useSidebarStore } from "@/stores";
import clsx from "clsx";
import { ChevronDown, UserPlus, MessageCircle } from "lucide-react";
import HamburgerMenu from "../HamburgerMenu";

export default function Header() {
  const { open } = useSidebarStore();
  const { isScrolled } = useScrollStore();

  return (
    <div>
      <header
        className={clsx(
          "fixed flex items-center w-full top-0 px-6 py-4 gap-5 bg-surface border-b transition-all duration-300",
          isScrolled ? "border-strong" : "border-transparent"
        )}
      >
        <HamburgerMenu onClick={open} />
        <div className="flex items-center">
          <p className="text-xl font-light">ChatGPT</p>
          <ChevronDown className="w-5 h-5 text-secondary" />
        </div>
        <div className="flex items-center gap-5 ml-auto">
          <UserPlus className="w-5 h-5 text-secondary" />
          <MessageCircle className="w-5 h-5 text-secondary" />
        </div>
      </header>
    </div>
  );
}
