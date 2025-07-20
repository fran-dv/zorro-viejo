import {
  Controller,
  type Control,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import styles from "./ControlledInput.module.css";

interface Props<T extends FieldValues> {
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
}: Props<T>) => {
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
