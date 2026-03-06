import { useMutation, useQuery } from "@tanstack/react-query";
import {
  generateAudioFromText,
  generateAudioFromFile,
  getAudioStreamUrl,
} from "../services/api";


export const useGenerateAudioFromText = () => {
  const mutation = useMutation({
    mutationFn: ({ text, email }: { text: string; email: string }) =>
      generateAudioFromText(text, email),
  });

  return {
    generateAudio: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};


export const useGenerateAudioFromFile = () => {
  const mutation = useMutation({
    mutationFn: ({ file, email }: { file: File; email: string }) =>
      generateAudioFromFile(file, email),
  });

  return {
    generateAudio: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};



export const useGetAudio = (docId: string | null) => {
  return useQuery({
    queryKey: ["audio", docId],
    queryFn: () => getAudioStreamUrl(docId as string),
    enabled: !!docId,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });
};
