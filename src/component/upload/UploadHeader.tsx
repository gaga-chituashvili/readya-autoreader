import { MdInsertPageBreak } from "react-icons/md";
export const UploadHeader = () => {
  return (
    <>
      <h2 className="text-white text-4xl font-bold mb-4">
        რისი მოსმენა გინდა?
      </h2>
      <p className="text-gray-400 mb-8">
        ატვირთე ნებისმიერი PDF, Word ფაილი ან{" "}
        <MdInsertPageBreak className="inline-block" /> ჩასვი ტექსტი.
      </p>
    </>
  );
};
