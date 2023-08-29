"use client";

import React from "react";

export default function ScrollPercentage() {
  const [scrollPercentage, setScrollPercentage] = React.useState(0);
  React.useEffect(() => {
    const handler = (e: Event) => {
      if (e.target instanceof Document) {
        const se = e.target.scrollingElement;
        setScrollPercentage(
          (se?.scrollTop ?? 0) /
            ((se?.scrollHeight ?? 1) - document.documentElement.clientHeight)
        );
      }
    };
    document.addEventListener("scroll", handler);
    return () => {
      document.removeEventListener("scroll", handler);
    };
  });
  return (
    <span>
      {scrollPercentage === 1
        ? "END"
        : (scrollPercentage * 100).toFixed() + "%"}
    </span>
  );
}
