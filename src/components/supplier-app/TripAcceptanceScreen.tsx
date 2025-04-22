
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check, ArrowRight } from "lucide-react";

interface AssignedTrip {
  id: string;
  from: string;
  to: string;
  date: string;
  vehicle: string;
  rate: number;
  loadingCharges: number;
  unloadingCharges: number;
  status: "assigned" | "accepted" | "rejected";
}

interface TripAcceptanceScreenProps {
  onNext: () => void;
  onPrevious: () => void;
}

const TripAcceptanceScreen: React.FC<TripAcceptanceScreenProps> = ({ onNext, onPrevious }) => {
  const { toast } = useToast();
  const [trips, setTrips] = useState<AssignedTrip[]>([
    {
      id: "IND-54321",
      from: "Mumbai",
      to: "Bangalore",
      date: "2025-05-05",
      vehicle: "HCV",
      rate: 12000,
      loadingCharges: 1000,
      unloadingCharges: 1000,
      status: "assigned",
    },
    {
      id: "IND-54322",
      from: "Delhi",
      to: "Jaipur",
      date: "2025-05-07",
      vehicle: "LCV",
      rate: 6000,
      loadingCharges: 600,
      unloadingCharges: 600,
      status: "assigned",
    }
  ]);

  const handleAccept = (tripId: string) => {
    setTrips(trips.map(trip => 
      trip.id === tripId ? { ...trip, status: "accepted" } : trip
    ));
    
    toast({
      title: "Trip Accepted",
      description: `You have accepted trip ${tripId}`,
    });
  };

  const handleReject = (tripId: string) => {
    setTrips(trips.map(trip => 
      trip.id === tripId ? { ...trip, status: "rejected" } : trip
    ));
    
    toast({
      title: "Trip Rejected",
      description: `You have rejected trip ${tripId}`,
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
            <Check size={40} className="text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mt-4">Trip Acceptance</h2>
        <p className="text-gray-600 mt-2">Review and accept trips assigned to you</p>
      </div>
      
      <div className="space-y-4">
        {trips.filter(trip => trip.status === "assigned").length > 0 ? (
          trips.filter(trip => trip.status === "assigned").map(trip => (
            <Card key={trip.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="col-span-3 sm:col-span-1">
                    <div className="text-xs text-gray-500">Trip ID</div>
                    <div className="font-medium">{trip.id}</div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <div className="text-xs text-gray-500">Date</div>
                    <div className="font-medium">{trip.date}</div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <div className="text-xs text-gray-500">Vehicle Type</div>
                    <div className="font-medium">{trip.vehicle}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{trip.from}</div>
                    <div className="text-xs text-gray-500">Origin</div>
                  </div>
                  <div className="text-xl">→</div>
                  <div className="flex-1 text-right">
                    <div className="text-sm font-medium">{trip.to}</div>
                    <div className="text-xs text-gray-500">Destination</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="col-span-1">
                    <div className="text-xs text-gray-500">Base Rate</div>
                    <div className="font-medium">₹{trip.rate}</div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-xs text-gray-500">Loading Charges</div>
                    <div className="font-medium">₹{trip.loadingCharges}</div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-xs text-gray-500">Unloading Charges</div>
                    <div className="font-medium">₹{trip.unloadingCharges}</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    className="w-1/2 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleReject(trip.id)}
                  >
                    Reject
                  </Button>
                  <Button 
                    className="w-1/2 bg-green-600 hover:bg-green-700"
                    onClick={() => handleAccept(trip.id)}
                  >
                    Accept
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 border rounded-lg">
            <div className="text-lg font-medium text-gray-500">No pending trips</div>
            <p className="text-sm text-gray-400 mt-1">All assigned trips have been processed</p>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">Accepted/Rejected Trips</h3>
        
        {trips.filter(trip => trip.status !== "assigned").map(trip => (
          <Card 
            key={trip.id} 
            className={`shadow-sm ${
              trip.status === "accepted" ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{trip.from} → {trip.to}</div>
                  <div className="text-xs text-gray-500">Trip ID: {trip.id} | Date: {trip.date}</div>
                </div>
                <div 
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    trip.status === "accepted" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {trip.status === "accepted" ? "Accepted" : "Rejected"}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <Button variant="outline" className="w-1/2" onClick={onPrevious}>
          Back
        </Button>
        <Button className="w-1/2" onClick={onNext}>
          <ArrowRight className="mr-2" size={18} />
          Add Vehicle & Driver
        </Button>
      </div>
    </div>
  );
};

export default TripAcceptanceScreen;
