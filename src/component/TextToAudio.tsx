import { ModeSwitcher } from "@/component/common/ModeSwitcher";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/useAppStore";
import { useAuthStore } from "@/store/authStore";
import { useCallback, useRef, useState, useEffect } from "react";
import { Button } from "@/component/ui/button";
import { useTTSStore } from "@/store/useTTSStore";
import ClipLoader from "react-spinners/ClipLoader";
import { GradientBlob } from "./ui/GradientBlob";
import { toast } from "sonner";

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
      if (time < words[0].start) return -1;
      if (time >= words[words.length - 1].end) return -1;
      let lo = 0,
        hi = words.length - 1;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (time < words[mid].start) hi = mid - 1;
        else if (time >= words[mid].end) lo = mid + 1;
        else return mid;
      }
      return -1;
    },
    [words],
  );

  useEffect(() => {
    if (!isPlaying) return;
    const tick = () => {
      if (!audioRef.current) return;
      setActiveIndex(findIndex(audioRef.current.currentTime));
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

  return { activeIndex, isPlaying, syncToTime, handlers };
}

const SPEED_STEPS = [0.75, 1, 1.25, 1.5, 1.75, 2];

export const TextToAudio = () => {
  const { t } = useTranslation("home");
  const { text, setText, selectedFile } = useAppStore();
  const { user } = useAuthStore();

  const { loading, audioUrl, error, words, generate, speed, originalText } =
    useTTSStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const activeWordRef = useRef<HTMLSpanElement | null>(null);
  const readerRef = useRef<HTMLDivElement>(null);

  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const normalizedWords = words as Word[];
  const originalWords = (originalText || text).trim().split(/\s+/);

  const displayWords: Word[] = (() => {
    if (!normalizedWords.length || !originalWords.length) return [];

    const n = originalWords.length;
    const m = normalizedWords.length;

    const result: Word[] = [];

    for (let i = 0; i < n; i++) {
      const startChunk = Math.floor((i / n) * m);
      const endChunk = Math.floor(((i + 1) / n) * m) - 1;
      const s = Math.max(0, Math.min(startChunk, m - 1));
      const e = Math.max(s, Math.min(endChunk, m - 1));

      result.push({
        word: originalWords[i],
        start: normalizedWords[s].start,
        end: normalizedWords[e].end,
      });
    }

    return result;
  })();
  const { activeIndex, isPlaying, syncToTime, handlers } = useAudioHighlight(
    audioRef,
    displayWords,
  );

  useEffect(() => {
    activeWordRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeIndex]);

  useEffect(() => {
    if (audioRef.current) {
      const rate = 0.5 + (speed / 100) * 0.84;
      audioRef.current.playbackRate = rate;
    }
  }, [speed]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onLoaded = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [audioUrl]);

  const handleGenerate = async () => {
    if (!user) {
      toast.error(t("auth.login_required"));
      return;
    }
    try {
      await generate(text, selectedFile, user.email);
    } catch {
      toast.error(t("auth.generate_error"));
    }
  };

  const handleWordClick = (start: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = start;
    syncToTime(start);
    audioRef.current.play();
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const seekBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${Math.floor(s % 60)
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <section className="relative w-full py-24 flex justify-center bg-gray-100 dark:bg-black overflow-hidden">
      <GradientBlob />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <ModeSwitcher />
      </div>

      <div className="relative z-10 w-full max-w-xl">
        {/* ── input card ── */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 pt-16 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={5000}
              placeholder={t("textarea_placeholder")}
              className="w-full h-52 resize-none rounded-2xl border border-purple-400 bg-transparent p-4 outline-none focus:ring-2 focus:ring-purple-500 text-sm text-gray-800 dark:text-white placeholder:text-gray-400"
            />
            <div className="absolute bottom-2 right-4 text-xs text-gray-400">
              {text.length}/5000
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-400 rounded-xl">
              <p className="text-red-500 text-sm">{error}</p>
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
        </div>

        {audioUrl && (
          <div className="mt-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
              <span className="text-xs text-gray-400 font-medium">Speed</span>
              <div className="flex gap-1.5">
                {SPEED_STEPS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setPlaybackRate(r)}
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-150 ${
                      playbackRate === r
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {r}×
                  </button>
                ))}
              </div>
            </div>

            {displayWords.length > 0 && (
              <div
                ref={readerRef}
                className="px-6 py-6 max-h-64 overflow-y-auto"
              >
                <div className="font-serif text-[17px] leading-[2.1] text-gray-300 dark:text-gray-600 select-none">
                  {displayWords.map((w, i) => {
                    const isActive = i === activeIndex;
                    const isSpoken = i < activeIndex;
                    return (
                      <span key={i}>
                        <span
                          ref={isActive ? activeWordRef : null}
                          onClick={() => handleWordClick(w.start)}
                          className={`
                            inline rounded-[4px] px-[3px] py-[1px] mr-[2px] cursor-pointer
                            transition-colors duration-[80ms]
                            ${
                              isActive
                                ? "bg-yellow-300 dark:bg-yellow-400 text-gray-900 dark:text-gray-900"
                                : isSpoken
                                  ? "text-gray-800 dark:text-gray-100"
                                  : "hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400"
                            }
                          `}
                        >
                          {w.word}
                        </span>{" "}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center flex-shrink-0 hover:opacity-80 active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <svg
                    className="text-white dark:text-gray-900"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg
                    className="text-white dark:text-gray-900 ml-0.5"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <div className="flex-1 flex flex-col gap-1.5">
                <div
                  className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer group"
                  onClick={seekBar}
                >
                  <div
                    className="h-full bg-gray-900 dark:bg-white rounded-full transition-[width] duration-100 group-hover:bg-purple-600 dark:group-hover:bg-purple-400"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>{fmt(currentTime)}</span>
                  <span>{fmt(duration)}</span>
                </div>
              </div>
            </div>

            <audio
              ref={audioRef}
              src={audioUrl}
              preload="metadata"
              className="hidden"
              {...handlers}
            />
          </div>
        )}
      </div>
    </section>
  );
};
