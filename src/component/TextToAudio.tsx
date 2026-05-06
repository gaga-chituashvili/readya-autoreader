import { ModeSwitcher } from "@/component/common/ModeSwitcher";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/useAppStore";
import { useAuthStore } from "@/store/authStore";
import { useCallback, useRef, useState, useEffect, useMemo, memo } from "react";
import { Button } from "@/component/ui/button";
import { useTTSStore } from "@/store/useTTSStore";
import ClipLoader from "react-spinners/ClipLoader";
import { GradientBlob } from "./ui/GradientBlob";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";

type Word = { word: string; start: number; end: number };

const SPEED_STEPS = [0.75, 1, 1.25, 1.5, 1.75, 2];

const ACTIVE_CLASS =
  "inline rounded-[4px] px-[3px] py-[1px] mr-[2px] cursor-pointer bg-yellow-300 dark:bg-yellow-400 text-gray-900";
const SPOKEN_CLASS =
  "inline rounded-[4px] px-[3px] py-[1px] mr-[2px] cursor-pointer text-gray-800 dark:text-gray-100";
const UNSPOKEN_CLASS =
  "inline rounded-[4px] px-[3px] py-[1px] mr-[2px] cursor-pointer text-gray-300 dark:text-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400";

const fmt = (s: number): string => {
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60)
    .toString()
    .padStart(2, "0")}`;
};

function useAudioHighlight(
  audioRef: React.RefObject<HTMLAudioElement | null>,
  words: Word[],
  playIconRef: React.RefObject<SVGSVGElement | null>,
  pauseIconRef: React.RefObject<SVGSVGElement | null>,
) {
  const isPlayingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const activeIndexRef = useRef(-1);
  const wordsRef = useRef(words);
  const onActiveIndexChangeRef = useRef<((i: number) => void) | null>(null);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  const findIndex = useCallback((time: number): number => {
    const w = wordsRef.current;
    if (!w.length) return -1;
    if (time < w[0].start) return -1;
    if (time >= w[w.length - 1].end) return -1;
    let lo = 0,
      hi = w.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (time < w[mid].start) hi = mid - 1;
      else if (time >= w[mid].end) lo = mid + 1;
      else return mid;
    }
    return -1;
  }, []);

  const showPlay = useCallback(() => {
    if (playIconRef.current) playIconRef.current.style.display = "block";
    if (pauseIconRef.current) pauseIconRef.current.style.display = "none";
  }, [playIconRef, pauseIconRef]);

  const showPause = useCallback(() => {
    if (playIconRef.current) playIconRef.current.style.display = "none";
    if (pauseIconRef.current) pauseIconRef.current.style.display = "block";
  }, [playIconRef, pauseIconRef]);

  const handlers = useMemo(() => {
    const startLoop = () => {
      const tick = () => {
        if (!audioRef.current || !isPlayingRef.current) return;
        const next = findIndex(audioRef.current.currentTime);
        if (next !== activeIndexRef.current) {
          activeIndexRef.current = next;
          onActiveIndexChangeRef.current?.(next);
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    const stopLoop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    return {
      onPlay: () => {
        isPlayingRef.current = true;
        showPause();
        startLoop();
      },
      onPause: () => {
        isPlayingRef.current = false;
        showPlay();
        stopLoop();
      },
      onEnded: () => {
        isPlayingRef.current = false;
        showPlay();
        stopLoop();
        activeIndexRef.current = -1;
        onActiveIndexChangeRef.current?.(-1);
      },
      onSeeked: () => {
        if (audioRef.current) {
          const next = findIndex(audioRef.current.currentTime);
          activeIndexRef.current = next;
          onActiveIndexChangeRef.current?.(next);
        }
      },
    };
  }, [findIndex, audioRef, showPlay, showPause]);

  const seekToTime = useCallback(
    (t: number) => {
      const next = findIndex(t);
      activeIndexRef.current = next;
      onActiveIndexChangeRef.current?.(next);
    },
    [findIndex],
  );

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlayingRef.current) audioRef.current.pause();
    else audioRef.current.play();
  }, [audioRef]);

  // WordReader-ს callback-ის დარეგისტრირება
  const registerCallback = useCallback((cb: (i: number) => void) => {
    onActiveIndexChangeRef.current = cb;
  }, []);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  return { handlers, registerCallback, seekToTime, togglePlay };
}

const WordReader = memo(function WordReader({
  displayWords,
  registerCallback,
  onWordClick,
}: {
  displayWords: Word[];
  registerCallback: (cb: (i: number) => void) => void;
  onWordClick: (start: number) => void;
}) {
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const prevActiveRef = useRef(-1);

  useEffect(() => {
    registerCallback((next: number) => {
      const prev = prevActiveRef.current;
      if (prev >= 0 && spanRefs.current[prev]) {
        spanRefs.current[prev]!.className = SPOKEN_CLASS;
      }
      if (next > prev) {
        for (let i = Math.max(0, prev + 1); i < next; i++) {
          if (spanRefs.current[i])
            spanRefs.current[i]!.className = SPOKEN_CLASS;
        }
      }
      if (next >= 0 && spanRefs.current[next]) {
        spanRefs.current[next]!.className = ACTIVE_CLASS;
        spanRefs.current[next]!.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
      if (next === -1) {
        spanRefs.current.forEach((s) => {
          if (s) s.className = UNSPOKEN_CLASS;
        });
      }
      prevActiveRef.current = next;
    });
  }, [registerCallback]);

  return (
    <div className="font-serif text-[17px] leading-[2.1] select-none">
      {displayWords.map((w, i) => (
        <span key={i}>
          <span
            ref={(el) => {
              spanRefs.current[i] = el;
            }}
            onClick={() => onWordClick(w.start)}
            className={UNSPOKEN_CLASS}
          >
            {w.word}
          </span>{" "}
        </span>
      ))}
    </div>
  );
});

export const TextToAudio = () => {
  const { t } = useTranslation("home");

  const { text, setText, selectedFile } = useAppStore(
    useShallow((s) => ({
      text: s.text,
      setText: s.setText,
      selectedFile: s.selectedFile,
    })),
  );
  const { user } = useAuthStore(useShallow((s) => ({ user: s.user })));
  const { loading, audioUrl, error, words, generate, speed, originalText } =
    useTTSStore(
      useShallow((s) => ({
        loading: s.loading,
        audioUrl: s.audioUrl,
        error: s.error,
        words: s.words,
        generate: s.generate,
        speed: s.speed,
        originalText: s.originalText,
      })),
    );

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const durationRef = useRef<HTMLSpanElement>(null);
  const playIconRef = useRef<SVGSVGElement>(null);
  const pauseIconRef = useRef<SVGSVGElement>(null);

  const [playbackRate, setPlaybackRate] = useState(1);

  const normalizedWords = useMemo(() => words as Word[], [words]);
  const originalWords = useMemo(
    () => (originalText || text).trim().split(/\s+/),
    [originalText, text],
  );
  const displayWords = useMemo(() => {
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
  }, [originalWords, normalizedWords]);

  const { handlers, registerCallback, seekToTime, togglePlay } =
    useAudioHighlight(audioRef, displayWords, playIconRef, pauseIconRef);

  useEffect(() => {
    if (audioRef.current)
      audioRef.current.playbackRate = 0.5 + (speed / 100) * 0.84;
  }, [speed]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      const t = audio.currentTime;
      const p = audio.duration ? t / audio.duration : 0;
      if (progressBarRef.current)
        progressBarRef.current.style.width = `${p * 100}%`;
      if (timeRef.current) timeRef.current.textContent = fmt(t);
    };
    const onLoaded = () => {
      if (durationRef.current)
        durationRef.current.textContent = fmt(audio.duration);
    };
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

  const handleWordClick = useCallback(
    (start: number) => {
      if (!audioRef.current) return;
      audioRef.current.currentTime = start;
      seekToTime(start);
      audioRef.current.play();
    },
    [seekToTime],
  );

  const seekBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  return (
    <section className="relative w-full py-24 flex justify-center bg-gray-100 dark:bg-black overflow-hidden">
      <GradientBlob />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <ModeSwitcher />
      </div>
      <div className="relative z-10 w-full max-w-xl">
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
              <div className="px-6 py-6 max-h-64 overflow-y-auto">
                <WordReader
                  displayWords={displayWords}
                  registerCallback={registerCallback}
                  onWordClick={handleWordClick}
                />
              </div>
            )}

            <div className="flex items-center gap-4 px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center flex-shrink-0 hover:opacity-80 active:scale-95 transition-all"
              >
                <svg
                  ref={pauseIconRef}
                  style={{ display: "none" }}
                  className="text-white dark:text-gray-900"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <svg
                  ref={playIconRef}
                  className="text-white dark:text-gray-900 ml-0.5"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              <div className="flex-1 flex flex-col gap-1.5">
                <div
                  className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer group"
                  onClick={seekBar}
                >
                  <div
                    ref={progressBarRef}
                    className="h-full bg-gray-900 dark:bg-white rounded-full group-hover:bg-purple-600 dark:group-hover:bg-purple-400"
                    style={{ width: "0%" }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span ref={timeRef}>0:00</span>
                  <span ref={durationRef}>0:00</span>
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
