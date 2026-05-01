import { motion } from "framer-motion";
import type { Document } from "@/services/Libraryservice";
import { FileIcon } from "./FileIcon";
import { timeAgo } from "@/utils/timeAgo";

const FILE_TYPE_LABELS: Record<Document["file_type"], string> = {
  pdf: "pdf",
  docx: "docx",
  text: "txt",
  image: "image",
};

const STATUS_LABEL: Record<Document["status"], string> = {
  done: "100%",
  processing: "Processing...",
  failed: "Failed",
  pending_payment: "Pending",
};

const STATUS_COLOR: Record<Document["status"], string> = {
  done: "text-gray-400 dark:text-gray-500",
  processing: "text-blue-400",
  failed: "text-red-400",
  pending_payment: "text-gray-400 dark:text-gray-500",
};

interface DocumentCardProps {
  doc: Document;
  onOpen: (id: string) => void;
}

export function DocumentCard({ doc, onOpen }: DocumentCardProps) {
  const label = doc.text_preview
    ? doc.text_preview.slice(0, 40) +
      (doc.text_preview.length > 40 ? "..." : "")
    : `${FILE_TYPE_LABELS[doc.file_type]} file`;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Open ${label}`}
      className="flex flex-col gap-2 cursor-pointer outline-none"
      onClick={() => onOpen(doc.id)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(doc.id)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="w-full aspect-[3/4] rounded-xl border border-black/[0.07] dark:border-white/[0.07] bg-white dark:bg-gray-800 overflow-hidden focus-visible:ring-2 focus-visible:ring-blue-500"
        whileHover={{
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          borderColor: "rgba(0,0,0,0.2)",
        }}
        transition={{ duration: 0.2 }}
      >
        <FileIcon type={doc.file_type} />
      </motion.div>

      <div>
        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-snug line-clamp-2 group-hover:text-gray-900">
          {label}
        </p>
        <p className={`text-xs mt-0.5 ${STATUS_COLOR[doc.status]}`}>
          {STATUS_LABEL[doc.status]} · {timeAgo(doc.created_at)} ·{" "}
          {FILE_TYPE_LABELS[doc.file_type]}
        </p>
      </div>
    </motion.div>
  );
}
