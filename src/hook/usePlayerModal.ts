import { useState } from "react";

interface UsePlayerModal {
  selectedDocId: string | null;
  open: (id: string) => void;
  close: () => void;
}

export function usePlayerModal(): UsePlayerModal {
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  return {
    selectedDocId,
    open: (id: string) => setSelectedDocId(id),
    close: () => setSelectedDocId(null),
  };
}
