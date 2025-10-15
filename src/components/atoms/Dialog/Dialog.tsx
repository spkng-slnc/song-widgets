import { AlertDialog } from "@base-ui-components/react";

import { actions, backdrop, description, popup } from "./Dialog.css";
import { Button } from "src/components/atoms/Button/Button";

interface DialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function Dialog({
  isOpen,
  onOpenChange,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Remove",
  cancelLabel = "Cancel",
}: DialogProps) {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className={backdrop} />
        <AlertDialog.Popup className={popup}>
          <AlertDialog.Title className={title}>{title}</AlertDialog.Title>
          <AlertDialog.Description className={description}>
            {message}
          </AlertDialog.Description>
          <div className={actions}>
            <Button onClick={onCancel}>{cancelLabel}</Button>
            <Button onClick={onConfirm} data-color="red">
              {confirmLabel}
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
