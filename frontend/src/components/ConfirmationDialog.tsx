import React from "react";
import {
  Dialog as ShadcnDialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const ConfirmationDialog: React.FC<DialogProps> = ({ isOpen, onClose, title, description }) => {
  return (
    <ShadcnDialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </ShadcnDialog>
  );
};

export default ConfirmationDialog;