import { useMutation, useQuery } from "@tanstack/react-query";
import {
  generateAudioFromText,
  generateAudioFromFile,
  getAudioStreamUrl,
} from "../services/api";

export const useGenerateAudioFromText = () => {
  return useMutation({
    mutationFn: ({
      text,
      email,
      document_id,
    }: {
      text: string;
      email: string;
      document_id: string;
    }) => generateAudioFromText(text, email, document_id),
  });
};

export const useGenerateAudioFromFile = () => {
  return useMutation({
    mutationFn: ({
      file,
      email,
      document_id,
    }: {
      file: File;
      email: string;
      document_id: string;
    }) => generateAudioFromFile(file, email, document_id),
  });
};

export const useGetAudio = (docId: string) => {
  return useQuery({
    queryKey: ["audio", docId],
    queryFn: () => getAudioStreamUrl(docId),
    enabled: !!docId,
  });
};
