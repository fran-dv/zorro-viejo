import { useState } from "react";

interface SnackbarState {
  isOpened: boolean;
  content: string;
  showUndo: boolean;
  onUndo?: () => void;
}

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    isOpened: false,
    content: "",
    showUndo: false,
  });

  const openSnackbar = (content: string, showUndo: boolean) => {
    setSnackbar((prev) => ({
      ...prev,
      isOpened: true,
      content,
      showUndo,
    }));
  };

  const closeSnackbar = () => {
    setSnackbar({
      isOpened: false,
      content: "",
      showUndo: false,
    });
  };

  const setOnUndo = (onUndoCallback: () => void) => {
    setSnackbar((prev) => ({
      ...prev,
      onUndo: onUndoCallback,
    }));
  };

  return {
    isOpened: snackbar.isOpened,
    content: snackbar.content,
    showUndo: snackbar.showUndo,
    onUndo: snackbar.onUndo,
    openSnackbar,
    closeSnackbar,
    setOnUndo,
  };
};
