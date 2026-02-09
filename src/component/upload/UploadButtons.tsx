import { useRef } from "react";

interface UploadButtonsProps {
  onFileSelect: (file: File | null) => void;
  selectedFileName?: string;
}

export const UploadButtons = ({
  onFileSelect,
  selectedFileName,
}: UploadButtonsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-3 mb-2">
        <button
          type="button"
          className="bg-orange-800/80 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-orange-700/80"
        >
          📋 ჩასვი
        </button>
        <button
          type="button"
          onClick={handleFileClick}
          className="bg-purple-700 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-purple-600"
        >
          👍 ატვირთე
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {selectedFileName && (
        <p className="text-green-400 text-sm">✓ არჩეულია: {selectedFileName}</p>
      )}
    </div>
  );
};
