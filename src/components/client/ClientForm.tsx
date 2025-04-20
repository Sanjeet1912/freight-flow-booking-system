
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { invoicingTypes } from "@/data/mockData";

interface ClientFormProps {
  client?: any;
  onClose: () => void;
  mode: "create" | "edit";
}

const ClientForm = ({ client, onClose, mode }: ClientFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: client?.name || "",
    city: client?.city || "",
    address: client?.address || "",
    addressType: client?.addressType || "",
    gstNumber: client?.gstNumber || "",
    panNumber: client?.panNumber || "",
    logisticsPOCName: client?.logisticsPOC?.name || "",
    logisticsPOCPhone: client?.logisticsPOC?.phone || "",
    logisticsPOCEmail: client?.logisticsPOC?.email || "",
    financePOCName: client?.financePOC?.name || "",
    financePOCPhone: client?.financePOC?.phone || "",
    financePOCEmail: client?.financePOC?.email || "",
    invoicingType: client?.invoicingType || "",
    salesRepName: client?.salesRep?.name || "",
    salesRepDesignation: client?.salesRep?.designation || "",
    salesRepPhone: client?.salesRep?.phone || "",
    salesRepEmail: client?.salesRep?.email || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.name || !formData.city || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Logic to save client would go here
    toast({
      title: mode === "create" ? "Client Created" : "Client Updated",
      description: `${formData.name} has been ${mode === "create" ? "created" : "updated"} successfully.`,
    });
    onClose();
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="contact">Contact Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Client Name*</label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter client name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="city">City*</label>
              <Input
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
              />
            </div>

            <div className="form-group col-span-1 md:col-span-2">
              <label className="form-label" htmlFor="address">Address*</label>
              <Input
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="addressType">Address Type*</label>
              <Input
                id="addressType"
                value={formData.addressType}
                onChange={handleInputChange}
                placeholder="E.g., Head Office, Factory, Warehouse"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="invoicingType">Invoicing Type*</label>
              <Select
                value={formData.invoicingType}
                onValueChange={(value) => handleSelectChange("invoicingType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Invoicing Type" />
                </SelectTrigger>
                <SelectContent>
                  {invoicingTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label" htmlFor="gstNumber">GST Number</label>
              <div className="flex space-x-2">
                <Input
                  id="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  placeholder="Enter GST number"
                  className="flex-1"
                />
                <Input type="file" className="w-48" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="panNumber">PAN Number</label>
              <div className="flex space-x-2">
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  placeholder="Enter PAN number"
                  className="flex-1"
                />
                <Input type="file" className="w-48" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Cancelled Cheque</label>
              <Input type="file" />
            </div>

            <div className="form-group">
              <label className="form-label">MSME Certificate</label>
              <Input type="file" />
            </div>
          </div>
        </TabsContent>

        {/* Contact Details Tab */}
        <TabsContent value="contact" className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-medium mb-4">Logistics Point of Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="logisticsPOCName">Name*</label>
                <Input
                  id="logisticsPOCName"
                  value={formData.logisticsPOCName}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="logisticsPOCPhone">Phone*</label>
                <Input
                  id="logisticsPOCPhone"
                  value={formData.logisticsPOCPhone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="logisticsPOCEmail">Email*</label>
                <Input
                  id="logisticsPOCEmail"
                  value={formData.logisticsPOCEmail}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  type="email"
                />
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium mb-4">Finance Point of Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="financePOCName">Name*</label>
                <Input
                  id="financePOCName"
                  value={formData.financePOCName}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="financePOCPhone">Phone*</label>
                <Input
                  id="financePOCPhone"
                  value={formData.financePOCPhone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="financePOCEmail">Email*</label>
                <Input
                  id="financePOCEmail"
                  value={formData.financePOCEmail}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  type="email"
                />
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-lg font-medium mb-4">Sales Representative</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="salesRepName">Name*</label>
                <Input
                  id="salesRepName"
                  value={formData.salesRepName}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="salesRepDesignation">Designation*</label>
                <Input
                  id="salesRepDesignation"
                  value={formData.salesRepDesignation}
                  onChange={handleInputChange}
                  placeholder="Enter designation"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="salesRepPhone">Phone*</label>
                <Input
                  id="salesRepPhone"
                  value={formData.salesRepPhone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="salesRepEmail">Email*</label>
                <Input
                  id="salesRepEmail"
                  value={formData.salesRepEmail}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  type="email"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4 mt-4">
          <div className="form-group">
            <label className="form-label">Client Onboarding Form</label>
            <Input type="file" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Document Gallery</h3>
            <p className="text-sm text-gray-500">
              All uploaded documents related to this client will appear here.
            </p>
            <div className="p-10 border-2 border-dashed rounded-md flex justify-center items-center">
              <p className="text-gray-400">No documents uploaded yet</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>{mode === "create" ? "Create Client" : "Update Client"}</Button>
      </div>
    </div>
  );
};

export default ClientForm;
