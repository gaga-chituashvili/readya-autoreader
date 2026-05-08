import { create } from "zustand";

type Word = { word: string; start: number; end: number };

interface Chunk {
  audioUrl: string;
  words: Word[];
  sentenceIndices: number[];
}

interface TTSState {
  loading: boolean;
  error: string | null;
  chunks: Chunk[];
  currentChunkIndex: number;
  totalChunks: number;
  docId: string | null;
  speed: number;
  audioUrl: string | null;
  words: Word[];
  sentenceIndices: number[];

  generate: (text: string, file: File | null, email: string) => Promise<void>;
  loadNextChunk: () => Promise<void>;
  goToChunk: (index: number) => void;
  setSpeed: (speed: number) => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useTTSStore = create<TTSState>((set, get) => ({
  loading: false,
  error: null,
  chunks: [],
  currentChunkIndex: 0,
  totalChunks: 0,
  docId: null,
  speed: 50,
  audioUrl: null,
  words: [],
  sentenceIndices: [],

  generate: async (text, file, email) => {
    set({ loading: true, error: null, chunks: [], currentChunkIndex: 0 });

    try {
      const formData = new FormData();
      const docId = crypto.randomUUID();
      formData.append("document_id", docId);
      formData.append("email", email);

      if (file) {
        formData.append("file", file);
      } else {
        formData.append("text", text);
      }

      const res = await fetch(`${API_URL}/upload/chunked/`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Generation failed");

      const data = await res.json();

      const firstChunk: Chunk = {
        audioUrl: data.audio_url,
        words: data.words ?? [],
        sentenceIndices: data.sentence_indices ?? [],
      };

      set({
        chunks: [firstChunk],
        currentChunkIndex: 0,
        totalChunks: data.total_chunks,
        docId: data.id,
        audioUrl: firstChunk.audioUrl,
        words: firstChunk.words,
        sentenceIndices: firstChunk.sentenceIndices,
        loading: false,
      });
    } catch (e: unknown) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  loadNextChunk: async () => {
    const { chunks, currentChunkIndex, totalChunks, docId } = get();
    const nextIndex = currentChunkIndex + 1;

    if (nextIndex >= totalChunks || !docId) return;
    if (chunks[nextIndex]) return;

    const poll = async (): Promise<Chunk> => {
      while (true) {
        const res = await fetch(
          `${API_URL}/document/${docId}/chunk/${nextIndex}/`,
          { credentials: "include" },
        );

        if (res.status === 202) {
          await new Promise((r) => setTimeout(r, 2000));
          continue;
        }

        if (!res.ok) throw new Error("Chunk load failed");

        const data = await res.json();
        return {
          audioUrl: data.audio_url,
          words: data.words ?? [],
          sentenceIndices: data.sentence_indices ?? [],
        };
      }
    };

    const chunk = await poll();
    set((state) => ({
      chunks: [...state.chunks, chunk],
    }));
  },

  goToChunk: (index: number) => {
    const { chunks } = get();
    const chunk = chunks[index];
    if (!chunk) return;
    set({
      currentChunkIndex: index,
      audioUrl: chunk.audioUrl,
      words: chunk.words,
      sentenceIndices: chunk.sentenceIndices,
    });
  },

  setSpeed: (speed) => set({ speed }),
}));
