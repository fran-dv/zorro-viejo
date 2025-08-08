import React, { useRef } from "react";
import styles from "./ToolbarButton.module.css";
import { GenericAlertDialog } from "@/components/GenericAlertDialog/GenericAlertDialog";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement<{ className?: string }>;
  children: React.ReactNode;
  iconClassName?: string;
  confirmationDialog?: boolean;
  fileImport?: boolean;
  fileInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  handleFileChange?: ({ file }: { file: File }) => void;
  accept?: string;
  multiple?: boolean;
  titleContent?: React.ReactNode;
  descriptionContent?: React.ReactNode;
  continueButtonContent?: React.ReactNode;
  cancelButtonContent?: React.ReactNode;
  onContinue?: () => void;
  onCancel?: () => void;
}

export const ToolbarButton = ({
  icon,
  children,
  className = "",
  confirmationDialog = false,
  fileImport = false,
  fileInputProps,
  handleFileChange,
  accept,
  multiple = false,
  titleContent,
  descriptionContent,
  continueButtonContent,
  cancelButtonContent,
  onContinue,
  onCancel,
  ...props
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  const disabled = buttonProps.disabled;

  const iconWithClassName = React.cloneElement(icon, {
    className: `${icon.props.className || ""} ${styles.icon}`.trim(),
  });

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (fileImport && handleFileChange && fileInputRef.current) {
      console.log("about click import");
      fileInputRef.current.click();
    } else if (props.onClick) {
      props.onClick(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file && handleFileChange) {
      handleFileChange({ file });
    }
  };

  const buttonContent = (
    <>
      {iconWithClassName}
      <p>{children}</p>
      {fileImport && handleFileChange && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          className={styles.fileInput}
          accept={accept}
          multiple={multiple}
          style={{ display: "none" }}
          {...fileInputProps}
        />
      )}
    </>
  );

  if (confirmationDialog && onContinue && onCancel) {
    return (
      <GenericAlertDialog
        titleContent={titleContent}
        descriptionContent={descriptionContent}
        continueButtonContent={continueButtonContent}
        cancelButtonContent={cancelButtonContent}
        onContinue={onContinue}
        onCancel={onCancel}
        triggerButtonContent={buttonContent}
        triggerButtonClassName={`${styles.button} ${className} ${disabled ? styles.disabled : ""}`.trim()}
        triggerButtonProps={{
          ...buttonProps,
          onClick: handleButtonClick,
        }}
        hasTriggerButton
      />
    );
  }

  return (
    <button
      className={`${styles.button} ${className} ${disabled ? styles.disabled : ""}`.trim()}
      {...buttonProps}
      onClick={handleButtonClick}
      type={fileImport ? "button" : props.type}
    >
      {buttonContent}
    </button>
  );
};
