const API_URL = "https://readya-backend.onrender.com";

export const generateAudioFromText = async (
  _text: string,
  _email: string,
  orderId: string,
) => {
  try {
    // POST to /voice/{orderId}/ endpoint
    const response = await fetch(`${API_URL}/voice/${orderId}/`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate audio");
    }

    const data = await response.json();

    console.log("📦 API Response:", data);
    console.log("📝 Words:", data.words);

    return {
      stream_url: data.stream_url,
      words: data.words || [],
    };
  } catch (error) {
    console.error("❌ Error generating audio:", error);
    throw error;
  }
};

export const generateAudioFromFile = async (
  _file: File,
  _email: string,
  orderId: string,
) => {
  try {
    // POST to /voice/{orderId}/ endpoint
    const response = await fetch(`${API_URL}/voice/${orderId}/`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate audio");
    }

    const data = await response.json();

    console.log("📦 API Response:", data);
    console.log("📝 Words:", data.words);

    return {
      stream_url: data.stream_url,
      words: data.words || [],
    };
  } catch (error) {
    console.error("❌ Error generating audio:", error);
    throw error;
  }
};

export const getAudioStreamUrl = (docId: string) => {
  return `${API_URL}/stream/${docId}/`;
};
