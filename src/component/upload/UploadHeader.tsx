import { MdInsertPageBreak } from "react-icons/md";

export const UploadHeader = () => (
  <>
    <h2 className="text-white text-2xl sm:text-4xl font-bold mb-4">
      რისი მოსმენა გინდა?
    </h2>
    <p className="text-gray-400 text-sm sm:text-base mb-8">
      ატვირთე ნებისმიერი PDF, Word ფაილი ან{" "}
      <MdInsertPageBreak className="inline" /> ჩასვი ტექსტი.
    </p>
  </>
);
