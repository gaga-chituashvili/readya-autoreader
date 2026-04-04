import { ModeSwitcher } from "@/component/common/ModeSwitcher";
import { useTranslation } from "react-i18next";
import { useAppStore } from "@/store/useAppStore";
import { useAuthStore } from "@/store/authStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";
import { SettingsModal } from "@/component/SettingsModal";
import { Button } from "@/component/ui/button";
import {
  uploadDocument,
  generateVoice,
  getAudioStreamUrl,
} from "@/services/api";
import { createDocumentId } from "@/utils/document";
import { useTTSStore } from "@/store/useTTSStore";
import ClipLoader from "react-spinners/ClipLoader";

export const TextToAudio = () => {
  const { t, i18n } = useTranslation("home");
  const { text, setText, selectedFile } = useAppStore();
  const { user } = useAuthStore();
  const { loading, audioUrl, error, words } = useTTSStore();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  const handleGenerate = async () => {
    if (!user) {
      useTTSStore.setState({ error: "Please login first" });
      return;
    }

    if (!text.trim() && !selectedFile) {
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
      console.log("📝 Generated docId:", docId);

      const uploadResult = await uploadDocument(
        text.trim() || undefined,
        selectedFile,
        user.email,
        docId,
      );
      console.log("✅ Upload result:", uploadResult);

      const voiceResult = await generateVoice(docId);
      console.log("🎵 Voice result:", voiceResult);

      const fullUrl = getAudioStreamUrl(docId);
      console.log("🔊 Stream URL:", fullUrl);
      useTTSStore.setState({ audioUrl: fullUrl });

      if (voiceResult.words && voiceResult.words.length > 0) {
        useTTSStore.setState({ words: voiceResult.words });
      }

      setText("");
      useAppStore.setState({ selectedFile: null });
    } catch (err: unknown) {
      console.error("❌ TTS ERROR:", err);
      useTTSStore.setState({
        error: (err as Error).message || "Something went wrong",
      });
    } finally {
      useTTSStore.setState({ loading: false });
    }
  };

  return (
    <section className="relative w-full py-24 flex justify-center bg-gray-100 dark:bg-black overflow-hidden">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <ModeSwitcher />
      </div>

      <div className="relative z-10 w-full max-w-xl bg-gray-200 dark:bg-gray-900 rounded-3xl p-8 pt-16 shadow-sm">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={5000}
            placeholder={t("textarea_placeholder")}
            className="w-full h-52 resize-none rounded-2xl border border-purple-400 bg-transparent p-4 outline-none focus:ring-2 focus:ring-purple-400 text-sm dark:text-white"
          />
          <div className="absolute bottom-2 right-4 text-xs text-gray-500 dark:text-gray-400">
            {text.length}/5000
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-[180px] rounded-full border-purple-400">
              <SelectValue placeholder={t("language_georgian")} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ka">{t("language_georgian")}</SelectItem>
              <SelectItem value="en">{t("language_english")}</SelectItem>
            </SelectContent>
          </Select>

          <SettingsModal />
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
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

        {audioUrl && (
          <div className="mt-6 p-4 bg-gray-800/50 dark:bg-gray-800 rounded-2xl border border-gray-700">
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              Your Audio is Ready
            </h3>

            <audio controls className="w-full mb-4">
              <source src={audioUrl} type="audio/mpeg" />
            </audio>

            {words.length > 0 && (
              <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <h4 className="text-white text-sm font-semibold mb-3">
                  Text (Highlighted Reading)
                </h4>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
