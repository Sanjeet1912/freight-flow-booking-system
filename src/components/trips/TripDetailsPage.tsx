
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { Pencil, Plus } from "lucide-react";
import AddEditTextDialog from "./AddEditTextDialog";
import { Button } from "@/components/ui/button";

const TAB_CONFIG = [
  {
    key: "client_freight",
    label: "Client Freight (Approved by Client)",
    placeholder: "Show client agreed cost detail here.",
  },
  {
    key: "supplier_freight",
    label: "Supplier Freight (Payable to Supplier)",
    placeholder: "Show supplier cost detail here.",
  },
  {
    key: "additional_charges",
    label: "Additional Charges",
    placeholder:
      "Add unloading or any extra charge here (will be added to Client & POD supplier freight).",
  },
  {
    key: "deduction_charges",
    label: "Deduction Charges",
    placeholder:
      "Enter deduction/damage reason & amount (deducted from supplier freight).",
  },
  {
    key: "platform_fee",
    label: "LR Charges or Platform Fee",
    placeholder:
      "Enter fee charged to supplier for platform (increases margin).",
  },
];

const TripDetailsPage = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [tab, setTab] = useState(TAB_CONFIG[0].key);

  // For simplicity, use local state per tab (replace with API later)
  const [details, setDetails] = useState<{ [key: string]: string[] }>({
    client_freight: [],
    supplier_freight: [],
    additional_charges: [],
    deduction_charges: [],
    platform_fee: [],
  });

  // Dialog control state
  const [dialogTab, setDialogTab] = useState<string | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const dialogOpen = dialogTab !== null;

  // Handlers
  const handleAdd = (tabKey: string) => {
    setDialogTab(tabKey);
    setEditIdx(null);
  };

  const handleEdit = (tabKey: string, idx: number) => {
    setDialogTab(tabKey);
    setEditIdx(idx);
  };

  const handleDialogSave = (text: string) => {
    if (dialogTab === null) return;
    setDetails(prev => {
      const arr = prev[dialogTab] || [];
      if (editIdx === null) {
        // Adding new
        return { ...prev, [dialogTab]: [...arr, text] };
      } else {
        // Editing existing
        const copy = [...arr];
        copy[editIdx] = text;
        return { ...prev, [dialogTab]: copy };
      }
    });
  };

  const handleDialogClose = () => {
    setDialogTab(null);
    setEditIdx(null);
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Order Detail: {tripId}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full grid grid-cols-5 mb-4">
              {TAB_CONFIG.map(tabItem => (
                <TabsTrigger value={tabItem.key} key={tabItem.key}>
                  {tabItem.label.split(" (")[0]}
                </TabsTrigger>
              ))}
            </TabsList>
            {TAB_CONFIG.map(tabItem => (
              <TabsContent value={tabItem.key} key={tabItem.key}>
                <div className="rounded bg-gray-50 p-6 border">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{tabItem.label}</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAdd(tabItem.key)}
                      title="Add"
                    >
                      <Plus size={16} />
                      Add
                    </Button>
                  </div>
                  <ul className="space-y-2">
                    {details[tabItem.key] && details[tabItem.key].length > 0 ? (
                      details[tabItem.key].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center bg-white rounded border px-4 py-2"
                        >
                          <span className="break-words">{item}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="ml-2"
                            onClick={() => handleEdit(tabItem.key, idx)}
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </Button>
                        </li>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        {tabItem.placeholder}
                      </div>
                    )}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      {/* Add/Edit Dialog */}
      <AddEditTextDialog
        open={dialogOpen}
        defaultValue={
          dialogOpen && editIdx !== null && dialogTab
            ? details[dialogTab][editIdx]
            : ""
        }
        label={
          dialogOpen && dialogTab
            ? `Enter details for ${TAB_CONFIG.find(t => t.key === dialogTab)?.label.split(" (")[0] || ""}`
            : ""
        }
        onClose={handleDialogClose}
        onSave={handleDialogSave}
      />
    </div>
  );
};

export default TripDetailsPage;
