import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useParams } from "@tanstack/react-router";
import { useTTSStore } from "@/store/useTTSStore";

import { ClipLoader } from "react-spinners";

type Word = {
  word: string;
  start: number;
  end: number;
};

export const PlayerPage = () => {
  const { docId } = useParams({ strict: false });

  const { audioUrl, words } = useTTSStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const normalizedWords: Word[] = useMemo(() => {
    return (words as Word[]).map((w) => ({
      ...w,
      start: w.start > 50 ? w.start / 1000 : w.start,
      end: w.end > 50 ? w.end / 1000 : w.end,
    }));
  }, [words]);

  useEffect(() => {
    if (!docId) return;

    const load = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/document/${docId}/`,
      );
      const data = await res.json();

      useTTSStore.setState({
        audioUrl: data.audio_url,
        words: data.words || [],
      });
    };

    load();
  }, [docId]);
  // ⚡ faster lookup (binary-ish)
  const handleTimeUpdate = useCallback(
    (currentTime: number) => {
      const OFFSET = 0.12;

      let left = 0;
      let right = normalizedWords.length - 1;
      let found = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const w = normalizedWords[mid];

        if (currentTime + OFFSET < w.start) {
          right = mid - 1;
        } else if (currentTime + OFFSET > w.end) {
          left = mid + 1;
        } else {
          found = mid;
          break;
        }
      }

      if (found !== activeIndex) {
        setActiveIndex(found);
      }
    },
    [normalizedWords, activeIndex],
  );

  useEffect(() => {
    if (activeIndex < 0) return;

    const el = document.getElementById(`word-${activeIndex}`);
    if (el && containerRef.current) {
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

  if (!audioUrl) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-lg">
        <ClipLoader size={20} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold mb-6 tracking-tight">
           Audio Reader
        </h1>

        <audio
          ref={audioRef}
          controls
          className="w-full mb-6"
          onTimeUpdate={(e) => handleTimeUpdate(e.currentTarget.currentTime)}
        >
          <source src={audioUrl} type="audio/mpeg" />
        </audio>

        {normalizedWords.length > 0 && (
          <div
            ref={containerRef}
            className="
    max-h-[400px] overflow-y-auto rounded-xl p-6 leading-8 text-lg

    bg-gray-100 text-gray-900
    dark:bg-gray-900 dark:text-gray-100

    border border-gray-200 dark:border-gray-700
  "
          >
            <div className="flex flex-wrap gap-x-1 gap-y-2">
              {normalizedWords.map((w, i) => (
                <span
                  key={i}
                  id={`word-${i}`}
                  onClick={() => handleWordClick(w.start)}
                  className={`
          cursor-pointer px-1 rounded transition-all duration-150

          ${
            i === activeIndex
              ? "bg-yellow-300 text-black dark:bg-yellow-400 dark:text-black shadow"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
          }
        `}
                >
                  {w.word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
