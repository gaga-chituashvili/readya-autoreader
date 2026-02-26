const API_URL = "http://127.0.0.1:8000";

// --------------------
// CREATE PAYMENT
// --------------------
export const createPayment = async (email: string) => {
  try {
    const response = await fetch(`${API_URL}/create-payment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Payment creation failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

// --------------------
// VERIFY PAYMENT
// --------------------
export const verifyPayment = async (orderId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/verify-payment/?order_id=${orderId}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Payment verification failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};
