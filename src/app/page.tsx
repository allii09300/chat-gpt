"use client";
import { useState, useRef, useEffect } from "react";
import { useMessageInput } from "@/hooks/useMessageInput";
import { useTypingResponse } from "@/hooks/useTypingResponse";
import { useScrollStore } from "@/stores";
import { useChatStore } from "@/stores";
import clsx from "clsx";
import { Plus, Mic, ArrowUp } from "lucide-react";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import TypingLoader from "@/components/TypingLoader";

const LOREM =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.";

export default function Home() {
  const [text, setText] = useState("");
  const [isMultiLine, setIsMultiLine] = useState(false);
  const { setScrolled } = useScrollStore();
  const { showMic, canSend } = useMessageInput(text);
  const {
    chats,
    activeChatId,
    addMessage,
    createChat,
    isLoading,
    setLoading,
    isTypingResponse,
  } = useChatStore();

  const bottomRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages ?? [];

  const { start, stop } = useTypingResponse(addMessage, LOREM);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, activeChatId]);

  const handleSend = () => {
    if (!text.trim()) return;

    if (!activeChat) {
      createChat();
    }

    addMessage({ id: crypto.randomUUID(), role: "user", content: text });
    setText("");
    setLoading(true);

    setTimeout(() => {
      start();
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen">
      <div
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 10)}
        className="flex-1 overflow-y-auto px-4 py-6 pt-20"
      >
        {messages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-2xl text-center w-11/12">
              What's on your mind today?
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4 mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={clsx(
                "px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-wrap",
                msg.role === "user"
                  ? "self-end bg-surface-accent"
                  : "self-start bg-transparent"
              )}
            >
              {msg.content}
            </div>
          ))}

          {isLoading && <TypingLoader />}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className={clsx(
            "flex items-end w-11/12 max-w-3xl px-2 py-1 my-3 gap-2 border border-strong shadow-md",
            isMultiLine ? "rounded-3xl" : "rounded-full"
          )}
        >
          <Button variant="ghost" size="icon" radius="full" className="mb-1.5">
            <Plus className="w-5 h-5" />
          </Button>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask anything"
            onLineChange={setIsMultiLine}
          />

          {showMic && (
            <Button
              variant="ghost"
              size="icon"
              radius="full"
              className="mb-1.5"
            >
              <Mic className="w-5 h-5" />
            </Button>
          )}

          {isTypingResponse ? (
            <Button
              variant="neutral"
              size="icon"
              radius="full"
              className="mb-1.5"
              onClick={stop}
            >
              <div className="w-3 h-3 m-1 bg-surface-inverse rounded"></div>
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="icon"
              radius="full"
              disabled={!canSend}
              className="mb-1.5"
              onClick={handleSend}
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
