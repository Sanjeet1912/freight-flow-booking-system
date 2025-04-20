
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { suppliers } from "@/data/mockData";
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
import SupplierForm from "./SupplierForm";

const SupplierList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<any>(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredSuppliers(suppliers);
      return;
    }

    const filtered = suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactPerson.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredSuppliers(filtered);
  };

  const handleExportToExcel = () => {
    toast({
      title: "Export Initiated",
      description: "Your supplier details are being exported to Excel.",
    });
  };

  const handleEditSupplier = (supplier: any) => {
    setCurrentSupplier(supplier);
    setIsEditDialogOpen(true);
  };

  const handleViewDocuments = (supplierId: string) => {
    toast({
      title: "Documents",
      description: `Viewing documents for supplier ${supplierId}`,
    });
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Supplier Management</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Input
                placeholder="Search suppliers..."
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
                  <Plus size={18} className="mr-2" /> Add Supplier
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Supplier</DialogTitle>
                  <DialogDescription>
                    Fill in the supplier details to onboard a new supplier.
                  </DialogDescription>
                </DialogHeader>
                <SupplierForm 
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
                    <TableHead className="whitespace-nowrap">Supplier ID</TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">City</TableHead>
                    <TableHead className="whitespace-nowrap">Contact Person</TableHead>
                    <TableHead className="whitespace-nowrap">Bank Details</TableHead>
                    <TableHead className="whitespace-nowrap">GST Number</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.id}</TableCell>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>{supplier.city}</TableCell>
                        <TableCell>
                          {supplier.contactPerson.name}
                          <div className="text-xs text-gray-500">
                            {supplier.contactPerson.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          {supplier.bankDetails.bankName}
                          <div className="text-xs text-gray-500">
                            A/C: {supplier.bankDetails.accountNumber}
                          </div>
                        </TableCell>
                        <TableCell>{supplier.gstNumber}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Dialog open={isEditDialogOpen && currentSupplier?.id === supplier.id} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  title="Edit Supplier"
                                  onClick={() => handleEditSupplier(supplier)}
                                >
                                  <Edit size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Supplier</DialogTitle>
                                  <DialogDescription>
                                    Update supplier information.
                                  </DialogDescription>
                                </DialogHeader>
                                <SupplierForm 
                                  supplier={currentSupplier}
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
                              onClick={() => handleViewDocuments(supplier.id)}
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
                        No suppliers found matching your search criteria.
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

export default SupplierList;
