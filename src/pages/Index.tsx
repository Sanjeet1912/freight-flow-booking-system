
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trips, clients, suppliers, vehicles } from "@/data/mockData";
import { 
  PackageCheck, 
  Clock, 
  AlertTriangle, 
  CreditCard,
  Users,
  Truck,
  Warehouse
} from "lucide-react";

const Index = () => {
  // Count trips by status
  const bookedTrips = trips.filter(trip => trip.status === "Booked").length;
  const inTransitTrips = trips.filter(trip => trip.status === "In Transit").length;
  const completedTrips = trips.filter(trip => trip.status === "Completed").length;
  
  // Calculate pending payments
  const pendingAdvancePayments = trips.filter(trip => trip.advancePaymentStatus !== "Paid").length;
  const pendingBalancePayments = trips.filter(trip => trip.podUploaded && trip.balancePaymentStatus !== "Paid").length;

  return (
    <MainLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
            <PackageCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trips.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Trips created in system
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inTransitTrips}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Trips currently in transit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAdvancePayments + pendingBalancePayments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Payments waiting for processing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">POD Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trips.filter(trip => !trip.podUploaded && trip.status === "Delivered").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Trips waiting for POD upload
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Trip Status Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-freight-600 rounded-full mr-2"></div>
                <div className="flex-1">Booked</div>
                <div className="font-medium">{bookedTrips}</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                <div className="flex-1">In Transit</div>
                <div className="font-medium">{inTransitTrips}</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <div className="flex-1">Completed</div>
                <div className="font-medium">{completedTrips}</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <div className="flex-1">Issues Reported</div>
                <div className="font-medium">0</div>
              </div>
            </div>
            
            <div className="mt-6 relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-freight-100 text-freight-800">
                    Trip Completion
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-freight-800">
                    {Math.round((completedTrips / trips.length) * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${(completedTrips / trips.length) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-freight-500"
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-freight-600 rounded-full mr-2"></div>
                <div className="flex-1">Advance Payments (Pending)</div>
                <div className="font-medium">{pendingAdvancePayments}</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                <div className="flex-1">Balance Payments (Pending)</div>
                <div className="font-medium">{pendingBalancePayments}</div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <div className="flex-1">Payments Completed</div>
                <div className="font-medium">
                  {trips.filter(trip => trip.balancePaymentStatus === "Paid").length}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">Total Revenue</div>
                <div className="text-xl font-bold mt-1">
                  ₹{trips.reduce((sum, trip) => sum + trip.clientFreight, 0).toLocaleString()}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="text-sm text-gray-500">Total Margin</div>
                <div className="text-xl font-bold mt-1 text-green-600">
                  ₹{trips.reduce((sum, trip) => sum + (trip.clientFreight - trip.supplierFreight), 0).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Clients</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{clients.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Onboarded clients</div>
            <div className="mt-4">
              <a 
                href="/clients"
                className="text-sm text-freight-600 hover:text-freight-800 font-medium"
              >
                View All Clients →
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Suppliers</CardTitle>
            <Warehouse className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{suppliers.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Registered suppliers</div>
            <div className="mt-4">
              <a 
                href="/suppliers"
                className="text-sm text-freight-600 hover:text-freight-800 font-medium"
              >
                View All Suppliers →
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Vehicles</CardTitle>
            <Truck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{vehicles.length}</div>
            <div className="text-sm text-muted-foreground mt-1">Registered vehicles</div>
            <div className="mt-4">
              <a 
                href="/vehicles"
                className="text-sm text-freight-600 hover:text-freight-800 font-medium"
              >
                View All Vehicles →
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;
