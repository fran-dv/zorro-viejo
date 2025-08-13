import { BaseProductSchema, type Category } from "@/models";
import { z } from "zod";

const generalRequiredError = "Este campo es requerido";

export const getProductFormValuesSchema = (categories: Category[]) => {
  return BaseProductSchema.extend({
    id: z.number({ required_error: generalRequiredError }),
    categoryId: z
      .number({
        required_error: generalRequiredError,
        invalid_type_error: generalRequiredError,
      })
      .refine(
        (id) => categories.some((cat) => cat.id === id),
        `Categoría inválida. Categorías existentes: ${categories
          .map((cat) => cat.name)
          .join(", ")}`
      ),
    name: z
      .string({ required_error: generalRequiredError })
      .trim()
      .min(1, generalRequiredError)
      .max(100, "El nombre del producto debe tener menos de 100 caracteres"),
    price: z
      .number({
        invalid_type_error: "El precio debe ser un número",
        required_error: generalRequiredError,
      })
      .nonnegative("El precio del producto debe ser un número positivo")
      .min(1, "El precio debe ser mayor a 0"),
    offerPrice: z
      .number({ invalid_type_error: "El precio de oferta debe ser un número" })
      .nonnegative("El precio de oferta debe ser un número positivo")
      .optional(),
    description: z
      .string({ required_error: generalRequiredError })
      .trim()
      .min(
        25,
        "La descripción del producto debe tener al menos 25 caracteres."
      ),
    shortDescription: z
      .string({
        required_error: generalRequiredError,
      })
      .trim()
      .max(
        50,
        "La descripción breve del producto debe tener menos de 50 caracteres."
      ),
    slug: z
      .string({ required_error: generalRequiredError })
      .trim()
      .min(1, generalRequiredError)
      .max(100, "El slug del producto debe tener menos de 100 caracteres.")
      .regex(
        /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
        "El slug del producto solo puede contener letras, números y guiones"
      ),
    imageUrls: z
      .array(
        z
          .string()
          .url(
            "Asegúrate de que la URL de las imágenes sean válidas. Por ej.: https://ejemplo-imagen.jpg"
          ),
        { required_error: "Se requiere al menos una imagen" }
      )
      .min(1, "Se requiere al menos una imagen"),
    inStock: z.boolean({
      required_error: generalRequiredError,
      invalid_type_error: generalRequiredError,
    }),
    unitsInPackage: z
      .number({ required_error: generalRequiredError })
      .nonnegative("Debe ser un número positivo")
      .min(1, "Debe ser mayor a 0"),
    unitVolumeMl: z
      .string({ required_error: generalRequiredError })
      .max(50, "Debe ser menor a 50 caracteres"),
  });
};

export type ProductFormValues = z.infer<
  ReturnType<typeof getProductFormValuesSchema>
>;
