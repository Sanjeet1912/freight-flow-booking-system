
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type AddEditTextDialogProps = {
  open: boolean;
  defaultValue?: string;
  label: string;
  onClose: () => void;
  onSave: (text: string) => void;
};

const AddEditTextDialog: React.FC<AddEditTextDialogProps> = ({ open, defaultValue = "", label, onClose, onSave }) => {
  const [value, setValue] = useState(defaultValue);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <Textarea
          value={value}
          autoFocus
          placeholder="Enter details..."
          onChange={e => setValue(e.target.value)}
          className="mt-2"
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(value.trim());
              onClose();
            }}
            disabled={!value.trim()}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTextDialog;
