import React, { useCallback } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import { Trash2 } from "lucide-react";
import { GenericAlertDialog } from "@/components";
import styles from "./DeleteCellRenderer.module.css";
import loadingSpinner from "@/assets/preloader.svg";

interface Props extends ICellRendererParams {
  onDelete: ({ id }: { id: string }) => void;
  isLoading: boolean;
  isLoadingIds: string[];
  error: boolean;
  dialogTitle: string;
  dialogDescription: string;
  cancelButtonContent: string;
  continueButtonContent: string;
}

export const DeleteCellRenderer: React.FC<Props> = ({
  data,
  onDelete,
  isLoading,
  isLoadingIds,
  error,
  dialogTitle,
  dialogDescription,
  cancelButtonContent,
  continueButtonContent,
}) => {
  const handleDelete = useCallback(() => {
    onDelete({ id: data.id });
  }, [data.id, onDelete]);

  if (error && isLoadingIds.includes(data.id)) {
    return (
      <div className={styles.container}>
        <p>Hubo un error eliminando la orden</p>
      </div>
    );
  }

  if (isLoading && isLoadingIds.includes(data.id)) {
    return (
      <div className={styles.container}>
        <img
          width={30}
          height={30}
          src={loadingSpinner}
          loading="lazy"
          alt="Eliminando..."
        />
      </div>
    );
  }

  return (
    <GenericAlertDialog
      hasTriggerButton={true}
      titleContent={dialogTitle}
      descriptionContent={dialogDescription}
      onContinue={() => {}}
      onCancel={handleDelete}
      cancelButtonContent={cancelButtonContent}
      continueButtonContent={continueButtonContent}
      triggerButtonContent={<Trash2 className={styles.icon} />}
      triggerButtonClassName={styles.button}
    />
  );
};
