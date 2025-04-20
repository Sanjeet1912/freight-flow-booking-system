
import React, { useState } from "react";
import { trips } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search, Download, Check, CreditCard, FileText } from "lucide-react";

const PaymentDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [allTrips, setAllTrips] = useState(trips);

  // Filter trips for advance payments (those with status not "Paid")
  const advancePayments = allTrips.filter(
    (trip) => trip.advancePaymentStatus !== "Paid"
  );

  // Filter trips for POD payments (those with POD uploaded and balance not paid)
  const podPayments = allTrips.filter(
    (trip) => trip.podUploaded && trip.balancePaymentStatus !== "Paid"
  );

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setAllTrips(trips);
      return;
    }

    const filtered = trips.filter(
      (trip) =>
        trip.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.lrNumbers.some(lr => lr.toLowerCase().includes(searchTerm.toLowerCase())) ||
        trip.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setAllTrips(filtered);
  };

  const handleProcessPayment = (tripId: string, type: "advance" | "balance") => {
    toast({
      title: `${type === "advance" ? "Advance" : "Balance"} Payment Initiated`,
      description: `Payment for trip ${tripId} has been initiated.`,
    });
  };

  const handleViewDetails = (tripId: string) => {
    toast({
      title: "Payment Details",
      description: `Viewing payment details for trip ${tripId}`,
    });
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
      <Tabs defaultValue="advance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="advance">Advance Payments</TabsTrigger>
          <TabsTrigger value="pod">Balance (POD) Payments</TabsTrigger>
        </TabsList>

        {/* Advance Payments Tab */}
        <TabsContent value="advance" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Advance Payment Queue</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative w-64">
                  <Input
                    placeholder="Search by Order ID, Supplier..."
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
                <Button variant="outline" size="sm">
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
                        <TableHead className="whitespace-nowrap">Order ID</TableHead>
                        <TableHead className="whitespace-nowrap">LR Number</TableHead>
                        <TableHead className="whitespace-nowrap">Supplier</TableHead>
                        <TableHead className="whitespace-nowrap">Trip Date</TableHead>
                        <TableHead className="whitespace-nowrap">Client</TableHead>
                        <TableHead className="whitespace-nowrap">Advance Amount (₹)</TableHead>
                        <TableHead className="whitespace-nowrap">Payment Status</TableHead>
                        <TableHead className="whitespace-nowrap">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {advancePayments.length > 0 ? (
                        advancePayments.map((trip) => (
                          <TableRow key={`adv-${trip.id}`}>
                            <TableCell className="font-medium">
                              <a href="#" className="text-freight-600 hover:underline">
                                {trip.orderNumber}
                              </a>
                            </TableCell>
                            <TableCell>
                              <a href="#" className="text-freight-600 hover:underline">
                                {trip.lrNumbers[0]}
                              </a>
                            </TableCell>
                            <TableCell>{trip.supplierName}</TableCell>
                            <TableCell>{trip.pickupDate}</TableCell>
                            <TableCell>{trip.clientName}</TableCell>
                            <TableCell>₹{trip.advanceSupplierFreight.toLocaleString()}</TableCell>
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
                              <div className="flex space-x-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8"
                                  onClick={() => handleProcessPayment(trip.id, "advance")}
                                >
                                  <CreditCard size={14} className="mr-1" /> Process
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  title="Payment Details"
                                  onClick={() => handleViewDetails(trip.id)}
                                >
                                  <FileText size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            No advance payments pending.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* POD Payments Tab */}
        <TabsContent value="pod" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Balance (POD) Payment Queue</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative w-64">
                  <Input
                    placeholder="Search by Order ID, Supplier..."
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
                <Button variant="outline" size="sm">
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
                        <TableHead className="whitespace-nowrap">Order ID</TableHead>
                        <TableHead className="whitespace-nowrap">LR Number</TableHead>
                        <TableHead className="whitespace-nowrap">Supplier</TableHead>
                        <TableHead className="whitespace-nowrap">Trip Date</TableHead>
                        <TableHead className="whitespace-nowrap">Client</TableHead>
                        <TableHead className="whitespace-nowrap">Balance Amount (₹)</TableHead>
                        <TableHead className="whitespace-nowrap">Payment Status</TableHead>
                        <TableHead className="whitespace-nowrap">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {podPayments.length > 0 ? (
                        podPayments.map((trip) => (
                          <TableRow key={`pod-${trip.id}`}>
                            <TableCell className="font-medium">
                              <a href="#" className="text-freight-600 hover:underline">
                                {trip.orderNumber}
                              </a>
                            </TableCell>
                            <TableCell>
                              <a href="#" className="text-freight-600 hover:underline">
                                {trip.lrNumbers[0]}
                              </a>
                            </TableCell>
                            <TableCell>{trip.supplierName}</TableCell>
                            <TableCell>{trip.pickupDate}</TableCell>
                            <TableCell>{trip.clientName}</TableCell>
                            <TableCell>₹{trip.balanceSupplierFreight.toLocaleString()}</TableCell>
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
                                  variant="outline"
                                  size="sm"
                                  className="h-8"
                                  onClick={() => handleProcessPayment(trip.id, "balance")}
                                >
                                  <CreditCard size={14} className="mr-1" /> Process
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  title="Payment Details"
                                  onClick={() => handleViewDetails(trip.id)}
                                >
                                  <FileText size={16} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            No POD payments pending.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentDashboard;
