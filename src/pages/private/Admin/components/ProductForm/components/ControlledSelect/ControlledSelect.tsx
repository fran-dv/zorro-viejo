import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import styles from "./ControlledSelect.module.css";
import type { ChangeEvent, FocusEvent } from "react";
import type { SelectHTMLAttributes } from "react";

interface Props<T extends FieldValues>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: { name: string; value: string | number | boolean }[];
  error?: FieldError;
  className?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: FocusEvent<HTMLSelectElement>) => void;
  valueType?: "number" | "string" | "boolean";
}

export const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  error,
  className = "",
  placeholder = "Seleccionar...",
  onChange,
  onBlur,
  valueType = "string",
  ...props
}: Props<T>) => {
  return (
    <div className={styles.container}>
      <label htmlFor={String(name)}>{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            id={String(name)}
            {...field}
            value={field.value ?? ""}
            onChange={(e) => {
              const val =
                e.target.value === ""
                  ? ""
                  : valueType === "string"
                    ? e.target.value
                    : valueType === "number"
                      ? Number(e.target.value)
                      : valueType === "boolean"
                        ? Boolean(e.target.value === "true")
                        : e.target.value;
              field.onChange(val);
              onChange?.(e);
            }}
            onBlur={(e) => {
              field.onBlur();
              onBlur?.(e);
            }}
            className={`form-control ${error ? "invalid" : ""} ${className}`}
            {...props}
          >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)}>
                {opt.name}
              </option>
            ))}
          </select>
        )}
      />

      <div className={styles.errorWrapper}>
        {error && <p className="error">{error.message}</p>}
      </div>
    </div>
  );
};
