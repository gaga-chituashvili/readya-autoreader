import { useAppStore } from "@/store/useAppStore";
import { useTTSStore } from "@/store/useTTSStore";
import {
  uploadDocument,
  generateVoice,
  getAudioStreamUrl,
} from "@/services/api";
import { createDocumentId } from "@/utils/document";

export const useGenerateAudio = () => {
  const { setText } = useAppStore();

  const generate = async (
    text: string,
    file: File | null,
    email: string,
    t: (key: string) => string,
  ) => {
    if (!text.trim() && !file) {
      useTTSStore.setState({ error: t("error_empty_input") });
      return;
    }

    useTTSStore.setState({
      loading: true,
      error: "",
      audioUrl: null,
      words: [],
    });

    try {
      const docId = createDocumentId();

      await uploadDocument(text.trim() || undefined, file, email, docId);

      const voiceResult = await generateVoice(docId);

      const fullUrl = getAudioStreamUrl(docId);

      useTTSStore.setState({
        audioUrl: fullUrl,
        words: voiceResult.words || [],
      });

      setText("");
      useAppStore.setState({ selectedFile: null });
    } catch (err: unknown) {
      useTTSStore.setState({
        error: (err as Error).message || "Something went wrong",
      });
    } finally {
      useTTSStore.setState({ loading: false });
    }
  };

  return { generate };
};
