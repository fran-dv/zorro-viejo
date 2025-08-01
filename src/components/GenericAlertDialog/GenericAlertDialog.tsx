import React, { useCallback } from "react";
import { AlertDialog } from "radix-ui";
import styles from "./GenericAlertDialog.module.css";

interface Props {
  hasTriggerButton: boolean;
  triggerButtonContent?: React.ReactNode;
  triggerButtonClassName?: string;
  cancelButtonContent: React.ReactNode;
  continueButtonContent: React.ReactNode;
  titleContent: React.ReactNode;
  descriptionContent: React.ReactNode;
  open?: boolean;
  onContinue: () => void;
  onCancel: () => void;
}

export const GenericAlertDialog = ({
  hasTriggerButton,
  triggerButtonContent,
  triggerButtonClassName,
  cancelButtonContent,
  continueButtonContent,
  titleContent,
  descriptionContent,
  open,
  onContinue,
  onCancel,
}: Props) => {
  const handleContinue = useCallback(() => {
    onContinue();
  }, [onContinue]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <AlertDialog.Root open={open}>
      {hasTriggerButton && (
        <AlertDialog.Trigger asChild>
          <button className={triggerButtonClassName}>
            {triggerButtonContent}
          </button>
        </AlertDialog.Trigger>
      )}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.overlay} />
        <AlertDialog.Content className={styles.content}>
          <AlertDialog.Title className={styles.title}>
            {titleContent}
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.description}>
            {descriptionContent}
          </AlertDialog.Description>
          <div className={styles.buttonsContainer}>
            <AlertDialog.Cancel asChild onClick={handleCancel}>
              <button className={`${styles.cancel} ${styles.button}`}>
                {cancelButtonContent}
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild onClick={handleContinue}>
              <button className={`${styles.continue} ${styles.button}`}>
                {continueButtonContent}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
