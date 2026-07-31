"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import clsx from "clsx";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
};

export function Reveal({
  children,
  className,
  delay = 0,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        element.dataset.visible = "true";
        observer.unobserve(element);
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={clsx(
        "scroll-reveal",
        `scroll-reveal-delay-${delay}`,
        className,
      )}
      data-visible="false"
      ref={elementRef}
    >
      {children}
    </div>
  );
}