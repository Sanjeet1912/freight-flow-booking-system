
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { clients } from "@/data/mockData";
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
import ClientForm from "./ClientForm";

const ClientList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState(clients);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<any>(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredClients(clients);
      return;
    }

    const filtered = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.logisticsPOC.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredClients(filtered);
  };

  const handleExportToExcel = () => {
    toast({
      title: "Export Initiated",
      description: "Your client details are being exported to Excel.",
    });
  };

  const handleEditClient = (client: any) => {
    setCurrentClient(client);
    setIsEditDialogOpen(true);
  };

  const handleViewDocuments = (clientId: string) => {
    toast({
      title: "Documents",
      description: `Viewing documents for client ${clientId}`,
    });
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Client Management</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Input
                placeholder="Search clients..."
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
                  <Plus size={18} className="mr-2" /> Add Client
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>
                    Fill in the client details to onboard a new client.
                  </DialogDescription>
                </DialogHeader>
                <ClientForm 
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
                    <TableHead className="whitespace-nowrap">Client ID</TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">City</TableHead>
                    <TableHead className="whitespace-nowrap">Address Type</TableHead>
                    <TableHead className="whitespace-nowrap">GST Number</TableHead>
                    <TableHead className="whitespace-nowrap">Logistics POC</TableHead>
                    <TableHead className="whitespace-nowrap">Finance POC</TableHead>
                    <TableHead className="whitespace-nowrap">Invoicing Type</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.id}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.city}</TableCell>
                        <TableCell>{client.addressType}</TableCell>
                        <TableCell>{client.gstNumber}</TableCell>
                        <TableCell>
                          {client.logisticsPOC.name}
                          <div className="text-xs text-gray-500">
                            {client.logisticsPOC.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          {client.financePOC.name}
                          <div className="text-xs text-gray-500">
                            {client.financePOC.phone}
                          </div>
                        </TableCell>
                        <TableCell>{client.invoicingType}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Dialog open={isEditDialogOpen && currentClient?.id === client.id} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  title="Edit Client"
                                  onClick={() => handleEditClient(client)}
                                >
                                  <Edit size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Edit Client</DialogTitle>
                                  <DialogDescription>
                                    Update client information.
                                  </DialogDescription>
                                </DialogHeader>
                                <ClientForm 
                                  client={currentClient}
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
                              onClick={() => handleViewDocuments(client.id)}
                            >
                              <FileDown size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                        No clients found matching your search criteria.
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

export default ClientList;
