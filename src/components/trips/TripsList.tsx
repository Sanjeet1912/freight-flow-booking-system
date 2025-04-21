
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from '@/hooks/use-toast';
import { trips } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// Using allowed lucide-react icons only
import { Search, Download, FileUp, Info, FileText } from "lucide-react";

const LRSoftCopyModal = ({
  show,
  lrNumber,
  onClose,
}: {
  show: boolean;
  lrNumber: string;
  onClose: () => void;
}) => {
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

const TripsList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrips, setFilteredTrips] = useState(trips);
  const [showLrModal, setShowLrModal] = useState(false);
  const [selectedLrNumber, setSelectedLrNumber] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredTrips(trips);
      return;
    }

    const filtered = trips.filter(
      (trip) =>
        trip.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.lrNumbers.some((lr) =>
          lr.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        trip.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTrips(filtered);
  };

  const handleExportToExcel = () => {
    toast({
      title: "Export Initiated",
      description: "Your trip details are being exported to Excel.",
    });
  };

  const handleUploadPOD = (tripId: string) => {
    toast({
      title: "Upload POD",
      description: `Ready to upload POD for trip ${tripId}`,
    });
  };

  const handleOrderIdClick = (tripId: string) => {
    navigate(`/trips/${tripId}`);
  };

  const handleLrNumberClick = (lrNumber: string) => {
    setSelectedLrNumber(lrNumber);
    setShowLrModal(true);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Booked":
        return "badge-blue";
      case "In Transit":
        return "badge-amber";
      case "Delivered":
      case "Completed":
        return "badge-green";
      default:
        return "badge-blue";
    }
  };

  const getPaymentStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "badge-green";
      case "Pending":
        return "badge-amber";
      case "Initiated":
        return "badge-blue";
      case "Not Started":
        return "badge-red";
      default:
        return "badge-blue";
    }
  };

  return (
    <div className="container mx-auto">
      {/* LR Soft Copy Modal */}
      <LRSoftCopyModal
        show={showLrModal}
        lrNumber={selectedLrNumber}
        onClose={() => setShowLrModal(false)}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>FTL Trips</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Input
                placeholder="Search by Order ID, LR, Client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearch}
                className="absolute right-0 top-0 h-full"
              >
                <Search size={18} />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportToExcel}>
              <Download size={18} className="mr-2" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      Order ID
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      LR Number
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Client</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Client Freight (₹)
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Supplier Freight (₹)
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Margin (₹)
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Trip Date
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Source - Destination
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Vehicle</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Advance Status
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Balance Status
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrips.length > 0 ? (
                    filteredTrips.map((trip) => (
                      <TableRow key={trip.id}>
                        <TableCell className="font-medium">
                          {/* Order ID hyperlink */}
                          <button
                            className="text-freight-600 hover:underline flex items-center gap-1"
                            title="View Order Details"
                            onClick={() => handleOrderIdClick(trip.id)}
                          >
                            {trip.orderNumber}
                            <FileText size={16} />
                          </button>
                        </TableCell>
                        <TableCell>
                          {/* LR Number hyperlink */}
                          <button
                            className="text-freight-600 hover:underline flex items-center gap-1"
                            onClick={() => handleLrNumberClick(trip.lrNumbers[0])}
                            title="View LR Soft Copy"
                          >
                            {trip.lrNumbers[0]}
                            <FileText size={16} />
                          </button>
                        </TableCell>
                        <TableCell>{trip.clientName}</TableCell>
                        <TableCell>
                          ₹{trip.clientFreight.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ₹{trip.supplierFreight.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ₹
                          {(
                            trip.clientFreight - trip.supplierFreight
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>{trip.pickupDate}</TableCell>
                        <TableCell>{`${trip.clientCity} - ${trip.destinationCity}`}</TableCell>
                        <TableCell>{trip.vehicleNumber}</TableCell>
                        <TableCell>
                          <span className={getStatusBadgeClass(trip.status)}>
                            {trip.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={getPaymentStatusBadgeClass(
                              trip.advancePaymentStatus
                            )}
                          >
                            {trip.advancePaymentStatus}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={getPaymentStatusBadgeClass(
                              trip.balancePaymentStatus
                            )}
                          >
                            {trip.balancePaymentStatus}
                          </span>
                        </TableCell>
                        <TableCell>
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
                              onClick={() => handleUploadPOD(trip.id)}
                            >
                              <FileUp size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={13}
                        className="text-center py-8 text-gray-500"
                      >
                        No trips found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripsList;
