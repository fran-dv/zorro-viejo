import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import styles from "./ControlledTextArea.module.css";
import type { ChangeEvent, FocusEvent, TextareaHTMLAttributes } from "react";

interface Props<T extends FieldValues>
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: FieldError;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
}

export const ControlledTextarea = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  className = "",
  onChange,
  onBlur,
  ...props
}: Props<T>) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            id={name}
            {...field}
            onChange={(event) => {
              field.onChange(event.target.value);
              onChange?.(event);
            }}
            onBlur={onBlur}
            className={`form-control ${error ? "invalid" : ""} ${className}`}
            {...props}
          />
        )}
      />
      <div className={styles.errorWrapper}>
        {error && <p className={styles.error}>{error.message}</p>}
      </div>
    </div>
  );
};
