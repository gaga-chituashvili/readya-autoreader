import { create } from "zustand";
import { persist } from "zustand/middleware";

import { uploadDocument, generateVoice } from "@/services/api";
import { createDocumentId } from "@/utils/document";

type TTSState = {
  loading: boolean;
  audioUrl: string | null;
  error: string;
  words: unknown[];
  originalText: string;
  sentenceIndices: number[];
  speed: number;
  setSpeed: (speed: number) => void;
  generate: (text: string, file: File | null, email: string) => Promise<void>;
  reset: () => void;
};

export const useTTSStore = create<TTSState>()(
  persist(
    (set) => ({
      loading: false,
      audioUrl: null,
      error: "",
      words: [],
      originalText: "",
      sentenceIndices: [],
      speed: 50,
      setSpeed: (speed) => set({ speed }),

      generate: async (text, file, email) => {
        set({
          loading: true,
          error: "",
          audioUrl: null,
          words: [],
          originalText: "",
          sentenceIndices: [],
        });

        try {
          const docId = createDocumentId();
          await uploadDocument(text, file, email, docId);
          const voiceRes = await generateVoice(docId);
          set({
            audioUrl: voiceRes.stream_url,
            words: voiceRes.words || [],
            originalText: voiceRes.original_text || text,
            sentenceIndices: voiceRes.sentence_indices || [],
          });
        } catch (err: unknown) {
          set({ error: (err as Error).message || "Something went wrong" });
        } finally {
          set({ loading: false });
        }
      },

      reset: () =>
        set({
          loading: false,
          audioUrl: null,
          error: "",
          words: [],
          originalText: "",
          sentenceIndices: [],
        }),
    }),
    {
      name: "tts-storage",
      partialize: (state) => ({
        audioUrl: state.audioUrl,
        words: state.words,
        originalText: state.originalText,
        sentenceIndices: state.sentenceIndices,
      }),
    },
  ),
);
