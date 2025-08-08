import styles from "./ProductsToolbar.module.css";
import { ToolbarButton } from "@/pages/private/Admin/components";
import { FileDown, FileUp, Plus } from "lucide-react";
import {
  useBulkProductsImport,
  type BulkImportError,
} from "@/pages/private/Admin/hooks";
import { Paths } from "@/routing";
import { useNavigate } from "react-router-dom";
import { useExport } from "@refinedev/core";
import type { RawProductResponse } from "@/models";
import { useEffect } from "react";

interface Props {
  selectedIds: number[];
  onDelete: (ids: number[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setErrors: (errors: BulkImportError[]) => void;
}

export const ProductsToolbar = ({
  selectedIds,
  onDelete,
  setIsLoading,
  setErrors,
}: Props) => {
  const navigate = useNavigate();
  const { inputProps, handleChange, isLoading, errors } =
    useBulkProductsImport();

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    setErrors(errors);
  }, [errors, setErrors]);

  const { triggerExport } = useExport({
    resource: "products",
    sorters: [
      {
        field: "id",
        order: "asc",
      },
    ],
    mapData: (row: RawProductResponse): Partial<RawProductResponse> => {
      return {
        id: row.id,
        category_id: row.category_id,
        name: row.name,
        slug: row.slug,
        price: row.price,
        offer_price: row.offer_price,
        image_urls: row.image_urls,
        short_description: row.short_description,
        description: row.description,
        in_stock: row.in_stock,
        units_in_package: row.units_in_package,
        unit_volume_ml: row.unit_volume_ml,
      };
    },
  });

  const handleNewProduct = () => {
    navigate(Paths.AdminCreateProduct);
  };

  const handleProductDelete = () => {
    onDelete(selectedIds);
  };

  return (
    <div className={styles.toolbarContainer}>
      <ToolbarButton icon={<Plus />} onClick={handleNewProduct}>
        Crear producto
      </ToolbarButton>
      <ToolbarButton
        icon={<FileUp />}
        fileInputProps={inputProps}
        fileImport
        handleFileChange={handleChange}
        accept=".csv"
        multiple={false}
      >
        Importar productos
      </ToolbarButton>
      <ToolbarButton icon={<FileDown />} onClick={triggerExport}>
        Exportar CSV
      </ToolbarButton>
      <ToolbarButton
        icon={<FileDown />}
        disabled={selectedIds.length === 0}
        confirmationDialog
        titleContent="Eliminar productos"
        descriptionContent="¿Estás seguro de eliminar estos productos?"
        continueButtonContent="Mantener productos"
        cancelButtonContent="Eliminar productos"
        onContinue={() => {}}
        onCancel={handleProductDelete}
      >
        Eliminar {selectedIds.length === 0 ? "" : selectedIds.length} producto
        {selectedIds.length > 1 && "s"}
      </ToolbarButton>
    </div>
  );
};
