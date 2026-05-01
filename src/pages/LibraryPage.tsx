import { useEffect, useState } from "react";
import { FileText, Loader2, AlertCircle } from "lucide-react";

import { getDocuments, type Document } from "@/services/Libraryservice";
import { DocumentCard } from "@/component/library/DocumentCard";
import { PlayerModal } from "@/component/library/PlayerModal";
import { usePlayerModal } from "@/hook/usePlayerModal";

export const LibraryPage = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { selectedDocId, open, close } = usePlayerModal();

  useEffect(() => {
    getDocuments()
      .then(setDocs)
      .catch((e: Error) => setError(e.message ?? "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-400">
        <Loader2 size={24} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center gap-2 min-h-[400px] text-red-400 text-sm">
        <AlertCircle size={18} />
        {error}
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2 text-gray-400">
        <FileText size={36} className="text-gray-200" />
        <p className="text-sm">No documents yet</p>
        <p className="text-xs text-gray-300">
          Generate something to see it here
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {docs.map((doc: Document) => (
            <DocumentCard key={doc.id} doc={doc} onOpen={open} />
          ))}
        </div>
      </div>

      {selectedDocId && <PlayerModal docId={selectedDocId} onClose={close} />}
    </>
  );
};
