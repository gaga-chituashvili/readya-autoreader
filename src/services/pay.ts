
const API_URL = "https://readya-backend.onrender.com";


export const createPayment = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/payment/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Payment API error:", response.status, errorText);
      throw new Error(errorText || "Payment creation failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};



export const checkPaymentStatus = async (orderId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/payment/status/${orderId}/`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Payment status error:", response.status, errorText);
      throw new Error(errorText || "Payment status check failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking payment status:", error);
    throw error;
  }
};