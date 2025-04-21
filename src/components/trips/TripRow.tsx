
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Info, FileUp } from "lucide-react";

// We expect trip shape as used in TripsList
interface TripRowProps {
  trip: any;
  onOrderIdClick: (tripId: string) => void;
  onLrNumberClick: (lrNumber: string) => void;
  onUploadPOD: (tripId: string) => void;
  getStatusBadgeClass: (status: string) => string;
  getPaymentStatusBadgeClass: (status: string) => string;
}

const TripRow: React.FC<TripRowProps> = ({
  trip,
  onOrderIdClick,
  onLrNumberClick,
  onUploadPOD,
  getStatusBadgeClass,
  getPaymentStatusBadgeClass,
}) => (
  <tr>
    <td className="font-medium">
      <button
        className="text-freight-600 hover:underline flex items-center gap-1"
        title="View Order Details"
        onClick={() => onOrderIdClick(trip.id)}
      >
        {trip.orderNumber}
        <FileText size={16} />
      </button>
    </td>
    <td>
      <button
        className="text-freight-600 hover:underline flex items-center gap-1"
        onClick={() => onLrNumberClick(trip.lrNumbers[0])}
        title="View LR Soft Copy"
      >
        {trip.lrNumbers[0]}
        <FileText size={16} />
      </button>
    </td>
    <td>{trip.clientName}</td>
    <td>₹{trip.clientFreight.toLocaleString()}</td>
    <td>₹{trip.supplierFreight.toLocaleString()}</td>
    <td>
      ₹{(trip.clientFreight - trip.supplierFreight).toLocaleString()}
    </td>
    <td>{trip.pickupDate}</td>
    <td>{`${trip.clientCity} - ${trip.destinationCity}`}</td>
    <td>{trip.vehicleNumber}</td>
    <td>
      <span className={getStatusBadgeClass(trip.status)}>{trip.status}</span>
    </td>
    <td>
      <span className={getPaymentStatusBadgeClass(trip.advancePaymentStatus)}>
        {trip.advancePaymentStatus}
      </span>
    </td>
    <td>
      <span className={getPaymentStatusBadgeClass(trip.balancePaymentStatus)}>
        {trip.balancePaymentStatus}
      </span>
    </td>
    <td>
      <div className="flex space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          title="View Details"
        >
          <Info size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          title="Upload POD"
          onClick={() => onUploadPOD(trip.id)}
        >
          <FileUp size={16} />
        </Button>
      </div>
    </td>
  </tr>
);

export default TripRow;
