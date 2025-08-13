import { RawProductResponseSchema, type RawProductResponse } from "@/models";
import { useImport, type HandleChangeType } from "@refinedev/core";
import { useEffect, useState, type InputHTMLAttributes } from "react";

export interface BulkImportError {
  error: string;
  rows: number[];
}

interface BulkProductsImportData {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  handleChange: HandleChangeType<unknown, unknown>;
  isLoading: boolean;
  errors: BulkImportError[];
}

const textWithCommaToStringArray = (text: string): [string, ...string[]] => {
  return text.split(",").map((item) => item.trim()) as [string, ...string[]];
};

const requiredColumns = Object.keys(RawProductResponseSchema.shape);

const formatError =
  "Error de formato en la fila: la fila contiene uno o más valores con formato incorrecto. Asegúrate de que precio, oferta y volumen sean números enteros; que en_stock sea true o false; que las URLs de imagen comiencen con http:// o https://; y que los campos de texto (nombre, descripción) no estén vacíos ni incluyan caracteres inválidos. Corrige estos valores e intenta de nuevo.";
const emptyError = `⚠️ Fila vacía, incompleta, o ausencia de uno o más campos requeridos. Asegúrate que tu CSV tiene las siguientes columnas: ${requiredColumns.join(", ")}.`;

const isValidRow = (row: Record<string, string>): boolean => {
  return Boolean(
    row.id &&
      row.id !== "" &&
      row.category_id &&
      row.category_id !== "" &&
      row.image_urls &&
      row.image_urls !== "" &&
      row.name &&
      row.name !== "" &&
      row.slug &&
      row.slug !== "" &&
      row.price &&
      row.price !== "" &&
      row.short_description &&
      row.short_description !== "" &&
      row.description &&
      row.description !== "" &&
      row.in_stock &&
      row.in_stock !== "" &&
      row.units_in_package &&
      row.units_in_package !== "" &&
      row.unit_volume_ml &&
      row.unit_volume_ml !== "",
  );
};

export const useBulkProductsImport = (): BulkProductsImportData => {
  const [errors, setErrors] = useState<BulkImportError[]>([]);

  const csvRowToRawProductResponse = (
    row: Record<string, string>,
    rowIndex: number,
  ): RawProductResponse | null => {
    let product: RawProductResponse;
    try {
      product = {
        id: parseInt(row.id),
        category_id: parseInt(row.category_id),
        name: row.name,
        slug: row.slug,
        price: parseInt(row.price),
        image_urls: (row.image_urls as string).includes(",")
          ? textWithCommaToStringArray(row.image_urls)
          : [row.image_urls as string],
        short_description: row.short_description,
        description: row.description,
        in_stock:
          (row.in_stock as string).toLowerCase() === "false" ||
          row.in_stock === "0"
            ? false
            : true,
        units_in_package: parseInt(row.units_in_package) ?? 1,
        unit_volume_ml: row.unit_volume_ml,
        offer_price: isNaN(parseInt(row.offer_price))
          ? 0
          : parseInt(row.offer_price),
      };
    } catch (err) {
      console.error("error in csvRowToRawProductResponse: ", err);

      setErrors((prev) => {
        const newMessage = emptyError;

        const existingGroup = prev.find((e) => e.error === newMessage);

        if (existingGroup) {
          return prev.map((e) =>
            e.error === newMessage ? { ...e, rows: [...e.rows, rowIndex] } : e,
          );
        }

        return [...prev, { error: newMessage, rows: [rowIndex] }];
      });
      return null;
    }

    const result = RawProductResponseSchema.safeParse(product);

    if (!result.success) {
      console.error("error parsing product: ", product);

      setErrors((prev) => {
        const newMessage = formatError;

        const existingGroup = prev.find((e) => e.error === newMessage);

        if (existingGroup) {
          return prev.map((e) =>
            e.error === newMessage ? { ...e, rows: [...e.rows, rowIndex] } : e,
          );
        }

        return [...prev, { error: newMessage, rows: [rowIndex] }];
      });
      return null;
    }

    return result.data;
  };

  const { handleChange, inputProps, isLoading } = useImport({
    resource: "products",
    batchSize: Number.MAX_SAFE_INTEGER,
    meta: { select: "*" },
    mapData: (row, idx): RawProductResponse | void => {
      const rowIndex = idx ? idx + 1 : 1;

      if (!isValidRow(row)) {
        console.warn("Invalid CSV row", row);
        setErrors((prev) => {
          const newMessage = emptyError;

          const existingGroup = prev.find((e) => e.error === newMessage);

          if (existingGroup) {
            return prev.map((e) =>
              e.error === newMessage
                ? { ...e, rows: [...e.rows, rowIndex] }
                : e,
            );
          }

          return [...prev, { error: newMessage, rows: [rowIndex] }];
        });
        return;
      }

      const product = csvRowToRawProductResponse(row, rowIndex);

      if (!product) {
        return;
      }

      return product;
    },
  });

  useEffect(() => {
    // Reset errors when loading starts
    if (isLoading) {
      setErrors([]);
    }
  }, [isLoading]);

  return {
    inputProps,
    handleChange,
    isLoading,
    errors,
  };
};
