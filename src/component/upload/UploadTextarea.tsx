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
        className="w-full h-32 bg-transparent border border-gray-600 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 resize-none"
        maxLength={5000}
      />
      <span className="absolute bottom-4 right-6 text-gray-500 text-sm">
        {text.length}/5000
      </span>
    </div>
  );
};
