import { useEffect, useState, useRef } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaDownload, FaHeadphones } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { UploadHeader } from "./UploadHeader";
import { UploadInfo } from "./UploadInfo";
import { UploadButtons } from "./UploadButtons";
import { UploadTextarea } from "./UploadTextarea";
import {
  generateAudioFromText,
  generateAudioFromFile,
} from "../../services/api";
import { createPayment } from "../../services/pay";
import { useSearchParams } from "react-router-dom";

export const Upload = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [words, setWords] = useState<any[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [isPaid, setIsPaid] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);

  // Check payment status
  useEffect(() => {
    if (!orderId) return;

    const checkPayment = async () => {
      setCheckingPayment(true);

      try {
        const res = await fetch(
          `https://readya-backend.onrender.com/payment/status/${orderId}/`,
        );

        const data = await res.json();

        if (data.payment_status === "paid" || data.can_upload) {
          setIsPaid(true);
        }
      } catch (err) {
        console.error("Payment check failed", err);
      } finally {
        setCheckingPayment(false);
      }
    };

    checkPayment();
  }, [orderId]);

  // Word highlighting sync with audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || words.length === 0) return;

    const handleTimeUpdate = () => {
      const time = audio.currentTime;

      const index = words.findIndex((w) => time >= w.start && time <= w.end);

      if (index !== -1) {
        setCurrentWordIndex(index);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [words]);

  const handleGenerate = async () => {
    if (!isPaid && !orderId) {
      setError("გთხოვთ ჯერ გადაიხადოთ");
      return;
    }

    if (!email.trim()) {
      setError("შეიყვანეთ ელფოსტა");
      return;
    }

    if (!text.trim() && !file) {
      setError("ჩასვით ტექსტი ან ატვირთეთ ფაილი");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const result = file
        ? await generateAudioFromFile(file, email, orderId!)
        : await generateAudioFromText(text, email, orderId!);

      console.log("✅ Result:", result);
      console.log("📝 Words count:", result.words?.length);

      const fullUrl = `https://readya-backend.onrender.com${result.stream_url}`;
      setAudioUrl(fullUrl);

      if (result.words && result.words.length > 0) {
        console.log("🎯 Setting words:", result.words);
        setWords(result.words);
      } else {
        console.log("⚠️ No words in response");
        setWords([]);
      }

      setSuccess(true);
      setText("");
      setFile(null);
    } catch (err: any) {
      console.error("❌ Error:", err);
      setError(err.message || "შეცდომა დაფიქსირდა");
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

  const handlePayment = async () => {
    if (!email.trim()) {
      setError("გთხოვთ შეიყვანოთ ელ-ფოსტა");
      return;
    }

    setError("");

    try {
      const data = await createPayment(email);

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        setError("გადახდის შექმნა ვერ მოხერხდა");
      }
    } catch {
      setError("გადახდის პროცესში მოხდა შეცდომა");
    }
  };

  const handleCloseAudio = () => {
    setAudioUrl(null);
    setWords([]);
    setCurrentWordIndex(-1);
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
            <p className="text-green-400 text-sm text-center md:text-left">
              <MdDone className="inline-block mr-2" />
              აუდიო წარმატებით შეიქმნა!
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={handleGenerate}
            disabled={loading || checkingPayment}
            className="bg-gray-800 text-gray-300 px-8 py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
          >
            <IoChatboxEllipsesOutline />
            {loading ? "გენერირდება..." : "დააგენერირე"}
          </button>

          {!isPaid && (
            <button
              onClick={handlePayment}
              className="bg-purple-700 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-purple-600 transition"
            >
              💳 გადაიხადე (5 GEL)
            </button>
          )}
        </div>

        {audioUrl && (
          <div className="relative p-4 sm:p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            {/* X ღილაკი კუთხეში */}
            <button
              onClick={handleCloseAudio}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 rounded-full transition"
              aria-label="Close audio player"
            >
              <IoMdClose className="text-white text-xl" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <FaHeadphones className="text-purple-500 text-xl sm:text-2xl" />
              <h3 className="text-white text-base sm:text-lg font-bold">
                თქვენი აუდიო მზადაა
              </h3>
            </div>

            <audio ref={audioRef} controls className="w-full mb-4">
              <source src={audioUrl} type="audio/mpeg" />
            </audio>

            <button
              onClick={handleDownload}
              className="bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-purple-600 transition mb-4"
            >
              <FaDownload />
              ჩამოტვირთვა
            </button>

            {words.length > 0 && (
              <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                  📝 ტექსტი (მარკირებული კითხვა)
                </h4>
                <div className="text-base sm:text-lg text-gray-300 flex flex-wrap leading-relaxed">
                  {words.map((w, i) => (
                    <span
                      key={i}
                      className={`mr-2 mb-1 transition-all duration-200 ${
                        currentWordIndex === i
                          ? "text-purple-400 font-bold scale-110 underline"
                          : "text-gray-300"
                      }`}
                    >
                      {w.word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
