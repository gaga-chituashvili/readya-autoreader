import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { checkPaymentStatus } from "../services/pay";
import {
  MdCheckCircle,
  MdHourglassEmpty,
  MdError,
  MdAutorenew,
} from "react-icons/md";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    "checking" | "paid" | "pending" | "error"
  >("checking");

  useEffect(() => {
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      setStatus("error");
      return;
    }

    const checkPayment = async () => {
      try {
        const data = await checkPaymentStatus(orderId);

        if (data?.payment_status === "paid") {
          setStatus("paid");
        } else if (data?.payment_status === "pending") {
          setStatus("pending");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Payment check error:", error);
        setStatus("error");
      }
    };

    checkPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-xl gap-6">
      {status === "checking" && (
        <p>
          <MdAutorenew className="animate-spin inline-block mr-2 text-purple-500" />
          მოწმდება გადახდა...
        </p>
      )}

      {status === "paid" && (
        <>
          <p>
            <MdCheckCircle className="text-green-500 inline-block mr-2" />
            გადახდა წარმატებულია!
          </p>

          <button
            onClick={() =>
              navigate(`/?order_id=${searchParams.get("order_id")}`)
            }
            className="bg-purple-700 hover:bg-purple-600 px-6 py-3 rounded-full transition"
          >
            მთავარ გვერდზე დაბრუნება
          </button>
        </>
      )}

      {status === "pending" && (
        <>
          <p>
            <MdHourglassEmpty className="text-yellow-500 inline-block mr-2" />
            გადახდა ჯერ დამუშავებაშია...
          </p>

          <button
            onClick={() => window.location.reload()}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full transition"
          >
            განახლება
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <p>
            <MdError className="text-red-500 inline-block mr-2" />
            დაფიქსირდა შეცდომა
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-purple-700 hover:bg-purple-600 px-6 py-3 rounded-full transition"
          >
            მთავარ გვერდზე დაბრუნება
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;