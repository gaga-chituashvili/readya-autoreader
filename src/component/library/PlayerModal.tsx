import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";

const API_URL = import.meta.env.VITE_API_URL;

type Word = { word: string; start: number; end: number };

interface ChunkData {
  audio_url: string;
  words: Word[];
  sentence_indices: number[];
  total_chunks: number;
}

async function fetchChunk(docId: string, index: number): Promise<ChunkData> {
  const res = await fetch(`${API_URL}/document/${docId}/chunk/${index}/`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load chunk");
  return res.json();
}

interface PlayerModalProps {
  docId: string;
  onClose: () => void;
}

export function PlayerModal({ docId, onClose }: PlayerModalProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks, setTotalChunks] = useState(1);
  const [chunks, setChunks] = useState<Record<number, ChunkData>>({});

  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await fetchChunk(docId, 0);
        if (cancelled) return;
        setChunks({ 0: data });
        setAudioUrl(data.audio_url);
        setWords(data.words ?? []);
        setTotalChunks(data.total_chunks ?? 1);
      } catch (e: unknown) {
        if (cancelled) return;
        setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [docId]);

  const prefetchChunk = useCallback(
    async (index: number) => {
      if (index >= totalChunks || chunks[index]) return;
      try {
        const data = await fetchChunk(docId, index);
        setChunks((prev) => ({ ...prev, [index]: data }));
      } catch {
        /* silent */
      }
    },
    [chunks, docId, totalChunks],
  );

  const goToChunk = useCallback(
    (index: number, autoPlay = false) => {
      const chunk = chunks[index];
      if (!chunk) return;

      setCurrentChunk(index);
      setAudioUrl(chunk.audio_url);
      setWords(chunk.words ?? []);
      setActiveIndex(-1);

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = chunk.audio_url;
          audioRef.current.currentTime = 0;
          if (autoPlay) audioRef.current.play();
        }
      }, 50);
    },
    [chunks],
  );

  const handleTimeUpdate = useCallback(
    (currentTime: number) => {
      const w = words;
      if (!w.length) return;

      let found = -1;

      if (currentTime >= w[0].start) {
        if (currentTime >= w[w.length - 1].end) {
          found = w.length - 1;
        } else {
          let lo = 0,
            hi = w.length - 1;
          while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (currentTime < w[mid].start) hi = mid - 1;
            else if (currentTime >= w[mid].end) lo = mid + 1;
            else {
              found = mid;
              break;
            }
          }

          if (found === -1) found = lo > 0 ? lo - 1 : -1;
        }
      }

      if (found !== activeIndex) setActiveIndex(found);

      const audio = audioRef.current;
      if (audio?.duration) {
        const p = currentTime / audio.duration;
        if (p >= 0.7) prefetchChunk(currentChunk + 1);
      }
    },
    [words, activeIndex, currentChunk, prefetchChunk],
  );

  const handleEnded = useCallback(() => {
    const nextIndex = currentChunk + 1;
    if (nextIndex >= totalChunks) return;

    const tryPlay = () => {
      if (chunks[nextIndex]) {
        goToChunk(nextIndex, true);
      } else {
        setTimeout(tryPlay, 500);
      }
    };
    tryPlay();
  }, [currentChunk, totalChunks, chunks, goToChunk]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const el = document.getElementById(`modal-word-${activeIndex}`);
    const container = containerRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const isVisible =
      elRect.top >= containerRect.top && elRect.bottom <= containerRect.bottom;
    if (!isVisible) {
      container.scrollTo({
        top:
          container.scrollTop +
          (elRect.top - containerRect.top) -
          containerRect.height / 2 +
          elRect.height / 2,
        behavior: "instant",
      });
    }
  }, [activeIndex]);

  const handleWordClick = (start: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = start;
    audioRef.current.play();
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Audio Reader"
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdrop}
      >
        <motion.div
          className="w-full max-w-2xl bg-gray-900 dark:bg-gray-950 border border-white/10 rounded-2xl p-6 shadow-2xl relative"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <button
            onClick={onClose}
            aria-label="Close player"
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white">Audio Reader</h2>
            {totalChunks > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToChunk(currentChunk - 1, false)}
                  disabled={currentChunk === 0}
                  className="text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-xs text-gray-400">
                  {currentChunk + 1} / {totalChunks}
                </span>
                <button
                  onClick={() => goToChunk(currentChunk + 1, false)}
                  disabled={
                    currentChunk >= totalChunks - 1 || !chunks[currentChunk + 1]
                  }
                  className="text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {loading && (
            <div className="flex items-center justify-center h-40">
              <ClipLoader size={24} color="#fff" />
            </div>
          )}

          {!loading && error && (
            <div className="flex items-center justify-center h-40 text-red-400 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && !audioUrl && (
            <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
              Audio not available
            </div>
          )}

          {!loading && !error && audioUrl && (
            <>
              <audio
                ref={audioRef}
                controls
                className="w-full mb-5"
                onTimeUpdate={(e) =>
                  handleTimeUpdate(e.currentTarget.currentTime)
                }
                onEnded={handleEnded}
              >
                <source src={audioUrl} type="audio/mpeg" />
              </audio>

              {words.length > 0 && (
                <div
                  ref={containerRef}
                  className="max-h-64 overflow-y-auto rounded-xl p-4 leading-8 text-base bg-gray-800 dark:bg-gray-900 border border-white/10"
                >
                  <div className="flex flex-wrap gap-x-1 gap-y-2">
                    {words.map((w, i) => (
                      <span
                        key={i}
                        id={`modal-word-${i}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleWordClick(w.start)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleWordClick(w.start)
                        }
                        className={`cursor-pointer px-1 rounded outline-none transition-colors ${
                          i === activeIndex
                            ? "bg-yellow-300 text-black shadow"
                            : "text-gray-100 hover:bg-gray-700 focus-visible:ring-1 focus-visible:ring-yellow-300"
                        }`}
                      >
                        {w.word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
