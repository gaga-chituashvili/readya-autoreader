import { useEffect, useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaDownload, FaHeadphones } from "react-icons/fa";
import { UploadHeader } from "./UploadHeader";
import { UploadInfo } from "./UploadInfo";
import { UploadButtons } from "./UploadButtons";
import { UploadTextarea } from "./UploadTextarea";
import {
  generateAudioFromText,
  generateAudioFromFile,
  getAudioStreamUrl,
} from "../../services/api";
import { MdCancel } from "react-icons/md";

const AUDIO_STORAGE_KEY = "readya_audio_url";

export const Upload = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedAudioUrl = localStorage.getItem(AUDIO_STORAGE_KEY);
    if (savedAudioUrl) setAudioUrl(savedAudioUrl);
  }, []);

  const handleGenerate = async () => {
    if (!email.trim()) {
      setError("გთხოვთ შეიყვანოთ ელ-ფოსტა");
      return;
    }

    if (!text.trim() && !file) {
      setError("გთხოვთ ჩასვით ტექსტი ან ატვირთოთ ფაილი");
      return;
    }

    setLoading(true);
    setError("");
    setAudioUrl("");
    setSuccess(false);

    try {
      const result = file
        ? await generateAudioFromFile(file, email)
        : await generateAudioFromText(text, email);

      const streamUrl = getAudioStreamUrl(result.id);
      setAudioUrl(streamUrl);
      localStorage.setItem(AUDIO_STORAGE_KEY, streamUrl);
      setSuccess(true);
      setText("");
      setFile(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ ხელახლა.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!audioUrl) return;

    const res = await fetch(audioUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `readya-audio-${Date.now()}.mp3`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black sm:min-h-screen py-10 px-4 sm:py-16 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <UploadHeader />
        <UploadInfo />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="თქვენი ელ-ფოსტა"
          className="w-full bg-transparent border border-gray-600 rounded-2xl px-4 sm:px-6 py-3 text-white mb-6"
        />

        <UploadButtons onFileSelect={setFile} selectedFileName={file?.name} />

        <UploadTextarea text={text} setText={setText} />

        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-lg">
            <p className="text-green-400 text-sm">
              ✓ აუდიო წარმატებით დაგენერირდა!
            </p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-gray-800 text-gray-300 px-8 py-3 rounded-full flex items-center gap-2 mb-6 disabled:opacity-50"
        >
          <IoChatboxEllipsesOutline />
          {loading ? "გენერირდება..." : "დააგენერირე"}
        </button>

        {audioUrl && (
          <div className="relative p-4 sm:p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <MdCancel
              className="absolute top-0 right-0 text-white text-2xl mb-4"
              onClick={() => {
                localStorage.removeItem(AUDIO_STORAGE_KEY);
                setAudioUrl(null);
              }}
            />
            <div className="flex items-center gap-3 mb-4">
              <FaHeadphones className="text-purple-500 text-xl sm:text-2xl" />
              <h3 className="text-white text-base sm:text-lg font-bold">
                თქვენი აუდიო მზადაა
              </h3>
            </div>

            <audio controls className="w-full mb-4">
              <source src={audioUrl} type="audio/mpeg" />
            </audio>

            <button
              onClick={handleDownload}
              className="bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2"
            >
              <FaDownload />
              ჩამოტვირთვა
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
