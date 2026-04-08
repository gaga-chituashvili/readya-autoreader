const API_URL = import.meta.env.VITE_API_URL;

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

  const res = await fetch(`${API_URL}/upload/`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Upload failed");
  }

  return res.json();
};
export const generateVoice = async (docId: string) => {
  const res = await fetch(`${API_URL}/voice/${docId}/`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Voice generation failed");
  }

  return res.json();
};

export const getAudioStreamUrl = (docId: string) => {
  return `${API_URL}/stream/${docId}/`;
};
