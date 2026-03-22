import { FileText, File } from "lucide-react";
import { useTranslation } from "react-i18next";

type ModeSwitcherProps = {
  activeTab: "text" | "file";
  setActiveTab: (value: "text" | "file") => void;
};

export const ModeSwitcher = ({
  activeTab,
  setActiveTab,
}: ModeSwitcherProps) => {
  const { t } = useTranslation("home");

  return (
    <div className="flex justify-center mb-6">
      <div className="flex bg-white dark:bg-gray-800 rounded-full p-1 shadow relative">
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-gray-100 dark:bg-gray-700 transition-all duration-300
            ${activeTab === "text" ? "left-1" : "left-[50%]"}`}
        />

        <button
          onClick={() => setActiveTab("text")}
          className="relative z-10 flex items-center gap-2 px-4 py-2 text-sm"
        >
          <FileText size={16} />
          {t("text_mode")}
        </button>

        <button
          onClick={() => setActiveTab("file")}
          className="relative z-10 flex items-center gap-2 px-4 py-2 text-sm"
        >
          <File size={16} />
          {t("file_mode")}
        </button>
      </div>
    </div>
  );
};
