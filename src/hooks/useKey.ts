"use client";

import { useEffect } from "react";

export default function useKey(key: string, action: () => void) {
  useEffect(() => {
    function handleUndoKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.key.toLocaleLowerCase() === key.toLocaleLowerCase()) {
        action();
      }
    }
    // Adiciona o ouvinte de eventos ao documento
    document.addEventListener("keydown", handleUndoKey);

    // Remove o ouvinte de eventos quando o componente é desmontado
    return () => {
      document.removeEventListener("keydown", handleUndoKey);
    };
  }, [action, key]);
}
