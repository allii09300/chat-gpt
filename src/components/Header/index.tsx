"use client";

import { useScrollStore } from "@/stores";
import { useSidebarStore } from "@/stores";
import clsx from "clsx";
import { ChevronDown, UserPlus, MessageCircle } from "lucide-react";
import HamburgerMenu from "../HamburgerMenu";

export default function Header() {
  const { open, isOpen } = useSidebarStore();
  const { isScrolled } = useScrollStore();

  return (
    <div>
      <header
        className={clsx(
          "fixed flex items-center w-full top-0 px-3 py-2 gap-4 bg-surface border-b",
          isScrolled ? "border-subtle" : "border-transparent",
          isOpen && "lg:pr-64"
        )}
      >
        {!isOpen && <HamburgerMenu className="ml-3" onClick={open} />}

        <div className="flex items-center px-2 py-2 cursor-pointer rounded-lg hover:bg-surface-accent lg:ml-2">
          <p className="text-xl font-light">ChatGPT</p>
          <ChevronDown className="w-5 h-5 text-secondary" />
        </div>
        <div className="flex items-center ml-auto">
          <div className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-surface-accent">
            <UserPlus className="w-5 h-5 text-secondary cursor-pointer" />
          </div>
          <div className="flex justify-center items-center w-10 h-10 rounded-full hover:bg-surface-accent">
            <MessageCircle className="w-5 h-5 text-secondary cursor-pointer" />
          </div>
        </div>
      </header>
    </div>
  );
}
