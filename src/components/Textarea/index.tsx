"use client";

import {
  forwardRef,
  TextareaHTMLAttributes,
  useRef,
  useImperativeHandle,
} from "react";
import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxHeight?: number;
  onLineChange?: (isMultiLine: boolean) => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxHeight = 200, onLineChange, ...props }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    useImperativeHandle(ref, () => innerRef.current!);

    const handleInput = () => {
      const el = innerRef.current;
      if (!el) return;

      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;

      const computedStyle = getComputedStyle(el);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const isMultiLine = el.scrollHeight > lineHeight + 1;
      if (onLineChange) onLineChange(isMultiLine);
    };

    return (
      <textarea
        ref={innerRef}
        rows={1}
        {...props}
        onInput={(e) => {
          handleInput();
          if (props.onInput) props.onInput(e);
        }}
        style={{ maxHeight }}
        className={clsx(
          "w-full resize-none outline-none py-3 bg-transparent overflow-y-auto text-base transition-all duration-300",
          className
        )}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
