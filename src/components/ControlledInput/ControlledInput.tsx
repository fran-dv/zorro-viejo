import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import styles from "./ControlledInput.module.css";
import type { InputHTMLAttributes } from "react";

export interface ControlledInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
  inputClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  error,
  inputClassName = "",
  onChange,
  onBlur,
  ...otherProps
}: ControlledInputProps<T>) => {
  const inputProps = otherProps as InputHTMLAttributes<HTMLInputElement>;
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
              if (type === "number") {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
              onChange?.(event);
            }}
            onBlur={onBlur}
            className={`form-control ${error ? "invalid" : ""} ${inputClassName}`}
            {...inputProps}
          />
        )}
      />
      <div className={styles.errorWrapper}>
        {error && <p className={styles.error}>{error.message}</p>}
      </div>
    </div>
  );
};
