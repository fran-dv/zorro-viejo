import React from "react";
import type { ICellRendererParams } from "ag-grid-community";
import {
  DeleteCellRenderer,
  EditCellRenderer,
} from "@/pages/private/Admin/components";
import styles from "./ProductActionsCellRenderer.module.css";

interface Props extends ICellRendererParams {
  onEdit: ({ id }: { id: string }) => void;
  onDelete: ({ id }: { id: string }) => void;
  isDeleteLoading: boolean;
  isDeleteLoadingIds: string[];
  isDeleteError: boolean;
  deleteDialogTitle: string;
  deleteDialogDescription: string;
  deleteCancelButtonContent: string;
  deleteContinueButtonContent: string;
}

export const ProductActionsCellRenderer: React.FC<Props> = ({
  onDelete,
  onEdit,
  isDeleteLoading,
  isDeleteLoadingIds,
  isDeleteError,
  deleteDialogTitle,
  deleteDialogDescription,
  deleteCancelButtonContent,
  deleteContinueButtonContent,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <EditCellRenderer {...props} onEdit={onEdit} />
      <DeleteCellRenderer
        {...props}
        onDelete={onDelete}
        isLoading={isDeleteLoading}
        isLoadingIds={isDeleteLoadingIds}
        error={isDeleteError}
        dialogTitle={deleteDialogTitle}
        dialogDescription={deleteDialogDescription}
        cancelButtonContent={deleteCancelButtonContent}
        continueButtonContent={deleteContinueButtonContent}
      />
    </div>
  );
};
