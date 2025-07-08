export type FormattedPrice = string & { __brand: "FormattedPrice" };

export const formatPrice = (price: number): FormattedPrice => {
  return price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }) as FormattedPrice;
};

export const isFormattedPrice = (
  value: string | number,
): value is FormattedPrice => {
  return /^\$\s?\d{1,3}(\.\d{3})*$/.test(value.toString());
};
