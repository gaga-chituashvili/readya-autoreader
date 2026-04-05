import { useMutation } from "@tanstack/react-query";
import { checkPaymentStatus } from "@/services/payment";

export const useCheckPayment = () => {
  return useMutation({
    mutationFn: checkPaymentStatus,
  });
};
