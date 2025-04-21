
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type LRSoftCopyModalProps = {
  show: boolean;
  lrNumber: string;
  onClose: () => void;
};

const handleDownload = (lrNumber: string) => {
  // Placeholder: Replace with your own download logic!
  // For now, download a dummy text file with the LR number.
  const element = document.createElement("a");
  const file = new Blob(
    [`Soft copy data for LR: ${lrNumber}`],
    { type: "text/plain" }
  );
  element.href = URL.createObjectURL(file);
  element.download = `LR_${lrNumber}_softcopy.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const LRSoftCopyModal: React.FC<LRSoftCopyModalProps> = ({
  show,
  lrNumber,
  onClose,
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            LR Soft Copy: {lrNumber}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(lrNumber)}
              title="Download LR Soft Copy"
            >
              <Download size={16} className="mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
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
