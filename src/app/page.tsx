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
    if (!activeChat) createChat();

    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    });

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
        className={clsx(
          "flex flex-col overflow-auto px-4 sm:px-6 md:px-8 py-6 pt-20",
          "flex-1",
          messages.length === 0 && !isLoading && "lg:flex-none"
        )}
      >
        {messages.length === 0 && !isLoading && (
          <p className="w-3/4 my-auto mx-auto text-2xl text-center lg:hidden">
            What's on your mind today?
          </p>
        )}
        <div className="flex flex-col w-11/12 max-w-3xl mx-auto gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={clsx(
                "px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-wrap break-words",
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
      <div
        className={clsx(
          "flex justify-center",
          "items-end",
          messages.length === 0 && !isLoading
            ? "lg:flex-1 lg:items-center"
            : "lg:items-end"
        )}
      >
        <div className="w-full flex flex-col items-center gap-6">
          {messages.length === 0 && !isLoading && (
            <p className="hidden lg:block text-2xl text-center">
              What's on your mind today?
            </p>
          )}
          <div
            className={clsx(
              "flex items-end w-11/12 max-w-3xl  px-2 py-1 mb-3 gap-2 border border-strong shadow-md ",
              isMultiLine ? "rounded-3xl" : "rounded-full",
              messages.length === 0 && !isLoading ? "lg:mb-28" : "lg:mb-3"
            )}
          >
            <Button
              variant="ghost"
              size="icon"
              radius="full"
              className="mb-1.5 lg:bg-transparent lg:hover:bg-surface-subtle"
            >
              <Plus className="w-5 h-5" />
            </Button>

            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask anything"
              onLineChange={setIsMultiLine}
            />

            <Button
              variant="ghost"
              size="icon"
              radius="full"
              className={clsx(
                "mb-1.5 lg:bg-transparent lg:hover:bg-surface-subtle",
                !showMic && "hidden",
                "lg:flex"
              )}
            >
              <Mic className="w-5 h-5 " />
            </Button>

            {isTypingResponse ? (
              <Button
                variant="neutral"
                size="icon"
                radius="full"
                className="mb-1.5"
                onClick={stop}
              >
                <div className="w-3 h-3 m-1 bg-surface-inverse rounded" />
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
    </div>
  );
}
