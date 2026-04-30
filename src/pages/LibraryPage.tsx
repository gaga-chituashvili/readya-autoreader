import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  FileText,
  FileImage,
  File,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { getDocuments, type Document } from "@/services/Libraryservice";
import { ClipLoader } from "react-spinners";

const API_URL = import.meta.env.VITE_API_URL;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

const FILE_TYPE_LABELS: Record<Document["file_type"], string> = {
  pdf: "pdf",
  docx: "docx",
  text: "txt",
  image: "image",
};

// ─── FileIcon ─────────────────────────────────────────────────────────────────

function FileIcon({ type }: { type: Document["file_type"] }) {
  if (type === "image")
    return (
      <div className="w-full h-full flex items-center justify-center bg-purple-50 rounded-xl">
        <FileImage size={32} className="text-purple-400" />
      </div>
    );
  if (type === "pdf")
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50 rounded-xl">
        <File size={32} className="text-red-400" />
      </div>
    );
  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-50 rounded-xl">
      <FileText size={32} className="text-blue-400" />
    </div>
  );
}

// ─── Player Modal ─────────────────────────────────────────────────────────────

type Word = { word: string; start: number; end: number };

interface PlayerModalProps {
  docId: string;
  onClose: () => void;
}

function PlayerModal({ docId, onClose }: PlayerModalProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);

  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/document/${docId}/`, {
          credentials: "include",
        });
        const data = await res.json();
        setAudioUrl(data.audio_url);
        setWords(data.words || []);
      } finally {
        setLoadingPlayer(false);
      }
    };
    load();
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
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  const handleWordClick = (start: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = start;
    audioRef.current.play();
  };

  // close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-white mb-5">Audio Reader</h2>

        {loadingPlayer ? (
          <div className="flex items-center justify-center h-40">
            <ClipLoader size={24} color="#fff" />
          </div>
        ) : !audioUrl ? (
          <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
            Audio not available
          </div>
        ) : (
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
                className="max-h-64 overflow-y-auto rounded-xl p-4 leading-8 text-base bg-gray-800 border border-white/10"
              >
                <div className="flex flex-wrap gap-x-1 gap-y-2">
                  {normalizedWords.map((w, i) => (
                    <span
                      key={i}
                      id={`word-${i}`}
                      onClick={() => handleWordClick(w.start)}
                      className={`cursor-pointer px-1 rounded transition-all duration-150 ${
                        i === activeIndex
                          ? "bg-yellow-300 text-black shadow"
                          : "text-gray-100 hover:bg-gray-700"
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
      </div>
    </div>
  );
}

// ─── DocumentCard ─────────────────────────────────────────────────────────────

function DocumentCard({
  doc,
  onOpen,
}: {
  doc: Document;
  onOpen: (id: string) => void;
}) {
  const label = doc.text_preview
    ? doc.text_preview.slice(0, 40) +
      (doc.text_preview.length > 40 ? "..." : "")
    : `${FILE_TYPE_LABELS[doc.file_type]} file`;

  const progress =
    doc.status === "done"
      ? "100%"
      : doc.status === "processing"
        ? "Processing..."
        : doc.status === "failed"
          ? "Failed"
          : "Pending";

  const progressColor =
    doc.status === "done"
      ? "text-gray-400"
      : doc.status === "failed"
        ? "text-red-400"
        : "text-blue-400";

  return (
    <div
      className="flex flex-col gap-2 cursor-pointer group"
      onClick={() => onOpen(doc.id)}
    >
      <div className="w-full aspect-[3/4] rounded-xl border border-black/[0.07] bg-white overflow-hidden group-hover:border-black/20 transition-colors">
        <FileIcon type={doc.file_type} />
      </div>
      <div>
        <p className="text-sm text-gray-800 font-medium leading-snug line-clamp-2">
          {label}
        </p>
        <p className={`text-xs mt-0.5 ${progressColor}`}>
          {progress} · {timeAgo(doc.created_at)} ·{" "}
          {FILE_TYPE_LABELS[doc.file_type]}
        </p>
      </div>
    </div>
  );
}

// ─── LibraryPage ──────────────────────────────────────────────────────────────

export const LibraryPage = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  useEffect(() => {
    getDocuments()
      .then(setDocs)
      .catch((e) => setError(e.message ?? "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-400">
        <Loader2 size={24} className="animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center gap-2 min-h-[400px] text-red-400 text-sm">
        <AlertCircle size={18} />
        {error}
      </div>
    );

  if (docs.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-2 text-gray-400">
        <FileText size={36} className="text-gray-200" />
        <p className="text-sm">No documents yet</p>
        <p className="text-xs text-gray-300">
          Generate something to see it here
        </p>
      </div>
    );

  return (
    <>
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {docs.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onOpen={setSelectedDocId} />
          ))}
        </div>
      </div>

      {selectedDocId && (
        <PlayerModal
          docId={selectedDocId}
          onClose={() => setSelectedDocId(null)}
        />
      )}
    </>
  );
};
