import { ToolbarButton } from "@/pages/private/Admin/components/ToolbarButton/ToolbarButton";
import { FileUp, Trash2 } from "lucide-react";
import { Controller, type Control } from "react-hook-form";
import { useRef } from "react";
import { ImagesCarousel } from "@/components";
import { ProductImage } from "@/components/ProductImage/ProductImage";
import type { Product } from "@/models";
import styles from "./ControlledFileInput.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<Product>;
  buttonText: string;
  images: string[];
  setImages: (files: File[] | null) => void;
}

export const ControlledFileInput = ({
  control,
  images,
  setImages,
  buttonText,
  ...props
}: Props) => {
  const imagesInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.container}>
      <ToolbarButton
        icon={<FileUp />}
        onClick={(e) => {
          e.preventDefault();
          imagesInputRef.current?.click();
        }}
        className={styles.ToolbarButton}
        type="button"
      >
        {buttonText}
      </ToolbarButton>
      {images.length > 0 && (
        <div className={styles.imagesPreviewWrapper}>
          <ToolbarButton
            icon={<Trash2 />}
            onClick={() => setImages(null)}
            className={styles.deleteImagesButton}
          >
            Eliminar imágenes subidas
          </ToolbarButton>
          <ImagesCarousel
            images={images.map((img) => (
              <ProductImage imageUrl={img} />
            ))}
          />
        </div>
      )}
      <Controller
        name="imageUrls"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input
              {...props}
              id={field.name}
              hidden
              ref={imagesInputRef}
              type="file"
              onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                field.onChange(files);
                setImages(files);
                props.onChange?.(e);
              }}
              onBlur={(e) => {
                field.onBlur();
                props.onBlur?.(e);
              }}
            />

            <div className={styles.errorWrapper}>
              {fieldState.error && (
                <p className={styles.error}>{fieldState.error.message}</p>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
};
