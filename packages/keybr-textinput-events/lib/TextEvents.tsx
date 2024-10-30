import { type Focusable } from "@keybr/widget";
import {
  type CSSProperties,
  memo,
  type ReactNode,
  type RefObject,
  useImperativeHandle,
  useRef,
} from "react";
import { type Callbacks, InputHandler } from "./inputhandler.ts";

export const TextEvents = memo(function TextEvents({
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onInput,
  focusRef,
}: Callbacks & {
  readonly focusRef?: RefObject<Focusable>;
}): ReactNode {
  const handler = useInputHandler();
  useImperativeHandle(focusRef, () => handler);
  handler.setCallbacks({ onFocus, onBlur, onKeyDown, onKeyUp, onInput });
  return (
    <div style={divStyle}>
      <textarea
        ref={handler.setInput.bind(handler)}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        style={inputStyle}
      />
    </div>
  );
});

function useInputHandler(): InputHandler {
  const handlerRef = useRef<InputHandler | null>(null);
  let handler = handlerRef.current;
  if (handler == null) {
    handlerRef.current = handler = new InputHandler();
  }
  return handler;
}

const divStyle = {
  position: "absolute",
  insetInlineStart: "0px",
  insetBlockStart: "0px",
  inlineSize: "0px",
  blockSize: "0px",
  overflow: "hidden",
} satisfies CSSProperties;

const inputStyle = {
  display: "block",
  margin: "0px",
  padding: "0px",
  inlineSize: "1em",
  blockSize: "1em",
  border: "none",
  outline: "none",
} satisfies CSSProperties;
