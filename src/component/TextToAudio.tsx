import { ModeSwitcher } from "@/component/common/ModeSwitcher";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/useAppStore";
import { useAuthStore } from "@/store/authStore";
import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import { Button } from "@/component/ui/button";
import { useTTSStore } from "@/store/useTTSStore";
import ClipLoader from "react-spinners/ClipLoader";
import { GradientBlob } from "./ui/GradientBlob";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import { useAudioHighlight } from "@/hook/useAudioHighlight";
import { WordReader } from "@/component/player/WordReader";

type Word = { word: string; start: number; end: number };

const SPEED_STEPS = [0.75, 1, 1.25, 1.5, 1.75, 2];

const fmt = (s: number): string => {
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60)
    .toString()
    .padStart(2, "0")}`;
};

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

  const {
    loading,
    error,
    currentChunkIndex,
    totalChunks,
    audioUrl,
    words,
    sentenceIndices,
    speed,
    generate,
    loadNextChunk,
    goToChunk,
  } = useTTSStore(
    useShallow((s) => ({
      loading: s.loading,
      error: s.error,
      chunks: s.chunks,
      currentChunkIndex: s.currentChunkIndex,
      totalChunks: s.totalChunks,
      audioUrl: s.audioUrl,
      words: s.words,
      sentenceIndices: s.sentenceIndices,
      speed: s.speed,
      generate: s.generate,
      loadNextChunk: s.loadNextChunk,
      goToChunk: s.goToChunk,
    })),
  );

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const durationRef = useRef<HTMLSpanElement>(null);
  const playIconRef = useRef<SVGSVGElement>(null);
  const pauseIconRef = useRef<SVGSVGElement>(null);
  const prefetchedRef = useRef(false);

  const [playbackRate, setPlaybackRate] = useState(1);
  const displayWords = useMemo(() => words as Word[], [words]);

  const { handlers, registerCallback, seekToTime, togglePlay } =
    useAudioHighlight(audioRef, displayWords, playIconRef, pauseIconRef);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    if (audioRef.current)
      audioRef.current.playbackRate = 0.5 + (speed / 100) * 0.84;
  }, [speed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      const t = audio.currentTime;
      const p = audio.duration ? t / audio.duration : 0;
      if (progressBarRef.current)
        progressBarRef.current.style.width = `${p * 100}%`;
      if (timeRef.current) timeRef.current.textContent = fmt(t);
      if (p >= 0.7 && !prefetchedRef.current) {
        prefetchedRef.current = true;
        loadNextChunk();
      }
    };

    const onLoaded = () => {
      if (durationRef.current)
        durationRef.current.textContent = fmt(audio.duration);
    };

    const onEnded = () => {
      const { chunks, currentChunkIndex, totalChunks } = useTTSStore.getState();
      const nextIndex = currentChunkIndex + 1;
      if (nextIndex >= totalChunks) return;
      const nextChunk = chunks[nextIndex];
      if (!nextChunk) return;

      prefetchedRef.current = false;
      useTTSStore.setState({
        currentChunkIndex: nextIndex,
        audioUrl: nextChunk.audioUrl,
        words: nextChunk.words,
        sentenceIndices: nextChunk.sentenceIndices,
      });

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.load();
          audioRef.current.play();
        }
      }, 50);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioUrl, loadNextChunk]);

  useEffect(() => {
    prefetchedRef.current = false;
  }, [currentChunkIndex]);

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
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
              <div className="flex items-center gap-3">
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
              {totalChunks > 1 && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalChunks }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        goToChunk(i);
                        setTimeout(() => {
                          if (audioRef.current) {
                            audioRef.current.src =
                              useTTSStore.getState().audioUrl!;
                            audioRef.current.currentTime = 0;
                            audioRef.current.play();
                          }
                        }, 50);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentChunkIndex
                          ? "bg-gray-900 dark:bg-white"
                          : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-500"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {displayWords.length > 0 && (
              <div className="px-6 py-6 max-h-64 overflow-y-auto">
                <WordReader
                  key={audioUrl}
                  displayWords={displayWords}
                  sentenceIndices={sentenceIndices || []}
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
