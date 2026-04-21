import { url } from "@/api/config/url";

const API_URL = import.meta.env.VITE_API_URL;

const refreshAccessToken = async (): Promise<boolean> => {
  const res = await fetch(`${url}/token/refresh/`, {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
};

export const uploadDocument = async (
  text?: string,
  file?: File | null,
  email?: string,
  documentId?: string,
) => {
  const formData = new FormData();

  if (text) formData.append("text", text);
  if (file) formData.append("file", file);
  if (email) formData.append("email", email);
  if (documentId) formData.append("document_id", documentId);

  let res = await fetch(`${API_URL}/upload/`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) throw new Error("Session expired");

    res = await fetch(`${API_URL}/upload/`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
  }

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Upload failed");
  }

  return res.json();
};

export const generateVoice = async (docId: string) => {
  let res = await fetch(`${API_URL}/voice/${docId}/`, {
    method: "POST",
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) throw new Error("Session expired");

    res = await fetch(`${API_URL}/voice/${docId}/`, {
      method: "POST",
      credentials: "include",
    });
  }

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Voice generation failed");
  }

  return res.json();
};

export const getAudioStreamUrl = (docId: string) => {
  return `${API_URL}/stream/${docId}/`;
};
