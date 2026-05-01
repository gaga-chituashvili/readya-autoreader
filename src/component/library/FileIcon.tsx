import { FileText, FileImage, File } from "lucide-react";
import type { Document } from "@/services/Libraryservice";

interface FileIconProps {
  type: Document["file_type"];
}

export function FileIcon({ type }: FileIconProps) {
  if (type === "image") {
    return (
      <div className="w-full h-full flex items-center justify-center bg-purple-50 rounded-xl">
        <FileImage size={32} className="text-purple-400" />
      </div>
    );
  }

  if (type === "pdf") {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50 rounded-xl">
        <File size={32} className="text-red-400" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-50 rounded-xl">
      <FileText size={32} className="text-blue-400" />
    </div>
  );
}
