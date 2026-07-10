"use client";

import { useEffect } from "react";

export default function MediaProtection() {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.tagName === "IMG" ||
        target.tagName === "VIDEO" ||
        target.tagName === "IFRAME"
      ) {
        event.preventDefault();
      }
    };

    const handleDragStart = (event: DragEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.tagName === "IMG" ||
        target.tagName === "VIDEO" ||
        target.tagName === "IFRAME"
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}