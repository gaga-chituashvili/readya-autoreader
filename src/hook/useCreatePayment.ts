import { useMutation } from "@tanstack/react-query";
import { createPayment } from "@/services/payment";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: ({ planId }: { planId: number }) => createPayment(planId),
  });
};
