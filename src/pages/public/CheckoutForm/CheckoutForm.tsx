import { useForm, type SubmitHandler } from "react-hook-form";
import { ControlledInput } from "@/pages/public/CheckoutForm/components";
import { checkoutFormSchema, type CheckoutFormValues } from "@/models";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./CheckoutForm.module.css";
import { ActionButton } from "@/components";
import { useRef } from "react";
import { userFullNameKey } from "@/utils";

interface Props {
  onSubmit: (data: CheckoutFormValues) => void;
  isSubmitting: boolean;
}

export const CheckoutForm = ({ onSubmit, isSubmitting }: Props) => {
  const wasBlurred = useRef(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: localStorage.getItem(userFullNameKey) ?? "",
    },
  });

  const handler: SubmitHandler<CheckoutFormValues> = (data) => {
    localStorage.setItem(userFullNameKey, data.fullName);
    onSubmit(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h2>Crear Pedido</h2>
          <p className={styles.indications}>
            Por favor indica a nombre de quién estará la orden. Tras crearla,
            verás un botón para ir a WhatsApp y acordar pago y retiro.
          </p>
        </div>

        <form onSubmit={handleSubmit(handler)} className={styles.form}>
          <div>
            <ControlledInput
              inputClassName={`${styles.input} ${errors.fullName ? styles.error : ""}`}
              name="fullName"
              control={control}
              label="Ingresa tu nombre completo"
              type="text"
              error={errors.fullName}
              onChange={() => {
                if (wasBlurred.current) {
                  trigger("fullName");
                }
              }}
              onBlur={() => {
                if (!wasBlurred.current) {
                  wasBlurred.current = true;
                  trigger("fullName");
                }
              }}
            />
          </div>
          <ActionButton
            content={isSubmitting ? "Creando..." : "Crear orden"}
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit(handler)}
          />
        </form>
      </div>
    </div>
  );
};
