import { useMutation } from "@tanstack/react-query";
import { createPayment } from "@/services/payment";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: ({ planId, email }: { planId: number; email: string }) =>
      createPayment(planId, email),
  });
};
