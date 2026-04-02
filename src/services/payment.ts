export const createPayment = async (planId: number, email: string) => {
  const res = await fetch(
    "https://readya-backend.onrender.com/payment/create/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_id: planId,
        email,
      }),
    },
  );

  if (!res.ok) {
    throw new Error("Payment creation failed");
  }

  return res.json();
};



export const checkPaymentStatus = async (documentId: string) => {
  const res = await fetch(
    `https://readya-backend.onrender.com/payment/status/${documentId}/`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch payment status");
  }

  return res.json();
};