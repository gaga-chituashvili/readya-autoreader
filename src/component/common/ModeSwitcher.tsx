import { FileText, Upload } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/useAppStore";

export const ModeSwitcher = () => {
  const { t } = useTranslation("home");

  const { activeTab, setTab, selectedFile, setSelectedFile, setText } =
    useAppStore();

  const ref = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Unsupported file type");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large");
      return;
    }

    setSelectedFile(file);
    setTab("file");
    setText("");

    e.target.value = "";
  };
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex bg-white dark:bg-gray-800 rounded-full p-1 shadow relative">
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gray-100 dark:bg-gray-700 transition-all duration-300
          ${activeTab === "text" ? "left-1" : "left-[50%]"}`}
        />

        <button
          onClick={() => {
            setTab("text");
            setSelectedFile(null);
          }}
          className="relative z-10 flex items-center gap-2 px-4 py-2 text-sm"
        >
          <FileText size={16} />
          {t("text_mode")}
        </button>

        <button
          onClick={() => {
            setTab("file");
            ref.current?.click();
          }}
          className="relative z-10 flex items-center gap-2 px-4 py-2 text-sm"
        >
          <Upload size={16} />
          {t("file_mode")}
        </button>
      </div>

      <input
        type="file"
        ref={ref}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />

      {selectedFile && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          {selectedFile.name}
        </div>
      )}
    </div>
  );
};
