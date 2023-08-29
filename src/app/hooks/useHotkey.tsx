import React from "react";

export default function useHotkey(keys: string[], callback: () => void) {
  React.useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (keys.some((k) => k.toLowerCase() === e.key.toLowerCase())) {
        callback();
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.removeEventListener("keydown", handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
