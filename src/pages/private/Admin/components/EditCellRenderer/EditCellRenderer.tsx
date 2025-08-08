import React, { useCallback } from "react";
import type { ICellRendererParams } from "ag-grid-community";
import { SquarePen } from "lucide-react";
import styles from "./EditCellRenderer.module.css";

interface Props extends ICellRendererParams {
  onEdit: ({ id }: { id: string }) => void;
}

export const EditCellRenderer: React.FC<Props> = ({ data, onEdit }) => {
  const handleEdit = useCallback(() => {
    onEdit({ id: data.id });
  }, [data.id, onEdit]);

  return (
    <button
      onClick={handleEdit}
      className={styles.button}
      title="Editar producto"
    >
      <SquarePen className={styles.icon} />
    </button>
  );
};
