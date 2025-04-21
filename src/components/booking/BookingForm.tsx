import React, { useState, useEffect } from "react";
import { useToast } from '@/hooks/use-toast';
import { 
  clients, 
  suppliers, 
  vehicles, 
  vehicleTypes, 
  vehicleSizes, 
  vehicleCapacities, 
  axleTypes, 
  materialTypes, 
  weightUnits,
  addressTypes
} from "@/data/mockData";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
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
import { Plus, Trash, Save } from "lucide-react";

interface Material {
  id: string;
  name: string;
  weight: number;
  unit: "MT" | "KG";
  ratePerMT: number;
}

const BookingForm = () => {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"booking" | "vehicle" | "documentation">("booking");

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedClientData, setSelectedClientData] = useState<any>(null);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedVehicleData, setSelectedVehicleData] = useState<any>(null);
  const [materials, setMaterials] = useState<Material[]>([{ 
    id: "1", 
    name: "", 
    weight: 0, 
    unit: "MT", 
    ratePerMT: 0 
  }]);
  const [destinationAddress, setDestinationAddress] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationAddrType, setDestinationAddrType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverNumber, setDriverNumber] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [clientFreight, setClientFreight] = useState(0);
  const [supplierFreight, setSupplierFreight] = useState(0);
  const [advancePercentage, setAdvancePercentage] = useState(30);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleSize, setVehicleSize] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [axleType, setAxleType] = useState("");
  const [lrNumbers, setLrNumbers] = useState<string[]>([""]);
  const [gsmTracking, setGsmTracking] = useState(true);

  useEffect(() => {
    if (selectedClient) {
      const client = clients.find(client => client.id === selectedClient);
      if (client) {
        setSelectedClientData(client);
      }
    } else {
      setSelectedClientData(null);
    }
  }, [selectedClient]);

  useEffect(() => {
    if (selectedVehicle) {
      const vehicle = vehicles.find(vehicle => vehicle.id === selectedVehicle);
      if (vehicle) {
        setSelectedVehicleData(vehicle);
        setVehicleNumber(vehicle.registrationNumber);
        setDriverName(vehicle.driverName);
        setDriverNumber(vehicle.driverPhone);
        setVehicleType(vehicle.vehicleType);
        setVehicleSize(vehicle.vehicleSize);
        setVehicleCapacity(vehicle.vehicleCapacity);
        setAxleType(vehicle.axleType);
      }
    } else {
      setSelectedVehicleData(null);
      setVehicleNumber("");
      setDriverName("");
      setDriverNumber("");
    }
  }, [selectedVehicle]);

  useEffect(() => {
    const totalMaterialCost = materials.reduce((total, material) => {
      return total + (material.weight * material.ratePerMT);
    }, 0);
    
    setClientFreight(totalMaterialCost);
  }, [materials]);

  useEffect(() => {
    setAdvanceAmount((supplierFreight * advancePercentage) / 100);
    setBalanceAmount(supplierFreight - ((supplierFreight * advancePercentage) / 100));
  }, [supplierFreight, advancePercentage]);

  const handleMaterialChange = (index: number, field: keyof Material, value: any) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };
    setMaterials(updatedMaterials);
  };

  const addMaterial = () => {
    setMaterials([...materials, { 
      id: `${materials.length + 1}`, 
      name: "", 
      weight: 0, 
      unit: "MT", 
      ratePerMT: 0 
    }]);
  };

  const removeMaterial = (index: number) => {
    if (materials.length > 1) {
      setMaterials(materials.filter((_, i) => i !== index));
    }
  };

  const addLrNumber = () => {
    setLrNumbers([...lrNumbers, ""]);
  };

  const removeLrNumber = (index: number) => {
    if (lrNumbers.length > 1) {
      setLrNumbers(lrNumbers.filter((_, i) => i !== index));
    }
  };

  const updateLrNumber = (index: number, value: string) => {
    const updatedLrNumbers = [...lrNumbers];
    updatedLrNumbers[index] = value;
    setLrNumbers(updatedLrNumbers);
  };

  const handleConfirmBooking = () => {
    if (!selectedClient || !selectedSupplier || !vehicleNumber || !pickupDate || 
        !destinationAddress || !destinationCity || !clientFreight || !supplierFreight) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields before confirming booking.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking Confirmed",
      description: `Booking has been successfully created with Order ID: FTL-${Date.now()}`,
    });
  };

  const handleContinueBooking = () => {
    if (activeTab === "booking") {
      setActiveTab("vehicle");
    } else if (activeTab === "vehicle") {
      setActiveTab("documentation");
    }
  };

  return (
    <div className="container mx-auto">
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as typeof activeTab)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="booking">Basic Info</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle & Material</TabsTrigger>
          <TabsTrigger value="documentation">Documentation & Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="booking" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>Select client and address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="client">Client Name*</label>
                  <Select 
                    value={selectedClient} 
                    onValueChange={setSelectedClient}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="addressType">Address Type</label>
                  <Input 
                    id="addressType" 
                    value={selectedClientData?.addressType || ""} 
                    disabled 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="clientCity">Client City</label>
                  <Input 
                    id="clientCity" 
                    value={selectedClientData?.city || ""} 
                    disabled 
                  />
                </div>

                <div className="form-group col-span-1 md:col-span-2 lg:col-span-3">
                  <label className="form-label" htmlFor="loadingAddress">Loading Address</label>
                  <Input 
                    id="loadingAddress" 
                    value={selectedClientData?.address || ""} 
                    disabled 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="destinationAddress">Destination Address*</label>
                  <Input 
                    id="destinationAddress" 
                    value={destinationAddress} 
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    placeholder="Enter destination address"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="destinationCity">Destination City*</label>
                  <Input 
                    id="destinationCity" 
                    value={destinationCity} 
                    onChange={(e) => setDestinationCity(e.target.value)} 
                    placeholder="Enter destination city"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="destinationAddrType">Destination Address Type*</label>
                  <Select 
                    value={destinationAddrType} 
                    onValueChange={setDestinationAddrType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {addressTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
              <CardDescription>Select supplier details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="supplier">Supplier Name*</label>
                  <Select 
                    value={selectedSupplier} 
                    onValueChange={setSelectedSupplier}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map(supplier => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pickupDate">Pickup Date*</label>
                  <Input 
                    id="pickupDate" 
                    type="date" 
                    value={pickupDate} 
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pickupTime">Pickup Time*</label>
                  <Input 
                    id="pickupTime" 
                    type="time" 
                    value={pickupTime} 
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
              <CardDescription>Select vehicle and driver details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">Registered Vehicle</label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles
                        .filter(v => selectedSupplier ? v.supplierId === selectedSupplier : true)
                        .map(vehicle => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.registrationNumber} - {vehicle.vehicleType}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="vehicleNumber">Vehicle Number*</label>
                  <Input 
                    id="vehicleNumber" 
                    value={vehicleNumber} 
                    onChange={(e) => setVehicleNumber(e.target.value)} 
                    placeholder="Enter vehicle number"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="driverName">Driver Name*</label>
                  <Input 
                    id="driverName" 
                    value={driverName} 
                    onChange={(e) => setDriverName(e.target.value)} 
                    placeholder="Enter driver name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="driverNumber">Driver Number*</label>
                  <Input 
                    id="driverNumber" 
                    value={driverNumber} 
                    onChange={(e) => setDriverNumber(e.target.value)} 
                    placeholder="Enter driver number"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="vehicleType">Vehicle Type*</label>
                  <Select value={vehicleType} onValueChange={setVehicleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="vehicleSize">Vehicle Size*</label>
                  <Select value={vehicleSize} onValueChange={setVehicleSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleSizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="vehicleCapacity">Vehicle Capacity*</label>
                  <Select value={vehicleCapacity} onValueChange={setVehicleCapacity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleCapacities.map(capacity => (
                        <SelectItem key={capacity} value={capacity}>{capacity}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="axleType">Axle Type*</label>
                  <Select value={axleType} onValueChange={setAxleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {axleTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Material Information</CardTitle>
              <CardDescription>Enter material details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materials.map((material, index) => (
                  <div 
                    key={material.id} 
                    className="grid grid-cols-1 md:grid-cols-5 gap-4 p-3 border rounded-md bg-gray-50"
                  >
                    <div className="form-group md:col-span-1">
                      <label className="form-label">Material Type*</label>
                      <Select 
                        value={material.name} 
                        onValueChange={(value) => handleMaterialChange(index, 'name', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Material" />
                        </SelectTrigger>
                        <SelectContent>
                          {materialTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="form-group md:col-span-1">
                      <label className="form-label">Weight*</label>
                      <Input 
                        type="number" 
                        value={material.weight} 
                        onChange={(e) => handleMaterialChange(index, 'weight', parseFloat(e.target.value))} 
                        placeholder="0.0"
                        min="0"
                      />
                    </div>
                    <div className="form-group md:col-span-1">
                      <label className="form-label">Unit*</label>
                      <Select 
                        value={material.unit} 
                        onValueChange={(value) => handleMaterialChange(index, 'unit', value as "MT" | "KG")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {weightUnits.map(unit => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="form-group md:col-span-1">
                      <label className="form-label">Rate Per MT*</label>
                      <Input 
                        type="number" 
                        value={material.ratePerMT} 
                        onChange={(e) => handleMaterialChange(index, 'ratePerMT', parseFloat(e.target.value))} 
                        placeholder="0.00"
                        min="0"
                      />
                    </div>
                    <div className="flex items-end justify-center md:justify-end space-x-2">
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => removeMaterial(index)}
                        disabled={materials.length === 1}
                        className="h-9 w-9"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={addMaterial}
                >
                  <Plus size={16} className="mr-1" /> Add Material
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Freight Information</CardTitle>
              <CardDescription>Enter freight and payment details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="clientFreight">Client Freight (₹)*</label>
                  <Input 
                    id="clientFreight" 
                    type="number" 
                    value={clientFreight} 
                    onChange={(e) => setClientFreight(parseFloat(e.target.value))} 
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="supplierFreight">Supplier Freight (₹)*</label>
                  <Input 
                    id="supplierFreight" 
                    type="number" 
                    value={supplierFreight} 
                    onChange={(e) => setSupplierFreight(parseFloat(e.target.value))} 
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="margin">Margin (₹)</label>
                  <Input 
                    id="margin" 
                    type="number" 
                    value={clientFreight - supplierFreight} 
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="advancePercentage">Advance Percentage (%)*</label>
                  <Input 
                    id="advancePercentage" 
                    type="number" 
                    value={advancePercentage} 
                    onChange={(e) => setAdvancePercentage(parseFloat(e.target.value))}
                    min="0" 
                    max="100"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="advanceAmount">Advance Supplier Freight (₹)</label>
                  <Input 
                    id="advanceAmount" 
                    type="number" 
                    value={advanceAmount} 
                    disabled 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="balanceAmount">Balance Supplier Freight (₹)</label>
                  <Input 
                    id="balanceAmount" 
                    type="number" 
                    value={balanceAmount} 
                    disabled 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>Add LR numbers, invoices, and e-way bills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">LR Numbers*</h3>
                  {lrNumbers.map((lrNumber, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={lrNumber}
                        onChange={(e) => updateLrNumber(index, e.target.value)}
                        placeholder="Enter LR Number"
                        className="flex-1"
                      />
                      <Input
                        type="file"
                        className="flex-1"
                      />
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => removeLrNumber(index)}
                        disabled={lrNumbers.length === 1}
                        className="h-9 w-9"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={addLrNumber}
                  >
                    <Plus size={16} className="mr-1" /> Add LR Number
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Invoice of Material*</h3>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Invoice Number"
                      className="flex-1"
                    />
                    <Input
                      type="file"
                      className="flex-1"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    <Plus size={16} className="mr-1" /> Add Invoice
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">E-way Bills*</h3>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="E-way Bill Number"
                      className="flex-1"
                    />
                    <Input
                      type="file"
                      className="flex-1"
                    />
                    <Input
                      type="date"
                      placeholder="Expiry Date"
                      className="flex-1"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    <Plus size={16} className="mr-1" /> Add E-way Bill
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Field Operations & Tracking</CardTitle>
              <CardDescription>Assign operations team and enable tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label" htmlFor="foName">Field Ops Name*</label>
                  <Input 
                    id="foName" 
                    placeholder="Enter name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="foPhone">Field Ops Phone*</label>
                  <Input 
                    id="foPhone" 
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="foEmail">Field Ops Email*</label>
                  <Input 
                    id="foEmail" 
                    type="email" 
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group flex items-center space-x-2 col-span-1 md:col-span-3">
                  <input
                    type="checkbox"
                    id="gsmTracking"
                    checked={gsmTracking}
                    onChange={() => setGsmTracking(!gsmTracking)}
                    className="h-4 w-4 text-freight-600 focus:ring-freight-500 border-gray-300 rounded"
                  />
                  <label htmlFor="gsmTracking" className="form-label mb-0">
                    Enable GSM Tracking
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        {activeTab === "documentation" ? (
          <Button
            variant="default"
            size="lg"
            onClick={handleConfirmBooking}
            className="bg-freight-600 hover:bg-freight-700 text-white px-8"
          >
            <Save size={18} className="mr-2" /> Confirm Booking
          </Button>
        ) : (
          <Button
            variant="default"
            size="lg"
            onClick={handleContinueBooking}
            className="bg-freight-600 hover:bg-freight-700 text-white px-8"
          >
            <Save size={18} className="mr-2" /> Continue Booking
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
