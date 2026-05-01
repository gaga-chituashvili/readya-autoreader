import { FileText, FileImage, File } from "lucide-react";
import type { Document } from "@/services/Libraryservice";

interface FileIconProps {
  type: Document["file_type"];
}

const ICON_CONFIG = {
  image: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    icon: FileImage,
    color: "text-purple-400 dark:text-purple-300",
  },
  pdf: {
    bg: "bg-red-50 dark:bg-red-900/20",
    icon: File,
    color: "text-red-400 dark:text-red-300",
  },
  docx: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: FileText,
    color: "text-blue-400 dark:text-blue-300",
  },
  text: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: FileText,
    color: "text-blue-400 dark:text-blue-300",
  },
} as const;

export function FileIcon({ type }: FileIconProps) {
  const { bg, icon: Icon, color } = ICON_CONFIG[type] ?? ICON_CONFIG.text;

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${bg} rounded-xl transition-colors duration-200`}
    >
      <Icon size={32} className={color} />
    </div>
  );
}
