
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";

// Placeholder: You should fetch real trip data using id.
const TripDetailsPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [tab, setTab] = useState("client_freight");

  return (
    <div className="container mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Order Detail: {tripId}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full grid grid-cols-5 mb-4">
              <TabsTrigger value="client_freight">Client Freight</TabsTrigger>
              <TabsTrigger value="supplier_freight">Supplier Freight</TabsTrigger>
              <TabsTrigger value="additional_charges">Additional Charges</TabsTrigger>
              <TabsTrigger value="deduction_charges">Deduction Charges</TabsTrigger>
              <TabsTrigger value="platform_fee">LR Charges / Platform Fee</TabsTrigger>
            </TabsList>

            <TabsContent value="client_freight">
              <div className="rounded bg-gray-50 p-6 border">
                <h3 className="font-semibold mb-2">Client Freight (Approved by Client)</h3>
                <div className="text-sm text-gray-500">Show client agreed cost detail here.</div>
              </div>
            </TabsContent>
            <TabsContent value="supplier_freight">
              <div className="rounded bg-gray-50 p-6 border">
                <h3 className="font-semibold mb-2">Supplier Freight (Payable to Supplier)</h3>
                <div className="text-sm text-gray-500">Show supplier cost detail here.</div>
              </div>
            </TabsContent>
            <TabsContent value="additional_charges">
              <div className="rounded bg-gray-50 p-6 border">
                <h3 className="font-semibold mb-2">Additional Charges</h3>
                <div className="text-sm text-gray-500">
                  Add unloading or any extra charge here (will be added to Client & POD supplier freight).
                </div>
              </div>
            </TabsContent>
            <TabsContent value="deduction_charges">
              <div className="rounded bg-gray-50 p-6 border">
                <h3 className="font-semibold mb-2">Deduction Charges</h3>
                <div className="text-sm text-gray-500">
                  Enter deduction/damage reason & amount (deducted from supplier freight).
                </div>
              </div>
            </TabsContent>
            <TabsContent value="platform_fee">
              <div className="rounded bg-gray-50 p-6 border">
                <h3 className="font-semibold mb-2">LR Charges or Platform Fee</h3>
                <div className="text-sm text-gray-500">
                  Enter fee charged to supplier for platform (increases margin).
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripDetailsPage;
