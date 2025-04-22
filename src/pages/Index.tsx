
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Freight Transport Logistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link to="/booking">
          <Card className="h-full transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>FTL Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Create and manage full truckload bookings</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/trips">
          <Card className="h-full transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Trips Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage ongoing and completed trips</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/payments">
          <Card className="h-full transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Payment Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage payments to suppliers and from clients</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/clients">
          <Card className="h-full transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Client Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage client information and relationships</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/suppliers">
          <Card className="h-full transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Supplier Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage supplier information and relationships</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/vehicles">
          <Card className="h-full transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Vehicle Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage vehicle fleet information</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/supplier-app" className="md:col-span-2">
          <Card className="h-full transition-all hover:shadow-lg bg-blue-50 border-blue-200">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle>Supplier App</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-center">Access the Supplier/Associate Mobile App Experience</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Index;
