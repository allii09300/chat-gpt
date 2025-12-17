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
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Button from "../Button";
import MenuItem from "../MenuItem";

export default function Sidebar() {
  const { isOpen, close } = useSidebarStore();
  const { chats, activeChatId, setActiveChat, createChat, deleteChat } =
    useChatStore();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
    { icon: SquarePen, label: "New chat", onClick: createChat },
    { icon: Search, label: "Search chats" },
    { icon: Images, label: "Images" },
    { icon: FolderPlus, label: "Projects" },
  ];

  const menuItems = [
    { label: "Share", icon: <Share className="w-4 h-4" /> },
    { label: "Start a group chat", icon: <UserPlus className="w-5 h-5" /> },
    { label: "Rename", icon: <Pen className="w-4 h-4" /> },
    {
      label: "Archive",
      icon: <Archive className="w-4 h-4" />,
      borderTop: true,
    },
    {
      label: "Delete",
      icon: <Trash className="w-4 h-4" />,
      danger: true,
      onClick: (id: string) => deleteChat(id),
    },
  ];

  return (
    <aside
      className={`fixed flex flex-col top-0 left-0 h-full w-64 p-4 bg-bg-elevated gap-10 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center">
        <Hexagon onClick={close} className="w-6 h-6 text-text-default" />
        <X onClick={close} className="w-5 h-5 text-text-secondary" />
      </div>

      <div className="flex flex-col gap-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-2 cursor-pointer"
              onClick={item.onClick}
            >
              <Icon className="w-5 h-5" />
              <p className="text-base font-light">{item.label}</p>
            </div>
          );
        })}
      </div>

      <div>
        <p className="text-text-secondary font-light">Your chats</p>
        <div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`relative group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-bg-chat-user font-normal cursor-pointer ${
                chat.id === activeChatId ? "bg-bg-chat-user" : "bg-transparent"
              }`}
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
                  className="absolute flex flex-col gap-1 left-8 top-10 p-1 w-auto bg-bg-default border border-border-secondary rounded-2xl shadow-lg z-50"
                >
                  {menuItems.map((item, id) => (
                    <MenuItem
                      key={id}
                      icon={item.icon}
                      label={item.label}
                      danger={item.danger}
                      className={
                        item.borderTop ? "border-t border-border-default" : ""
                      }
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

      <div className="fixed flex items-center justify-between bottom-0 left-0 right-0 p-4 border-t border-border-default bg-bg-elevated">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 w-7 h-7 rounded-full"></div>
          <div>
            <p className="text-sm font-light">User</p>
            <p className="text-sm font-light text-text-secondary">Free</p>
          </div>
        </div>
        <Button size="sm" radius="full">
          Upgrade
        </Button>
      </div>
    </aside>
  );
}
