import { type SubmitHandler } from "react-hook-form";
import { ControlledInput } from "@/components";
import { checkoutFormSchema, type CheckoutFormValues } from "@/models";
import styles from "./CheckoutForm.module.css";
import { ActionButton } from "@/components";
import { userFullNameKey } from "@/utils";
import { useControlledForm } from "@/hooks";

interface Props {
  onSubmit: (data: CheckoutFormValues) => void;
  isSubmitting: boolean;
}

export const CheckoutForm = ({ onSubmit, isSubmitting }: Props) => {
  const {
    wasBlurredRef,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useControlledForm<CheckoutFormValues>({
    schema: checkoutFormSchema,
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
                if (wasBlurredRef.current) {
                  trigger("fullName");
                }
              }}
              onBlur={() => {
                if (!wasBlurredRef.current) {
                  wasBlurredRef.current = true;
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
