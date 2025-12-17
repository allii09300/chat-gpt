import type { Message } from "@/types/chat";
import { useChatStore } from "../stores";
import { useRef } from "react";

export function useTypingResponse(
  addMessage: (msg: Message, update?: boolean) => void,
  text: string,
  speed = 30
) {
  const setIsTypingResponse = useChatStore(
    (state) => state.setIsTypingResponse
  );

  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (!text) return;

    const id = crypto.randomUUID();
    let index = 0;

    setIsTypingResponse(true);
    addMessage({ id, role: "assistant", content: "" });

    intervalRef.current = window.setInterval(() => {
      index++;

      addMessage(
        { id, role: "assistant", content: text.slice(0, index) },
        true
      );

      if (index >= text.length) {
        stop(); 
      }
    }, speed);
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTypingResponse(false);
  };

  return { start, stop };
}
