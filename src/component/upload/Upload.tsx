import { useEffect, useState } from "react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaDownload, FaHeadphones } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { UploadHeader } from "./UploadHeader";
import { UploadInfo } from "./UploadInfo";
import { UploadButtons } from "./UploadButtons";
import { UploadTextarea } from "./UploadTextarea";
import { createPayment } from "../../services/pay";
import { useSearchParams } from "react-router-dom";

import {
  useGenerateAudioFromText,
  useGenerateAudioFromFile,
} from "../../hook/useState";

const AUDIO_STORAGE_KEY = "readya_audio_url";

export const Upload = () => {

  const [form, setForm] = useState({
    text: "",
    file: null as File | null,
    email: "",
  });


  const [ui, setUi] = useState(() => ({
    audioUrl: localStorage.getItem(AUDIO_STORAGE_KEY),
    words: [] as { word: string; start: number; end: number }[],
    isPaid: false,
  }));

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  const textAudio = useGenerateAudioFromText();
  const fileAudio = useGenerateAudioFromFile();

  const loading = textAudio.loading || fileAudio.loading;


  useEffect(() => {
    if (!orderId) return;

    const checkPayment = async () => {
      try {
        const res = await fetch(
          `https://readya-backend.onrender.com/payment/status/${orderId}/`,
        );

        const data = await res.json();

        if (data.payment_status === "paid") {
          setUi((prev) => ({ ...prev, isPaid: true }));
        }
      } catch (err) {
        console.error("Payment check failed", err);
      }
    };

    checkPayment();
  }, [orderId]);


  const handleGenerate = async () => {
    if (!ui.isPaid) {
      alert("გთხოვთ ჯერ გადაიხადოთ");
      return;
    }

    if (!form.email.trim()) {
      alert("გთხოვთ შეიყვანოთ ელ-ფოსტა");
      return;
    }

    if (!form.text.trim() && !form.file) {
      alert("გთხოვთ ჩასვით ტექსტი ან ატვირთოთ ფაილი");
      return;
    }

    try {
      const result = form.file
        ? await fileAudio.generateAudio({
            file: form.file,
            email: form.email,
          })
        : await textAudio.generateAudio({
            text: form.text,
            email: form.email,
          });

      setUi((prev) => ({
        ...prev,
        audioUrl: result.stream_url,
        words: result.words || [],
      }));

      localStorage.setItem(AUDIO_STORAGE_KEY, result.stream_url);

      setForm({
        text: "",
        file: null,
        email: form.email,
      });
    } catch {
      alert("დაფიქსირდა შეცდომა");
    }
  };



  const handleDownload = async () => {
    if (!ui.audioUrl) return;

    const res = await fetch(ui.audioUrl);
    const blob = await res.blob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `readya-audio-${Date.now()}.mp3`;
    a.click();

    URL.revokeObjectURL(url);
  };

  

  const handlePayment = async () => {
    if (!form.email.trim()) {
      alert("გთხოვთ შეიყვანოთ ელ-ფოსტა");
      return;
    }

    try {
      const data = await createPayment(form.email);

      if (data.payment_url) {
        window.location.href = data.payment_url;
      }
    } catch {
      alert("გადახდის შეცდომა");
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black sm:min-h-screen py-10 px-4 sm:py-16 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <UploadHeader />
        <UploadInfo />

        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="თქვენი ელ-ფოსტა"
          className="w-full bg-transparent border border-gray-600 rounded-2xl px-4 py-3 text-white mb-6"
        />

        <UploadButtons
          onFileSelect={(file) => setForm((prev) => ({ ...prev, file }))}
          selectedFileName={form.file?.name}
        />

        <UploadTextarea
          text={form.text}
          setText={(text) => setForm((prev) => ({ ...prev, text }))}
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={handleGenerate}
            disabled={loading || !ui.isPaid}
            className="bg-gray-800 text-gray-300 px-8 py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <IoChatboxEllipsesOutline />
            {loading ? "გენერირდება..." : "დააგენერირე"}
          </button>

          <button
            onClick={handlePayment}
            className="bg-purple-700 text-white px-8 py-3 rounded-full"
          >
            💳 გადაიხადე
          </button>
        </div>

        {ui.audioUrl && (
          <div className="relative p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <MdCancel
              className="absolute top-3 right-3 text-white text-3xl cursor-pointer"
              onClick={() => {
                localStorage.removeItem(AUDIO_STORAGE_KEY);

                setUi((prev) => ({
                  ...prev,
                  audioUrl: null,
                  words: [],
                }));
              }}
            />

            <div className="flex items-center gap-3 mb-4">
              <FaHeadphones className="text-purple-500 text-xl" />
              <h3 className="text-white font-bold">თქვენი აუდიო მზადაა</h3>
            </div>

            <audio controls className="w-full mb-4">
              <source src={ui.audioUrl} type="audio/mpeg" />
            </audio>

            <button
              onClick={handleDownload}
              className="bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2 mb-6"
            >
              <FaDownload />
              ჩამოტვირთვა
            </button>

            {ui.words.length > 0 && (
              <div className="p-4 bg-gray-900 rounded-xl border border-gray-700">
                <h4 className="text-white mb-3 font-semibold">
                  მარკირებით კითხვა
                </h4>

                <div className="flex flex-wrap gap-2 text-gray-300 leading-8">
                  {ui.words.map((w, i) => (
                    <span
                      key={i}
                      className="px-1 hover:bg-purple-600 hover:text-white rounded transition"
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
