import { RefObject, useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";

function useIntersection(
  containerRef: RefObject<HTMLElement | null>,
  callback: () => void,
  threshold: number = 0.1,
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          callback();
        }
      },
      { threshold },
    );

    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    sentinel.style.marginTop = "auto";

    container.appendChild(sentinel);
    observerRef.current.observe(sentinel);

    console.log(sentinel, container);

    return () => {
      if (sentinel) {
        container.removeChild(sentinel);
      }

      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerRef, callback, threshold]);
}

export default useIntersection;
