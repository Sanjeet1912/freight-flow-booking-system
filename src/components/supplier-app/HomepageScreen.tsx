
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check, Home, ArrowRight } from "lucide-react";

interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  vehicle: string;
  rate: number;
  loadingCharges: number;
  unloadingCharges: number;
}

interface HomepageScreenProps {
  onNext: () => void;
  onPrevious: () => void;
}

const HomepageScreen: React.FC<HomepageScreenProps> = ({ onNext, onPrevious }) => {
  const { toast } = useToast();
  const [location, setLocation] = useState("Mumbai");
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: "IND-12345",
      from: "Mumbai",
      to: "Pune",
      date: "2025-05-01",
      vehicle: "LCV",
      rate: 5000,
      loadingCharges: 500,
      unloadingCharges: 500
    },
    {
      id: "IND-12346",
      from: "Mumbai",
      to: "Nashik",
      date: "2025-05-02",
      vehicle: "HCV",
      rate: 8000,
      loadingCharges: 800,
      unloadingCharges: 800
    },
    {
      id: "IND-12347",
      from: "Thane",
      to: "Mumbai",
      date: "2025-05-03",
      vehicle: "LCV",
      rate: 3000,
      loadingCharges: 400,
      unloadingCharges: 400
    }
  ]);
  
  const [bidRates, setBidRates] = useState<Record<string, number>>({});

  const handleBid = (tripId: string, defaultRate: number) => {
    const bidAmount = bidRates[tripId] || defaultRate;
    
    toast({
      title: "Bid Placed",
      description: `Your bid of ₹${bidAmount} has been placed for trip ${tripId}`,
    });
    
    // Remove the trip from the list after bidding
    setTrips(trips.filter(trip => trip.id !== tripId));
  };

  const handleChangeLocation = () => {
    const locations = ["Mumbai", "Pune", "Nashik", "Thane", "Navi Mumbai"];
    const newLocation = locations[Math.floor(Math.random() * locations.length)];
    
    setLocation(newLocation);
    toast({
      title: "Location Updated",
      description: `Your location has been updated to ${newLocation}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
            <Home size={40} className="text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mt-4">Available Trips</h2>
        <p className="text-gray-600 mt-2">View and bid on available trips</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm">
          Current Location: <span className="font-bold">{location}</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleChangeLocation}>
          Change Location
        </Button>
      </div>
      
      <div className="space-y-4">
        {trips.length > 0 ? (
          trips.map(trip => (
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
                
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="col-span-3 sm:col-span-1">
                    <div className="text-xs text-gray-500">Base Rate</div>
                    <div className="font-medium">₹{trip.rate}</div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <div className="text-xs text-gray-500">Loading Charges</div>
                    <div className="font-medium">₹{trip.loadingCharges}</div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <div className="text-xs text-gray-500">Unloading Charges</div>
                    <div className="font-medium">₹{trip.unloadingCharges}</div>
                  </div>
                </div>
                
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Your Bid (₹)</div>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded py-1 px-2"
                      placeholder="Enter your bid amount"
                      defaultValue={trip.rate}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setBidRates({ ...bidRates, [trip.id]: value });
                      }}
                    />
                  </div>
                  <Button onClick={() => handleBid(trip.id, trip.rate)}>
                    Place Bid
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 border rounded-lg">
            <div className="text-lg font-medium text-gray-500">No trips available</div>
            <p className="text-sm text-gray-400 mt-1">Check back later for new trips</p>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        <Button variant="outline" className="w-1/2" onClick={onPrevious}>
          Back
        </Button>
        <Button className="w-1/2" onClick={onNext}>
          <ArrowRight className="mr-2" size={18} />
          Trip Acceptance
        </Button>
      </div>
    </div>
  );
};

export default HomepageScreen;
