interface UploadTextareaProps {
  text: string;
  setText: (text: string) => void;
}

export const UploadTextarea = ({ text, setText }: UploadTextareaProps) => {
  return (
    <div className="relative mb-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ჩასვი ტექსტი რისი მოსმენაც გინდა..."
        className="w-full h-28 sm:h-32 bg-transparent border border-gray-600 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white resize-none"
        maxLength={5000}
      />
      <span className="absolute bottom-4 right-6 text-gray-500 text-sm">
        {text.length}/5000
      </span>
    </div>
  );
};
