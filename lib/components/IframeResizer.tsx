"use client";

import { useEffect, useRef, useState } from "react";
import type { HTMLProps } from "../types/react";

type Props = HTMLProps<"iframe">;

function IframeResizer({ style, ...props }: Props) {
  const [height, setHeight] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const observerRef = useRef<ResizeObserver>(null);

  function handleLoad() {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const body = iframe.contentWindow.document.body;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const updateHeight = () => {
      const newHeight = body.scrollHeight;
      setHeight(newHeight);
    };

    observerRef.current = new ResizeObserver(() => {
      updateHeight();
    });

    observerRef.current.observe(body);
    updateHeight();
  }

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument?.readyState === "complete") {
      handleLoad();
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <iframe
      {...props}
      style={{
        height: height + "px",
        ...style,
      }}
      ref={iframeRef}
      onLoad={handleLoad}
    />
  );
}

export default IframeResizer;
