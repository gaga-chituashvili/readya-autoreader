import { ModeSwitcher } from "@/component/common/ModeSwitcher";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/useAppStore";
import { useAuthStore } from "@/store/authStore";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";
import { SettingsModal } from "@/component/SettingsModal";
import { Button } from "@/component/ui/button";

import { useTTSStore } from "@/store/useTTSStore";

import ClipLoader from "react-spinners/ClipLoader";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";

type Word = {
  word: string;
  start: number;
  end: number;
};

export const TextToAudio = () => {
  const { t, i18n } = useTranslation("home");

  const { text, setText, selectedFile } = useAppStore();
  const { user } = useAuthStore();
  const { loading, audioUrl, error, words, generate } = useTTSStore();

  // ❌ წაიშალა useGenerateAudio გამოყენება

  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const normalizedWords: Word[] = useMemo(() => {
    return (words as Word[]).map((w) => ({
      ...w,
      start: w.start > 50 ? w.start / 1000 : w.start,
      end: w.end > 50 ? w.end / 1000 : w.end,
    }));
  }, [words]);

  const handleGenerate = async () => {
    if (!user) return;

    try {
      await generate(text, selectedFile, user.email);
    } catch (e) {
      console.error("Generate error:", e);
    }
  };

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  const handleTimeUpdate = useCallback(
    (currentTime: number) => {
      let newIndex = -1;

      for (let i = 0; i < normalizedWords.length; i++) {
        const w = normalizedWords[i];
        if (currentTime >= w.start && currentTime <= w.end) {
          newIndex = i;
          break;
        }
      }

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    },
    [normalizedWords, activeIndex],
  );

  useEffect(() => {
    if (activeIndex < 0) return;

    const el = document.getElementById(`word-${activeIndex}`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  const handleWordClick = (start: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = start;
    audioRef.current.play();
  };

  return (
    <section className="relative w-full py-24 flex justify-center bg-gray-100 dark:bg-black overflow-hidden">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <ModeSwitcher />
      </div>
      
      

      <div className="relative z-10 w-full max-w-xl bg-gray-200 dark:bg-gray-900 rounded-3xl p-8 pt-16 shadow-sm">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={5000}
            placeholder={t("textarea_placeholder")}
            className="w-full h-52 resize-none rounded-2xl border border-purple-400 bg-transparent p-4 outline-none focus:ring-2 focus:ring-purple-400 text-sm dark:text-white"
          />
          <div className="absolute bottom-2 right-4 text-xs text-gray-500 dark:text-gray-400">
            {text.length}/5000
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[180px] rounded-full border-purple-400">
              <SelectValue placeholder={t("language_georgian")} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ka">{t("language_georgian")}</SelectItem>
              <SelectItem value="en">{t("language_english")}</SelectItem>
            </SelectContent>
          </Select>

          <SettingsModal />
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="px-8 py-3"
          >
            {loading ? <ClipLoader size={20} /> : t("generate")}
          </Button>
        </div>

        {audioUrl && (
          <div className="mt-6 p-4 bg-gray-800/50 dark:bg-gray-800 rounded-2xl border border-gray-700">
            <h3 className="text-white text-lg font-bold mb-4">
              Your Audio is Ready
            </h3>

            <audio
              ref={audioRef}
              controls
              className="w-full mb-4"
              onTimeUpdate={(e) =>
                handleTimeUpdate(e.currentTarget.currentTime)
              }
            >
              <source src={audioUrl} type="audio/mpeg" />
            </audio>

            {normalizedWords.length > 0 && (
              <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700 max-h-[300px] overflow-y-auto">
                <h4 className="text-white text-sm font-semibold mb-3">
                  Text (Highlighted Reading)
                </h4>

                <div className="text-white text-lg leading-8">
                  {normalizedWords.map((w, i) => (
                    <span
                      id={`word-${i}`}
                      key={i}
                      onClick={() => handleWordClick(w.start)}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          i === activeIndex ? "yellow" : "transparent",
                        transition: "0.15s",
                      }}
                    >
                      {w.word}{" "}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
