import { useMemo } from "react";

export function useMessageInput(text: string) {
  const trimmedText = text.trim();

  const isEmpty = trimmedText === "";

  return useMemo(() => ({
    showMic: isEmpty,
    canSend: !isEmpty,
  }), [isEmpty]);
}
