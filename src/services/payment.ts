import { url } from "@/api/config/url";

export const createPayment = async (planId: number) => {
  const res = await fetch(`${url}/payment/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥
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
    const res = await fetch(`${url}/payment/status/${paymentId}/`, {
      method: "GET",
      credentials: "include",
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
