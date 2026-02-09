import { useState } from "react";
import { useForm } from "react-hook-form";
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

type FormData = {
  email: string;
  text: string;
  file: FileList;
};

export const Upload = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const watchedText = watch("text");
  const watchedFile = watch("file");

  const onSubmit = async (data: FormData) => {
    const { email, text, file } = data;

    if (!text && !file?.length) {
      throw new Error("გთხოვთ ჩასვით ტექსტი ან ატვირთოთ ფაილი");
    }

    setSuccess(false);
    setAudioUrl("");

    let result;

    if (file?.length) {
      result = await generateAudioFromFile(file[0], email);
    } else {
      result = await generateAudioFromText(text, email);
    }

    const streamUrl = getAudioStreamUrl(result.id);
    setAudioUrl(streamUrl);
    setSuccess(true);

    reset();
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "audio.mp3";
    link.click();
  };

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <UploadHeader />
        <UploadInfo />

       
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="თქვენი ელ-ფოსტა"
              {...register("email", {
                required: "გთხოვთ შეიყვანოთ ელ-ფოსტა",
              })}
              className="w-full bg-transparent border border-gray-600 rounded-2xl px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <UploadButtons
            onFileSelect={(file) => {
              const dt = new DataTransfer();
              dt.items.add(file);
              reset({ file: dt.files }, { keepValues: true });
            }}
            selectedFileName={watchedFile?.[0]?.name}
          />

          <UploadTextarea
            text={watchedText || ""}
            setText={(value: string) =>
              reset({ text: value }, { keepValues: true })
            }
          />

          {errors.root && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{errors.root.message}</p>
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
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-800 text-gray-400 px-8 py-3 rounded-full flex items-center gap-2 mb-6 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <IoChatboxEllipsesOutline className="text-xl" />
            {isSubmitting ? "გენერირდება..." : "დააგენერირე"}
          </button>
        </form>

        {audioUrl && (
          <div className="mb-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <h3 className="text-white text-lg font-bold mb-4">
              🎧 თქვენი აუდიო მზადაა
            </h3>
            <audio controls className="w-full mb-4">
              <source src={audioUrl} type="audio/mpeg" />
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
