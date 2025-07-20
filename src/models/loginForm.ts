import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email("Por favor ingrese un correo válido. Por ej.: mail@ejemplo.com"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
