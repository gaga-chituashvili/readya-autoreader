const API_URL = "https://readya-backend.onrender.com";

export const generateAudioFromText = async (
  text: string,
  email: string,
  document_id: string,
) => {
  try {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("email", email);
    formData.append("document_id", document_id);

    const response = await fetch(`${API_URL}/upload/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate audio");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
};

export const generateAudioFromFile = async (
  file: File,
  email: string,
  document_id: string,
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("document_id", document_id);

    const response = await fetch(`${API_URL}/upload/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate audio");
    }

    return await response.json();
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
};

export const getAudioStreamUrl = (docId: string) => {
  return `${API_URL}/stream/${docId}/`;
};
