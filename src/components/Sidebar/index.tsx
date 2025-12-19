"use client";
import { useSidebarStore } from "@/stores";
import { useChatStore } from "@/stores";
import {
  X,
  Hexagon,
  SquarePen,
  Search,
  Images,
  FolderPlus,
  MoreHorizontal,
  UserPlus,
  Share,
  Pen,
  Archive,
  Trash,
  Boxes,
  Pin,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import Button from "../Button";
import MenuItem from "../MenuItem";

export default function Sidebar() {
  const { isOpen, close, open } = useSidebarStore();
  const { chats, activeChatId, setActiveChat, createChat, deleteChat } =
    useChatStore();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      open();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenuId) {
        const ref = menuRefs.current[openMenuId];
        if (ref && !ref.contains(e.target as Node)) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  const sidebarItems = [
    {
      icon: SquarePen,
      label: "New chat",
      onClick: createChat,
      shortcut: "Ctrl+Shift+O",
    },
    { icon: Search, label: "Search chats", shortcut: "Ctrl+K" },
    { icon: Images, label: "Images" },
    { icon: Boxes, label: "Apps" },
    { icon: FolderPlus, label: "Projects" },
  ];

  const menuItems = [
    { label: "Share", icon: <Share className="w-4 h-4" /> },
    { label: "Start a group chat", icon: <UserPlus className="w-5 h-5" /> },
    { label: "Rename", icon: <Pen className="w-4 h-4" /> },
    {
      label: "Pin",
      icon: <Pin className="w-4 h-4" />,
      borderTop: true,
    },
    {
      label: "Archive",
      icon: <Archive className="w-4 h-4" />,
    },
    {
      label: "Delete",
      icon: <Trash className="w-4 h-4" />,
      danger: true,
      onClick: (id: string) => deleteChat(id),
    },
  ];

  if (!isOpen) return null;

  return (
    <aside
      className={clsx(
        "fixed flex flex-col gap-5 pt-4 px-1 lg:static top-0 left-0 h-full bg-surface-elevated z-50",
        "transition-all duration-300",
        [
          isOpen && "w-64 translate-x-0 shadow-2xl",
          !isOpen && "w-0 -translate-x-full",
          "lg:w-60 lg:translate-x-0 lg:shadow-none",
        ]
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center w-9 h-9 ml-1 rounded-lg hover:bg-surface-accent">
          <Hexagon
            onClick={close}
            className="w-6 h-6 text-primary cursor-pointer"
          />
        </div>
        <div className="flex justify-center items-center w-9 h-9 mr-1 rounded-lg hover:bg-surface-accent">
          <X onClick={close} className="w-5 h-5 text-primary cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              onClick={item.onClick}
              className="group flex items-center justify-between cursor-pointer py-2.5 px-3 rounded-xl
                 hover:bg-surface-accent"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                <p className="text-base font-light lg:text-sm">{item.label}</p>
              </div>

              {item.shortcut && (
                <span
                  className="
                   hidden lg:flex
                   opacity-0 group-hover:opacity-100
                   text-sm font-mono text-secondary"
                >
                  {item.shortcut}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-secondary font-light px-3 lg:text-sm">Your chats</p>
        <div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={clsx(
                "group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-surface-accent font-normal cursor-pointer",
                chat.id === activeChatId
                  ? "bg-surface-accent"
                  : "bg-transparent"
              )}
            >
              {chat.title}
              <MoreHorizontal
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(chat.id);
                }}
                className="w-4 h-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
              />
              {openMenuId === chat.id && (
                <div
                  ref={(el: HTMLDivElement | null) => {
                    menuRefs.current[chat.id] = el;
                  }}
                  className="absolute flex flex-col gap-1 left-8 bottom-20 p-1 w-auto bg-surface border border-strong rounded-2xl shadow-lg z-50"
                >
                  {menuItems.map((item, id) => (
                    <MenuItem
                      key={id}
                      icon={item.icon}
                      label={item.label}
                      danger={item.danger}
                      className={clsx(
                        item.borderTop && "border-t border-subtle"
                      )}
                      onClick={() => {
                        item.onClick?.(chat.id);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-subtle bg-surface-elevated">
        <div className="flex flex-row items-center justify-between p-2 m-2 rounded-xl hover:bg-surface-accent has-[button:hover]:bg-transparent">
          <div className="group flex items-center gap-3">
            <div className="bg-emerald-600 w-7 h-7 rounded-full"></div>
            <div>
              <p className="text-sm font-light">User</p>
              <p className="text-sm font-light text-secondary">Free</p>
            </div>
          </div>
          <Button
            className="hover:bg-surface-subtle"
            size="sm"
            radius="full"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </aside>
  );
}
