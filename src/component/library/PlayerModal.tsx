import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners";

const API_URL = import.meta.env.VITE_API_URL;

type Word = { word: string; start: number; end: number };

interface DocumentDetail {
  stream_url: string | null;
  words: Word[];
}

async function fetchDocumentDetail(docId: string): Promise<DocumentDetail> {
  const res = await fetch(`${API_URL}/document/${docId}/`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load document");
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

    fetchDocumentDetail(docId)
      .then((data) => {
        if (cancelled) return;
        setAudioUrl(data.stream_url);
        setWords(data.words ?? []);
      })
      .catch((e: Error) => {
        if (cancelled) return;
        setError(e.message);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [docId]);

  const normalizedWords = useMemo(
    () =>
      words.map((w) => ({
        ...w,
        start: w.start > 50 ? w.start / 1000 : w.start,
        end: w.end > 50 ? w.end / 1000 : w.end,
      })),
    [words],
  );

  const handleTimeUpdate = useCallback(
    (currentTime: number) => {
      const OFFSET = 0.12;
      let left = 0,
        right = normalizedWords.length - 1,
        found = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const w = normalizedWords[mid];
        if (currentTime + OFFSET < w.start) right = mid - 1;
        else if (currentTime + OFFSET > w.end) left = mid + 1;
        else {
          found = mid;
          break;
        }
      }

      if (found !== activeIndex) setActiveIndex(found);
    },
    [normalizedWords, activeIndex],
  );

  useEffect(() => {
    if (activeIndex < 0) return;
    const el = document.getElementById(`word-${activeIndex}`);
    const container = containerRef.current;
    if (!el || !container) return;

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const targetScroll =
      container.scrollTop +
      (elRect.top - containerRect.top) -
      containerRect.height / 2 +
      elRect.height / 2;

    container.scrollTo({ top: targetScroll, behavior: "smooth" });
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

          <h2 className="text-lg font-semibold text-white mb-5">
            Audio Reader
          </h2>

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
              >
                <source src={audioUrl} type="audio/mpeg" />
              </audio>

              {normalizedWords.length > 0 && (
                <div
                  ref={containerRef}
                  className="max-h-64 overflow-y-auto rounded-xl p-4 leading-8 text-base bg-gray-800 dark:bg-gray-900 border border-white/10"
                >
                  <div className="flex flex-wrap gap-x-1 gap-y-2">
                    {normalizedWords.map((w, i) => (
                      <motion.span
                        key={i}
                        id={`word-${i}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleWordClick(w.start)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleWordClick(w.start)
                        }
                        className={`cursor-pointer px-1 rounded outline-none ${
                          i === activeIndex
                            ? "bg-yellow-300 text-black shadow"
                            : "text-gray-100 hover:bg-gray-700 focus-visible:ring-1 focus-visible:ring-yellow-300"
                        }`}
                        animate={
                          i === activeIndex ? { scale: 1.05 } : { scale: 1 }
                        }
                        transition={{ duration: 0.1 }}
                      >
                        {w.word}
                      </motion.span>
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
