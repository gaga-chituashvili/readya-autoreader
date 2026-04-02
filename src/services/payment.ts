const API_URL = "https://readya-backend.onrender.com";

export const createPayment = async (planId: number) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const res = await fetch(`${API_URL}/payment/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      plan_id: planId,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.detail || "Payment failed");
  }
  

  return data;
};

export const checkPaymentStatus = async (paymentId: string) => {
  try {
    const res = await fetch(`${API_URL}/payment/status/${paymentId}/`, {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Status API error:", data);
      throw new Error(data?.detail || "Failed to check payment status");
    }

    return data;
  } catch (error) {
    console.error("Check payment error:", error);
    throw error;
  }
};
