import { z } from "zod";

export const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .regex(/^[a-zA-Z\u00C0-\u017F\s'-]+$/, {
      message:
        "El nombre solo puede contener letras, espacios, guiones y apóstrofes",
    }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
