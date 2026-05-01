import { useEffect, useState } from "react";
import { FileText, Loader2, AlertCircle } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { getDocuments, type Document } from "@/services/Libraryservice";
import { DocumentCard } from "@/component/library/DocumentCard";
import { PlayerModal } from "@/component/library/PlayerModal";
import { usePlayerModal } from "@/hook/usePlayerModal";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 200 } as const,
  },
};

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
      <div className="flex items-center justify-center min-h-[400px] text-gray-400 dark:text-gray-500">
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
      <motion.div
        className="flex flex-col items-center justify-center min-h-[400px] gap-2 text-gray-400 dark:text-gray-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <FileText size={36} className="text-gray-200 dark:text-gray-700" />
        <p className="text-sm">No documents yet</p>
        <p className="text-xs text-gray-300 dark:text-gray-600">
          Generate something to see it here
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className="p-4 md:p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {docs.map((doc: Document) => (
            <motion.div key={doc.id} variants={cardVariants}>
              <DocumentCard doc={doc} onOpen={open} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedDocId && <PlayerModal docId={selectedDocId} onClose={close} />}
    </>
  );
};
