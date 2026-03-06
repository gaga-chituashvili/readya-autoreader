import { useMutation,useQuery } from "@tanstack/react-query";
import { generateAudioFromText } from "../services/api";
import { generateAudioFromFile } from "../services/api";
import { getAudioStreamUrl } from "../services/api";

export const useGenerateAudioFromText = () => {
  return useMutation({
    mutationFn: ({ text, email }: { text: string; email: string }) =>
      generateAudioFromText(text, email),
  });
};

export const useGenerateAudioFromFile = () => {
  return useMutation({
    mutationFn: ({ file, email }: { file: File; email: string }) =>
      generateAudioFromFile(file, email),
  });
};

export const useGetAudio = (docId: string) => {
  return useQuery({
    queryKey: ["audio", docId],
    queryFn: () => getAudioStreamUrl(docId),
    enabled: !!docId,
  });
};
