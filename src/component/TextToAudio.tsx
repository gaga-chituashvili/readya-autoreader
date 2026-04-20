import { ModeSwitcher } from "@/component/common/ModeSwitcher";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/useAppStore";
import { useAuthStore } from "@/store/authStore";
import { useCallback, useRef, useState, useEffect } from "react";
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
import { GradientBlob } from "./ui/GradientBlob";

type Word = {
  word: string;
  start: number;
  end: number;
};

function useAudioHighlight(
  audioRef: React.RefObject<HTMLAudioElement | null>,
  words: Word[],
) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);

  const findIndex = useCallback(
    (time: number): number => {
      if (!words.length) return -1;
      let lo = 0;
      let hi = words.length - 1;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (time < words[mid].start) {
          hi = mid - 1;
        } else if (time >= words[mid].end) {
          lo = mid + 1;
        } else {
          return mid;
        }
      }

      return Math.max(0, lo - 1);
    },
    [words],
  );

  useEffect(() => {
    if (!isPlaying) return;

    const tick = () => {
      if (!audioRef.current) return;
      const t = audioRef.current.currentTime;
      setActiveIndex(findIndex(t));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, findIndex, audioRef]);

  const syncToTime = useCallback(
    (t: number) => setActiveIndex(findIndex(t)),
    [findIndex],
  );

  const handlers = {
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
    onEnded: () => {
      setIsPlaying(false);
      setActiveIndex(-1);
    },
    onSeeked: () => {
      if (audioRef.current) syncToTime(audioRef.current.currentTime);
    },
  };

  return { activeIndex, syncToTime, handlers };
}

export const TextToAudio = () => {
  const { t, i18n } = useTranslation("home");
  const { text, setText, selectedFile } = useAppStore();
  const { user } = useAuthStore();
  const { loading, audioUrl, error, words, generate } = useTTSStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const activeWordRef = useRef<HTMLSpanElement | null>(null);

  const normalizedWords = words as Word[];

  const { activeIndex, syncToTime, handlers } = useAudioHighlight(
    audioRef,
    normalizedWords,
  );

  useEffect(() => {
    if (activeWordRef.current) {
      activeWordRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  const handleGenerate = async () => {
    if (!user) return;
    try {
      await generate(text, selectedFile, user.email);
    } catch (e) {
      console.error("Generate error:", e);
    }
  };

  const handleWordClick = (start: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = start;
    syncToTime(start);
    audioRef.current.play();
  };

  return (
    <section className="relative w-full py-24 flex justify-center bg-gray-100 dark:bg-black overflow-hidden">
      <GradientBlob />
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
          <Select onValueChange={(v) => i18n.changeLanguage(v)}>
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
              {...handlers}
            >
              <source src={audioUrl} type="audio/mpeg" />
            </audio>

            {normalizedWords.length > 0 && (
              <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700 max-h-[300px] overflow-y-auto">
                <h4 className="text-white text-sm font-semibold mb-3">
                  Text (Highlighted Reading)
                </h4>

                <div className="text-white text-lg leading-8 select-none">
                  {normalizedWords.map((w, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <span
                        key={i}
                        ref={isActive ? activeWordRef : null}
                        onClick={() => handleWordClick(w.start)}
                        style={{
                          cursor: "pointer",
                          display: "inline-block",
                          padding: "2px 4px",
                          borderRadius: "4px",
                          marginRight: "2px",
                          backgroundColor: isActive
                            ? "rgba(255, 235, 59, 0.35)"
                            : "transparent",
                          color: isActive ? "#000" : "inherit",
                          transition:
                            "background-color 0.08s ease, color 0.08s ease",
                          willChange: "background-color",
                        }}
                      >
                        {w.word}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
