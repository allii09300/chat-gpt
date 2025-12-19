"use client";
import { useState, useRef, useEffect } from "react";
import { useMessageInput } from "@/hooks/useMessageInput";
import { useTypingResponse } from "@/hooks/useTypingResponse";
import { useScrollStore } from "@/stores";
import { useChatStore } from "@/stores";
import clsx from "clsx";
import { Plus, Mic, ArrowUp, AudioLines } from "lucide-react";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import TypingLoader from "@/components/TypingLoader";

const LOREM =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.";

export default function Home() {
  const [text, setText] = useState("");
  const [isMultiLine, setIsMultiLine] = useState(false);

  const { setScrolled } = useScrollStore();
  const { showMic } = useMessageInput(text);

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

  const isEmpty = messages.length === 0 && !isLoading;

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
          "flex flex-col px-4 py-6 pt-20 overflow-auto sm:px-6 md:px-8",
          "flex-1",
          isEmpty && "sm:flex-none"
        )}
      >
        {isEmpty && (
          <p className="w-3/4 my-auto mx-auto text-2xl text-center sm:hidden">
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
          isEmpty ? "sm:flex-1 sm:items-center" : "sm:items-end"
        )}
      >
        <div className="flex flex-col items-center w-full gap-6">
          {isEmpty && (
            <p className="hidden sm:block text-2xl text-center">
              What's on your mind today?
            </p>
          )}
          <div
            className={clsx(
              "flex items-end w-11/12 md:w-10/12 max-w-3xl  px-2 py-1 mb-3 gap-2 border border-strong shadow-md ",
              isMultiLine ? "rounded-3xl" : "rounded-full",
              isEmpty ? "sm:mb-32" : "sm:mb-0"
            )}
          >
            <div className="group relative">
              <Button
                variant="ghost"
                size="icon"
                radius="full"
                className="mb-1.5 md:bg-transparent md:hover:bg-surface-subtle"
              >
                <Plus className="w-5 h-5" />
              </Button>
              <div
                className="absolute flex flex-row items-center gap-2 top-full -right-16 mt-1 px-2 py-1 whitespace-nowrap rounded-md bg-surface-inverse  text-xs text-inverse font-semibold pointer-events-none
                opacity-0 group-hover:opacity-100"
              >
                Add files and more
                <span className="flex justify-center items-center w-4 h-4 rounded-md text-[12px] bg-slate-700 text-muted">
                  /
                </span>
              </div>
            </div>

            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask anything"
              onLineChange={setIsMultiLine}
            />

            <div className="group relative">
              <Button
                variant="ghost"
                size="icon"
                radius="full"
                className={clsx(
                  "mb-1.5 md:bg-transparent md:hover:bg-surface-subtle",
                  !showMic && "hidden",
                  "sm:flex"
                )}
              >
                <Mic className="w-5 h-5 " />
              </Button>
              <span
                className="absolute top-full -right-3 mt-1 px-2 py-1 whitespace-nowrap rounded-md bg-surface-inverse  text-xs text-inverse font-semibold pointer-events-none
                  opacity-0 group-hover:opacity-100 "
              >
                Dictate
              </span>
            </div>

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
            ) : text.trim() === "" ? (
              <div className="relative group">
                <Button
                  variant="secondary"
                  size="icon"
                  radius="full"
                  className="mb-1.5 opacity-100 hover:opacity-80"
                  onClick={handleSend}
                >
                  <AudioLines className="w-5 h-5" />
                </Button>
                <span
                  className="absolute top-full -right-10 mt-1 px-2 py-1 whitespace-nowrap rounded-md bg-surface-inverse  text-xs text-inverse font-semibold pointer-events-none
                  opacity-0 group-hover:opacity-100 "
                >
                  Use voice mode
                </span>
              </div>
            ) : (
              <Button
                variant="secondary"
                size="icon"
                radius="full"
                className="mb-1.5 opacity-100 hover:opacity-80"
                onClick={handleSend}
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            )}
          </div>
          <div
            className={clsx(
              "hidden text-center -translate-y-3 w-3/4",
              "sm:flex",
              isEmpty && "sm:hidden"
            )}
          >
            <p className=" mx-auto text-[0.75rem] font-light">
              ChatGPT can make mistakes. Check important info. see{" "}
              <span className="underline cursor-pointer">
                Cookie preferences.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
