
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookingForm from "./components/booking/BookingForm";
import TripsList from "./components/trips/TripsList";
import PaymentDashboard from "./components/payments/PaymentDashboard";
import ClientList from "./components/client/ClientList";
import SupplierList from "./components/supplier/SupplierList";
import VehicleList from "./components/vehicle/VehicleList";
import MainLayout from "./components/layout/MainLayout";
import TripDetailsPage from "@/components/trips/TripDetailsPage";
import SupplierApp from "./pages/SupplierApp";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/booking" element={
                <MainLayout title="FTL Booking">
                  <BookingForm />
                </MainLayout>
              } />
              <Route path="/trips" element={
                <MainLayout title="FTL Trips">
                  <TripsList />
                </MainLayout>
              } />
              <Route path="/payments" element={
                <MainLayout title="Payment Dashboard">
                  <PaymentDashboard />
                </MainLayout>
              } />
              <Route path="/clients" element={
                <MainLayout title="Client Management">
                  <ClientList />
                </MainLayout>
              } />
              <Route path="/suppliers" element={
                <MainLayout title="Supplier Management">
                  <SupplierList />
                </MainLayout>
              } />
              <Route path="/vehicles" element={
                <MainLayout title="Vehicle Management">
                  <VehicleList />
                </MainLayout>
              } />
              <Route path="/trips/:tripId" element={<TripDetailsPage />} />
              <Route path="/supplier-app" element={<SupplierApp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
