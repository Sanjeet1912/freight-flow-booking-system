
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { History, Search, Download, Upload } from "lucide-react";

interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  vehicle: string;
  registrationNumber: string;
  amount: number;
  status: "completed" | "in-transit" | "payment-pending" | "payment-done";
  podUploaded: boolean;
}

interface TripHistoryScreenProps {
  onPrevious: () => void;
}

const TripHistoryScreen: React.FC<TripHistoryScreenProps> = ({ onPrevious }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: "IND-78901",
      from: "Mumbai",
      to: "Pune",
      date: "2025-04-10",
      vehicle: "LCV",
      registrationNumber: "MH01AB1234",
      amount: 5000,
      status: "payment-done",
      podUploaded: true
    },
    {
      id: "IND-78902",
      from: "Delhi",
      to: "Jaipur",
      date: "2025-04-15",
      vehicle: "HCV",
      registrationNumber: "MH01AB1234",
      amount: 8000,
      status: "payment-pending",
      podUploaded: true
    },
    {
      id: "IND-78903",
      from: "Bangalore",
      to: "Chennai",
      date: "2025-04-18",
      vehicle: "LCV",
      registrationNumber: "MH01AB1234",
      amount: 6000,
      status: "in-transit",
      podUploaded: false
    }
  ]);

  const [filteredTrips, setFilteredTrips] = useState(trips);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredTrips(trips);
      return;
    }
    
    const filtered = trips.filter(trip => 
      trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredTrips(filtered);
  };

  const handleUploadPOD = (tripId: string) => {
    // Mock POD upload
    setTrips(trips.map(trip => 
      trip.id === tripId ? { ...trip, podUploaded: true } : trip
    ));
    
    // Also update in filteredTrips
    setFilteredTrips(filteredTrips.map(trip => 
      trip.id === tripId ? { ...trip, podUploaded: true } : trip
    ));
    
    toast({
      title: "POD Uploaded",
      description: `Proof of Delivery for trip ${tripId} has been uploaded successfully`,
    });
  };

  const handleViewPOD = (tripId: string) => {
    toast({
      title: "Viewing POD",
      description: `Viewing Proof of Delivery for trip ${tripId}`,
    });
  };

  const getStatusBadgeClass = (status: Trip["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-transit":
        return "bg-blue-100 text-blue-800";
      case "payment-pending":
        return "bg-yellow-100 text-yellow-800";
      case "payment-done":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: Trip["status"]) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-transit":
        return "In Transit";
      case "payment-pending":
        return "Payment Pending";
      case "payment-done":
        return "Payment Done";
      default:
        return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
            <History size={40} className="text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mt-4">Trip History</h2>
        <p className="text-gray-600 mt-2">View your past trips and payment status</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search by trip ID, origin, or destination"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search size={18} className="mr-2" />
          Search
        </Button>
      </div>
      
      <div className="space-y-4">
        {filteredTrips.length > 0 ? (
          filteredTrips.map(trip => (
            <Card key={trip.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between mb-3">
                  <div className="font-medium">{trip.id}</div>
                  <div 
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClass(trip.status)}`}
                  >
                    {getStatusLabel(trip.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  <div>
                    <div className="text-xs text-gray-500">From</div>
                    <div className="font-medium">{trip.from}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">To</div>
                    <div className="font-medium">{trip.to}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Date</div>
                    <div className="font-medium">{trip.date}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Vehicle</div>
                    <div className="font-medium">{trip.registrationNumber}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="text-xs text-gray-500">Payment Amount</div>
                    <div className="font-medium">₹{trip.amount}</div>
                  </div>
                  
                  {trip.status === "in-transit" && !trip.podUploaded && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUploadPOD(trip.id)}
                    >
                      <Upload size={16} className="mr-2" />
                      Upload POD
                    </Button>
                  )}
                  
                  {trip.podUploaded && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewPOD(trip.id)}
                    >
                      <Download size={16} className="mr-2" />
                      View POD
                    </Button>
                  )}
                </div>
                
                {trip.status === "payment-done" && (
                  <div className="bg-green-50 border border-green-200 rounded p-2 text-green-700 text-sm">
                    Payment of ₹{trip.amount} has been processed on {trip.date}
                  </div>
                )}
                
                {trip.status === "payment-pending" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-yellow-700 text-sm">
                    Payment of ₹{trip.amount} is pending and will be processed soon
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 border rounded-lg">
            <div className="text-lg font-medium text-gray-500">No trips found</div>
            <p className="text-sm text-gray-400 mt-1">No trips match your search criteria</p>
          </div>
        )}
      </div>
      
      <div>
        <Button variant="outline" className="w-full" onClick={onPrevious}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default TripHistoryScreen;
