
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Car, Upload, ArrowRight, Plus, Edit } from "lucide-react";

interface Vehicle {
  id: string;
  registrationNumber: string;
  type: string;
  make: string;
  model: string;
  yearOfManufacture: string;
  driverName: string;
  driverPhone: string;
  driverLicense: string;
  insuranceExpiry: string;
  documentsUploaded: boolean;
}

interface AddVehicleDriverScreenProps {
  onNext: () => void;
  onPrevious: () => void;
}

const AddVehicleDriverScreen: React.FC<AddVehicleDriverScreenProps> = ({ onNext, onPrevious }) => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  
  const [formData, setFormData] = useState<Omit<Vehicle, "id" | "documentsUploaded">>({
    registrationNumber: "",
    type: "",
    make: "",
    model: "",
    yearOfManufacture: "",
    driverName: "",
    driverPhone: "",
    driverLicense: "",
    insuranceExpiry: "",
  });
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "V001",
      registrationNumber: "MH01AB1234",
      type: "LCV",
      make: "Tata",
      model: "Ace",
      yearOfManufacture: "2020",
      driverName: "Rajesh Kumar",
      driverPhone: "9876543210",
      driverLicense: "DL123456789",
      insuranceExpiry: "2025-12-31",
      documentsUploaded: true
    }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVehicle = () => {
    // Reset form data
    setFormData({
      registrationNumber: "",
      type: "",
      make: "",
      model: "",
      yearOfManufacture: "",
      driverName: "",
      driverPhone: "",
      driverLicense: "",
      insuranceExpiry: "",
    });
    
    setEditingVehicle(null);
    setShowForm(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setFormData({
      registrationNumber: vehicle.registrationNumber,
      type: vehicle.type,
      make: vehicle.make,
      model: vehicle.model,
      yearOfManufacture: vehicle.yearOfManufacture,
      driverName: vehicle.driverName,
      driverPhone: vehicle.driverPhone,
      driverLicense: vehicle.driverLicense,
      insuranceExpiry: vehicle.insuranceExpiry,
    });
    
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields = Object.keys(formData) as Array<keyof typeof formData>;
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingVehicle) {
      // Update existing vehicle
      setVehicles(vehicles.map(vehicle => 
        vehicle.id === editingVehicle.id 
          ? { ...vehicle, ...formData } 
          : vehicle
      ));
      
      toast({
        title: "Vehicle Updated",
        description: `Vehicle ${formData.registrationNumber} has been updated`,
      });
    } else {
      // Add new vehicle
      const newVehicle: Vehicle = {
        id: `V${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        ...formData,
        documentsUploaded: false
      };
      
      setVehicles([...vehicles, newVehicle]);
      
      toast({
        title: "Vehicle Added",
        description: `Vehicle ${formData.registrationNumber} has been added`,
      });
    }
    
    setShowForm(false);
  };

  const handleUploadDocuments = (vehicleId: string) => {
    // Mock document upload
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === vehicleId 
        ? { ...vehicle, documentsUploaded: true } 
        : vehicle
    ));
    
    toast({
      title: "Documents Uploaded",
      description: "Vehicle documents have been uploaded successfully",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
            <Car size={40} className="text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mt-4">Vehicle & Driver Management</h2>
        <p className="text-gray-600 mt-2">Add and manage your vehicles and drivers</p>
      </div>
      
      {!showForm ? (
        <>
          <div className="flex justify-end">
            <Button onClick={handleAddVehicle}>
              <Plus size={18} className="mr-2" />
              Add New Vehicle
            </Button>
          </div>
          
          <div className="space-y-4">
            {vehicles.length > 0 ? (
              vehicles.map(vehicle => (
                <Card key={vehicle.id} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-4">
                      <div className="font-medium text-lg">{vehicle.registrationNumber}</div>
                      <Button variant="ghost" size="sm" onClick={() => handleEditVehicle(vehicle)}>
                        <Edit size={16} className="mr-1" /> Edit
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">Vehicle Details</div>
                        <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                        <div className="text-sm">{vehicle.type} | Year: {vehicle.yearOfManufacture}</div>
                        <div className="text-sm mt-1">Insurance: {vehicle.insuranceExpiry}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-gray-500">Driver Details</div>
                        <div className="font-medium">{vehicle.driverName}</div>
                        <div className="text-sm">Phone: {vehicle.driverPhone}</div>
                        <div className="text-sm">License: {vehicle.driverLicense}</div>
                      </div>
                    </div>
                    
                    {!vehicle.documentsUploaded && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleUploadDocuments(vehicle.id)}
                      >
                        <Upload size={18} className="mr-2" />
                        Upload Vehicle Documents
                      </Button>
                    )}
                    
                    {vehicle.documentsUploaded && (
                      <div className="text-center py-2 px-4 bg-green-50 text-green-700 rounded border border-green-200 text-sm">
                        All documents uploaded successfully
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 border rounded-lg">
                <div className="text-lg font-medium text-gray-500">No vehicles added yet</div>
                <p className="text-sm text-gray-400 mt-1">Click on 'Add New Vehicle' to add your first vehicle</p>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="w-1/2" onClick={onPrevious}>
              Back
            </Button>
            <Button className="w-1/2" onClick={onNext}>
              <ArrowRight className="mr-2" size={18} />
              Trip History
            </Button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Vehicle Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  placeholder="Enter vehicle registration number"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Vehicle Type</Label>
                <Input
                  id="type"
                  name="type"
                  placeholder="E.g., LCV, HCV, Truck"
                  value={formData.type}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  name="make"
                  placeholder="E.g., Tata, Mahindra"
                  value={formData.make}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  name="model"
                  placeholder="E.g., Ace, Bolero"
                  value={formData.model}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearOfManufacture">Year of Manufacture</Label>
                <Input
                  id="yearOfManufacture"
                  name="yearOfManufacture"
                  placeholder="E.g., 2020"
                  value={formData.yearOfManufacture}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insuranceExpiry">Insurance Expiry Date</Label>
                <Input
                  id="insuranceExpiry"
                  name="insuranceExpiry"
                  type="date"
                  value={formData.insuranceExpiry}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Driver Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driverName">Driver Name</Label>
                <Input
                  id="driverName"
                  name="driverName"
                  placeholder="Enter driver's full name"
                  value={formData.driverName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="driverPhone">Driver Phone Number</Label>
                <Input
                  id="driverPhone"
                  name="driverPhone"
                  placeholder="Enter driver's phone number"
                  value={formData.driverPhone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="driverLicense">Driver License Number</Label>
                <Input
                  id="driverLicense"
                  name="driverLicense"
                  placeholder="Enter driver's license number"
                  value={formData.driverLicense}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button type="button" variant="outline" className="w-1/2" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button type="submit" className="w-1/2">
              {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddVehicleDriverScreen;
