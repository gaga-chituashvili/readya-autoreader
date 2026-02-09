import { useRef } from "react";
import { GrLike } from "react-icons/gr";
import { FaCopy } from "react-icons/fa";

interface UploadButtonsProps {
  onFileSelect: (file: File | null) => void;
  selectedFileName?: string;
}

export const UploadButtons = ({
  onFileSelect,
  selectedFileName,
}: UploadButtonsProps) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3 mb-2">
        <button className="bg-orange-800/80 text-white px-6 py-3 rounded-full flex items-center gap-2">
          <FaCopy /> ჩასვი
        </button>

        <button
          onClick={() => ref.current?.click()}
          className="bg-purple-700 text-white px-6 py-3 rounded-full flex items-center gap-2"
        >
          <GrLike /> ატვირთე
        </button>

        <input
          ref={ref}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => onFileSelect(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </div>

      {selectedFileName && (
        <p className="text-green-400 text-sm">✓ არჩეულია: {selectedFileName}</p>
      )}
    </div>
  );
};
