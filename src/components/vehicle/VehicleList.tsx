
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { vehicles, suppliers } from "@/data/mockData";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, Edit, Download, FileDown } from "lucide-react";
import VehicleForm from "./VehicleForm";

const VehicleList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<any>(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredVehicles(vehicles);
      return;
    }

    const filtered = vehicles.filter(
      (vehicle) =>
        vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.driverName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredVehicles(filtered);
  };

  const handleExportToExcel = () => {
    toast({
      title: "Export Initiated",
      description: "Your vehicle details are being exported to Excel.",
    });
  };

  const handleEditVehicle = (vehicle: any) => {
    setCurrentVehicle(vehicle);
    setIsEditDialogOpen(true);
  };

  const handleViewDocuments = (vehicleId: string) => {
    toast({
      title: "Documents",
      description: `Viewing documents for vehicle ${vehicleId}`,
    });
  };

  // Function to determine if insurance is expiring soon
  const isInsuranceExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Vehicle Management</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Input
                placeholder="Search vehicles..."
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportToExcel}
            >
              <Download size={18} className="mr-2" /> Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={18} className="mr-2" /> Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Vehicle</DialogTitle>
                  <DialogDescription>
                    Fill in the vehicle details to add a new vehicle.
                  </DialogDescription>
                </DialogHeader>
                <VehicleForm 
                  suppliers={suppliers}
                  onClose={() => setIsAddDialogOpen(false)}
                  mode="create"
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Registration No.</TableHead>
                    <TableHead className="whitespace-nowrap">Supplier</TableHead>
                    <TableHead className="whitespace-nowrap">Vehicle Type</TableHead>
                    <TableHead className="whitespace-nowrap">Size & Capacity</TableHead>
                    <TableHead className="whitespace-nowrap">Driver</TableHead>
                    <TableHead className="whitespace-nowrap">Insurance Expiry</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.registrationNumber}</TableCell>
                        <TableCell>{vehicle.supplierName}</TableCell>
                        <TableCell>{vehicle.vehicleType}</TableCell>
                        <TableCell>{`${vehicle.vehicleSize}, ${vehicle.vehicleCapacity}`}</TableCell>
                        <TableCell>
                          {vehicle.driverName}
                          <div className="text-xs text-gray-500">{vehicle.driverPhone}</div>
                        </TableCell>
                        <TableCell>
                          <span className={isInsuranceExpiringSoon(vehicle.insuranceExpiry) ? "text-red-600 font-medium" : ""}>
                            {vehicle.insuranceExpiry}
                          </span>
                          {isInsuranceExpiringSoon(vehicle.insuranceExpiry) && (
                            <div className="text-xs text-red-600">Expiring soon</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Dialog open={isEditDialogOpen && currentVehicle?.id === vehicle.id} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  title="Edit Vehicle"
                                  onClick={() => handleEditVehicle(vehicle)}
                                >
                                  <Edit size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Vehicle</DialogTitle>
                                  <DialogDescription>
                                    Update vehicle information.
                                  </DialogDescription>
                                </DialogHeader>
                                <VehicleForm 
                                  vehicle={currentVehicle}
                                  suppliers={suppliers}
                                  onClose={() => setIsEditDialogOpen(false)}
                                  mode="edit"
                                />
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              title="View Documents"
                              onClick={() => handleViewDocuments(vehicle.id)}
                            >
                              <FileDown size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No vehicles found matching your search criteria.
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

export default VehicleList;
