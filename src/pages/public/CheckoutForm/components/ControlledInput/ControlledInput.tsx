import { Controller, type Control, type FieldError } from "react-hook-form";
import styles from "./ControlledInput.module.css";
import type { CheckoutFormValues } from "@/models";

interface Props {
  name: keyof CheckoutFormValues;
  control: Control<CheckoutFormValues>;
  label: string;
  type?: string;
  error?: FieldError;
  inputClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const ControlledInput = ({
  name,
  control,
  label,
  type,
  error,
  inputClassName = "",
  onChange,
  onBlur,
}: Props) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            onChange={(event) => {
              field.onChange(event);
              onChange?.(event);
            }}
            onBlur={onBlur}
            className={`form-control ${error ? "invalid" : ""} ${inputClassName}`}
          />
        )}
      />
      <div className={styles.errorWrapper}>
        {error && <p className="error">{error.message}</p>}
      </div>
    </div>
  );
};
