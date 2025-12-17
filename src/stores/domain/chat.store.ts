import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Chat, Message } from "@/types/chat";
interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  isLoading: boolean;
  isTypingResponse: boolean;

  setLoading: (loading: boolean) => void;
  createChat: () => void;
  setActiveChat: (id: string) => void;
  setIsTypingResponse: (value: boolean) => void;
  addMessage: (message: Message, update?: boolean) => void;
  deleteChat: (id: string) => void;
}
const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,
      isLoading: false,
      isTypingResponse: false,

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      createChat: () => {
        const id = crypto.randomUUID();

        const newChat: Chat = {
          id,
          title: "New chat",
          messages: [],
          createdAt: Date.now(),
        };

        set((state) => ({
          chats: [...state.chats, newChat],
          activeChatId: id,
        }));

        return id;
      },

      setActiveChat: (id: string) => set({ activeChatId: id }),

      addMessage: (message: Message, update = false) => {
        const { chats, activeChatId } = get();

        if (!activeChatId) return;

        set({
          chats: chats.map((chat) =>
            chat.id === activeChatId
              ? {
                  ...chat,
                  title:
                    chat.messages.length === 0 && message.role === "user"
                      ? message.content.split(" ").slice(0, 4).join(" ")
                      : chat.title,
                  messages: update
                    ? chat.messages.map((msg) =>
                        msg.id === message.id
                          ? { ...msg, content: message.content }
                          : msg
                      )
                    : [...chat.messages, message],
                }
              : chat
          ),
        });
      },

      deleteChat: (id: string) =>
        set((state) => {
          const newChats = state.chats.filter((chat) => chat.id !== id);
          return {
            chats: newChats,
            activeChatId: state.activeChatId === id ? null : state.activeChatId,
          };
        }),

      setIsTypingResponse: (value: boolean) => set({ isTypingResponse: value }),
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        chats: state.chats,
        activeChatId: state.activeChatId,
      }),
    }
  )
);
export default useChatStore;
