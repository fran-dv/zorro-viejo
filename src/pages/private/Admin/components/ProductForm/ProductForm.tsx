import { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import { type Product } from "@/models";
import type { FormAction } from "@refinedev/core";
import {
  ControlledFileInput,
  ControlledSelect,
  ControlledTextarea,
} from "./components";
import { getProductFormValuesSchema, compressImage } from "./utils";
import { useCategories, useControlledForm } from "@/hooks";
import { ActionButton, ControlledInput, ScrollToTop } from "@/components";
import { generateNumericId, generateSlug } from "@/utils";
import type { SubmitHandler } from "react-hook-form";
import { useUploadImages } from "@/pages/private/Admin/hooks";
import { WarnMessage } from "@/pages/private/Admin/components";

interface Props {
  initialValues?: Partial<Product>;
  action?: FormAction;
  onSubmit: (data: Product) => void;
  isPending?: boolean;
}

export const ProductForm = ({
  action = "create",
  initialValues,
  onSubmit,
  isPending,
}: Props) => {
  const { data } = useCategories();
  const categories = data?.sort((a, b) => a.id - b.id) ?? [];
  const ProductFormValuesSchema = getProductFormValuesSchema(categories);

  const [isLoading, setIsLoading] = useState(isPending ?? false);

  const defaultValues: Partial<Product> = {
    id: generateNumericId(),
    name: initialValues?.name ?? "",
    slug: initialValues?.name ? generateSlug(initialValues.name) : "",
    inStock: true,
    price: initialValues?.price ?? 0,
    offerPrice: initialValues?.offerPrice ?? 0,
    shortDescription: initialValues?.shortDescription ?? "",
    description: initialValues?.description ?? "",
    imageUrls: initialValues?.imageUrls ?? [""],
    unitsInPackage: initialValues?.unitsInPackage ?? 0,
    unitVolumeMl: initialValues?.unitVolumeMl ?? "",
    categoryId: initialValues?.categoryId ?? 0,
    ...(initialValues ? initialValues : {}),
  };

  const controlledMethods = useControlledForm<Product>({
    schema: ProductFormValuesSchema,
    defaultValues,
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [blobImages, setBlobImages] = useState<Blob[]>([]);

  const {
    upload,
    error: uploadImageError,
    isPending: isUploadPending,
  } = useUploadImages();

  useEffect(() => {
    setIsLoading(isUploadPending);
  }, [isUploadPending]);

  const handler: SubmitHandler<Product> = async (data) => {
    const urls = await upload({
      images: blobImages.map((blob, index) => ({
        blob,
        path: `${data.slug}.${index + 1}`,
      })),
    });

    onSubmit({
      ...data,
      imageUrls: urls,
    } as Product);
  };

  const {
    wasBlurredRef,
    control,
    formState: { errors },
    trigger,
    watch,
    setValue,
    handleSubmit,
  } = controlledMethods;

  const name = watch("name");

  useEffect(() => {
    if (name) {
      setValue("slug", generateSlug(name), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [name, setValue]);

  useEffect(() => {
    setValue("imageUrls", previewImages as [string, ...string[]]);
  }, [previewImages, setValue]);

  const handleSetImages = (files: File[] | null) => {
    if (!files) {
      setPreviewImages([]);
      return;
    }
    files.forEach(async (file) => {
      const { blob } = await compressImage(file);
      const imageUrl = URL.createObjectURL(blob).toString();
      setPreviewImages((prev) => [...prev, imageUrl]);
      setBlobImages((prev) => [...prev, blob]);
    });
  };

  return (
    <div className={styles.container}>
      {uploadImageError && (
        <>
          <ScrollToTop />
          <WarnMessage
            closable
            message="Hubo un error al subir las imágenes. Por favor, inténtalo de nuevo."
          />
        </>
      )}
      <form
        onSubmit={handleSubmit(handler)}
        className={styles.form}
        id="productForm"
      >
        <ControlledFileInput
          name="imageUrls"
          control={control}
          images={previewImages}
          setImages={handleSetImages}
          buttonText="Subir imágenes"
          accept="image/*"
          multiple
          disabled={isLoading}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("imageUrls");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("imageUrls");
            }
          }}
        />
        <ControlledInput
          name="id"
          inputClassName={`${styles.input} ${errors.id && styles.error}`}
          type="number"
          control={control}
          label="Id * (generado automáticamente)"
          error={errors.id}
          disabled
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("id");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("id");
            }
          }}
        />
        <ControlledInput
          inputClassName={`${styles.input} ${errors.name && styles.error}`}
          name="name"
          type="text"
          control={control}
          label="Nombre de producto *"
          error={errors.name}
          disabled={isLoading}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("name");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("name");
            }
          }}
        />
        <ControlledInput
          className={`${styles.input} ${errors.slug && styles.error}`}
          name="slug"
          type="text"
          control={control}
          label="Slug * (generado automáticamente)"
          error={errors.slug}
          disabled={isLoading}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("slug");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("slug");
            }
          }}
        />
        <ControlledInput
          inputClassName={`${styles.input} ${errors.price && styles.error}`}
          name="price"
          type="number"
          min={1}
          control={control}
          label="Precio *"
          error={errors.price}
          disabled={isLoading}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("price");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("price");
            }
          }}
        />
        <ControlledInput
          inputClassName={`${styles.input} ${errors.offerPrice && styles.error}`}
          name="offerPrice"
          type="number"
          min={1}
          control={control}
          label="Precio de oferta (opcional)"
          error={errors.offerPrice}
          disabled={isLoading}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("offerPrice");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("offerPrice");
            }
          }}
        />
        <ControlledTextarea
          className={`${styles.textarea} ${errors.description && styles.error}`}
          name="description"
          control={control}
          rows={10}
          label="Descripción *"
          error={errors.description}
          disabled={isLoading}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("description");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("description");
            }
          }}
        />
        <ControlledTextarea
          className={`${styles.textarea} ${errors.shortDescription && styles.error}`}
          name="shortDescription"
          control={control}
          rows={4}
          maxLength={50}
          label="Descripción breve (opcional. Máx. 50 caracteres)"
          error={errors.shortDescription}
          disabled={isLoading}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("shortDescription");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("shortDescription");
            }
          }}
        />

        <ControlledSelect
          name="categoryId"
          control={control}
          label="Categoría *"
          valueType="number"
          disabled={isLoading}
          options={categories.map((cat) => ({ name: cat.name, value: cat.id }))}
          error={errors.categoryId}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("categoryId");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("categoryId");
            }
          }}
        />

        <ControlledSelect
          name="inStock"
          control={control}
          label="En stock *"
          options={[
            { name: "En stock", value: true },
            { name: "Sin stock", value: false },
          ]}
          error={errors.inStock}
          valueType="boolean"
          disabled={isLoading}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("inStock");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("inStock");
            }
          }}
        />
        <ControlledInput
          inputClassName={`${styles.input} ${errors.unitsInPackage && styles.error}`}
          name="unitsInPackage"
          type="number"
          min={1}
          control={control}
          label="Unidades por paquete *"
          error={errors.unitsInPackage}
          disabled={isLoading}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("unitsInPackage");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("unitsInPackage");
            }
          }}
        />

        <ControlledInput
          inputClassName={`${styles.input} ${errors.unitVolumeMl && styles.error}`}
          name="unitVolumeMl"
          type="text"
          control={control}
          label="Volumen de unidad (en mililitros) *"
          error={errors.unitVolumeMl}
          disabled={isLoading}
          onChange={() => {
            if (wasBlurredRef.current) {
              trigger("unitVolumeMl");
            }
          }}
          onBlur={() => {
            if (!wasBlurredRef.current) {
              wasBlurredRef.current = true;
              trigger("unitVolumeMl");
            }
          }}
        />

        <ActionButton
          content={
            isLoading
              ? `${action === "create" ? "Creando" : "Actualizando"} producto...`
              : `${action === "create" ? "Crear" : "Actualizar"} producto`
          }
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit(handler)}
        />
      </form>
    </div>
  );
};
