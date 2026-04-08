import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { checkPaymentStatus } from "@/services/pay";
import { useAuthStore } from "@/store/authStore";
import {
  MdCheckCircle,
  MdHourglassEmpty,
  MdError,
  MdAutorenew,
} from "react-icons/md";
import { ROUTES } from "@/routes/paths";

const PaymentSuccess = () => {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  const { fetchUser } = useAuthStore();

  const [status, setStatus] = useState<
    "checking" | "paid" | "pending" | "error"
  >("checking");

  useEffect(() => {
    const orderId = search.order_id;

    if (!orderId) {
      setStatus("error");
      return;
    }

    let interval: ReturnType<typeof setInterval>;

    const checkPayment = async () => {
      try {
        const data = await checkPaymentStatus(orderId);

        if (data?.payment_status === "paid") {
          setStatus("paid");
          await fetchUser();
          clearInterval(interval);
        } else if (data?.payment_status === "pending") {
          setStatus("pending");
        } else {
          setStatus("error");
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Payment check error:", error);
        setStatus("error");
        clearInterval(interval);
      }
    };

    checkPayment();

    interval = setInterval(checkPayment, 3000);

    return () => clearInterval(interval);
  }, [search.order_id, fetchUser]); // ✅ dependency clean

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
        {status === "checking" && (
          <div className="space-y-4">
            <MdAutorenew className="animate-spin text-purple-500 mx-auto text-4xl" />
            <p className="text-gray-300 text-lg">მოწმდება გადახდა...</p>
          </div>
        )}

        {status === "paid" && (
          <div className="space-y-5">
            <MdCheckCircle className="text-green-500 mx-auto text-5xl" />
            <p className="text-white text-xl font-semibold">
              გადახდა წარმატებულია 🎉
            </p>
            <p className="text-gray-400 text-sm">
              თქვენი subscription აქტიურდა
            </p>

            <button
              onClick={() => navigate({ to: ROUTES.home })}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 py-3 rounded-xl font-semibold transition"
            >
              მთავარ გვერდზე დაბრუნება
            </button>
          </div>
        )}

        {status === "pending" && (
          <div className="space-y-4">
            <MdHourglassEmpty className="text-yellow-500 mx-auto text-4xl" />
            <p className="text-gray-300 text-lg">გადახდა დამუშავებაშია...</p>
            <p className="text-gray-500 text-sm">ავტომატურად განახლდება</p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-5">
            <MdError className="text-red-500 mx-auto text-5xl" />
            <p className="text-white text-xl font-semibold">
              დაფიქსირდა შეცდომა
            </p>

            <button
              onClick={() => navigate({ to: ROUTES.home })}
              className="w-full bg-red-600 hover:bg-red-500 py-3 rounded-xl transition"
            >
              მთავარ გვერდზე დაბრუნება
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
