import { useEffect, useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { UploadHeader } from "./UploadHeader";
import { UploadInfo } from "./UploadInfo";
import { UploadButtons } from "./UploadButtons";
import { UploadTextarea } from "./UploadTextarea";
import {
  generateAudioFromText,
  generateAudioFromFile,
  getAudioStreamUrl,
} from "../../services/api";

import { FaHeadphones } from "react-icons/fa";

const AUDIO_STORAGE_KEY = "readya_audio_url";

export const Upload = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedAudioUrl = localStorage.getItem(AUDIO_STORAGE_KEY);
    if (savedAudioUrl) {
      setAudioUrl(savedAudioUrl);
    }
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
      let result;

      if (file) {
        result = await generateAudioFromFile(file, email);
      } else {
        result = await generateAudioFromText(text, email);
      }

      const streamUrl = getAudioStreamUrl(result.id);

      setAudioUrl(streamUrl);
      setSuccess(true);

      localStorage.setItem(AUDIO_STORAGE_KEY, streamUrl);

      setText("");
      setFile(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("დაფიქსირდა შეცდომა. გთხოვთ სცადოთ ხელახლა.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!audioUrl) return;

    try {
      const response = await fetch(audioUrl);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `readya-audio-${Date.now()}.mp3`;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <UploadHeader />
        <UploadInfo />

        <div className="mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="თქვენი ელ-ფოსტა"
            className="w-full bg-transparent border border-gray-600 rounded-2xl px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>

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
              ✓ აუდიო წარმატებით დაგენერირდა! ასევე გამოგეგზავნათ ელ-ფოსტაზე.
            </p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-gray-800 text-gray-400 px-8 py-3 rounded-full flex items-center gap-2 mb-6 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <IoChatboxEllipsesOutline className="text-xl" />
          {loading ? "გენერირდება..." : "დააგენერირე"}
        </button>

        {audioUrl && (
          <div className="mb-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <div className="flex items-center gap-3">
              <FaHeadphones className="text-purple-500 text-2xl" />
              <h3 className="text-white text-lg font-bold mb-4">
                თქვენი აუდიო მზადაა
              </h3>
            </div>
            <audio controls className="w-full mb-4">
              <source src={audioUrl} type="audio/mpeg" />
              თქვენი ბრაუზერი არ უჭერს მხარს აუდიო პლეერს
            </audio>
            <button
              onClick={handleDownload}
              className="bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-purple-600 transition-all"
            >
              <FaDownload />
              ჩამოტვირთვა
            </button>
          </div>
        )}

        <p className="text-gray-500 text-sm">
          *სისტემა მუშაობს სატესტო რეჟიმში
        </p>
      </div>
    </section>
  );
};
