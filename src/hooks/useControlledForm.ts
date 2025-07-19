import { useRef } from "react";
import {
  useForm,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodTypeAny } from "zod";

export type ControlledFormOptions<T extends object> = Omit<
  UseFormProps<T>,
  "resolver"
> & {
  schema?: ZodTypeAny;
};

export function useControlledForm<T extends object>(
  options: ControlledFormOptions<T>,
): UseFormReturn<T> & { wasBlurredRef: React.RefObject<boolean> } {
  const wasBlurredRef = useRef(false);

  const form = useForm<T>({
    ...options,
    resolver: options.schema
      ? zodResolver(options.schema as ZodTypeAny)
      : undefined,
  });

  return { ...form, wasBlurredRef };
}
