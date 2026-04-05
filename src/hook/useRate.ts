import { useMutation, useQuery } from "@tanstack/react-query";
import {
  uploadDocument,
  generateVoice,
  getAudioStreamUrl,
} from "@/services/api";

export const useGenerateAudioFromText = () => {
  return useMutation({
    mutationFn: async ({
      text,
      email,
      document_id,
    }: {
      text: string;
      email: string;
      document_id: string;
    }) => {
      await uploadDocument(text, null, email, document_id);

      return await generateVoice(document_id);
    },
  });
};

export const useGenerateAudioFromFile = () => {
  return useMutation({
    mutationFn: async ({
      file,
      email,
      document_id,
    }: {
      file: File;
      email: string;
      document_id: string;
    }) => {
      await uploadDocument(undefined, file, email, document_id);

      return await generateVoice(document_id);
    },
  });
};

export const useGetAudio = (docId: string) => {
  return useQuery({
    queryKey: ["audio", docId],
    queryFn: () => getAudioStreamUrl(docId),
    enabled: !!docId,
  });
};
