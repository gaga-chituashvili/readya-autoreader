
import { url } from "@/api/config/url";

export interface Document {
  id: string;
  file_type: "pdf" | "docx" | "text" | "image";
  status: "processing" | "done" | "failed" | "pending_payment";
  created_at: string;
  mp3_url: string | null;
  text_preview: string | null;
}

const refreshAccessToken = async (): Promise<boolean> => {
  const res = await fetch(`${url}/token/refresh/`, {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
};

export const getDocuments = async (): Promise<Document[]> => {
  let res = await fetch(`${url}/documents/`, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) throw new Error("Session expired");

    res = await fetch(`${url}/documents/`, {
      method: "GET",
      credentials: "include",
    });
  }

  const data = await res.json();

  if (!res.ok) throw data;

  return data;
};
