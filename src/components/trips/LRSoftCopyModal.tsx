
import React from "react";
import { Button } from "@/components/ui/button";

type LRSoftCopyModalProps = {
  show: boolean;
  lrNumber: string;
  onClose: () => void;
};

const LRSoftCopyModal: React.FC<LRSoftCopyModalProps> = ({ show, lrNumber, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">LR Soft Copy: {lrNumber}</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        {/* Placeholder for LR Soft Copy Preview */}
        <div className="flex items-center justify-center h-56 bg-muted rounded border text-muted-foreground">
          LR Soft Copy Preview for <span className="font-mono ml-1">{lrNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default LRSoftCopyModal;
