
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { IdCard, Upload, Check, ArrowRight } from "lucide-react";

interface KycScreenProps {
  onNext: () => void;
  onPrevious: () => void;
}

const KycScreen: React.FC<KycScreenProps> = ({ onNext, onPrevious }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    aadharNumber: "",
    panNumber: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    gstNumber: "",
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    aadhar: false,
    pan: false,
    bankDetails: false,
    declaration: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (docType: keyof typeof uploadedDocs) => {
    // Mock file upload
    toast({
      title: "Document Uploaded",
      description: `Your ${docType} document has been uploaded successfully`,
    });
    
    setUploadedDocs(prev => ({ ...prev, [docType]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields = ["aadharNumber", "panNumber", "bankName", "accountNumber", "ifscCode"];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!Object.values(uploadedDocs).every(Boolean)) {
      toast({
        title: "Missing Documents",
        description: "Please upload all required documents",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "KYC Submitted",
      description: "Your KYC information has been submitted for verification",
    });
    
    onNext();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
            <IdCard size={40} className="text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mt-4">KYC Verification</h2>
        <p className="text-gray-600 mt-2">Provide your identification and bank details</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Identity Documents</h3>
          
          <div className="space-y-2">
            <Label htmlFor="aadharNumber">Aadhar Number</Label>
            <Input
              id="aadharNumber"
              name="aadharNumber"
              placeholder="Enter 12-digit Aadhar number"
              value={formData.aadharNumber}
              onChange={handleChange}
              maxLength={12}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">Upload Aadhar Card</span>
              <Button 
                type="button" 
                variant={uploadedDocs.aadhar ? "outline" : "default"} 
                size="sm"
                onClick={() => handleFileUpload("aadhar")}
              >
                {uploadedDocs.aadhar ? <Check size={16} /> : <Upload size={16} />}
                {uploadedDocs.aadhar ? "Uploaded" : "Upload"}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="panNumber">PAN Number</Label>
            <Input
              id="panNumber"
              name="panNumber"
              placeholder="Enter PAN number"
              value={formData.panNumber}
              onChange={handleChange}
              maxLength={10}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">Upload PAN Card</span>
              <Button 
                type="button" 
                variant={uploadedDocs.pan ? "outline" : "default"} 
                size="sm"
                onClick={() => handleFileUpload("pan")}
              >
                {uploadedDocs.pan ? <Check size={16} /> : <Upload size={16} />}
                {uploadedDocs.pan ? "Uploaded" : "Upload"}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Bank Details</h3>
          
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              name="bankName"
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input
              id="ifscCode"
              name="ifscCode"
              placeholder="Enter IFSC code"
              value={formData.ifscCode}
              onChange={handleChange}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">Upload Bank Details Proof</span>
              <Button 
                type="button" 
                variant={uploadedDocs.bankDetails ? "outline" : "default"} 
                size="sm"
                onClick={() => handleFileUpload("bankDetails")}
              >
                {uploadedDocs.bankDetails ? <Check size={16} /> : <Upload size={16} />}
                {uploadedDocs.bankDetails ? "Uploaded" : "Upload"}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">GST Details (Optional)</h3>
          
          <div className="space-y-2">
            <Label htmlFor="gstNumber">GST Number</Label>
            <Input
              id="gstNumber"
              name="gstNumber"
              placeholder="Enter GST number (if applicable)"
              value={formData.gstNumber}
              onChange={handleChange}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">Upload Declaration Form/GST</span>
              <Button 
                type="button" 
                variant={uploadedDocs.declaration ? "outline" : "default"} 
                size="sm"
                onClick={() => handleFileUpload("declaration")}
              >
                {uploadedDocs.declaration ? <Check size={16} /> : <Upload size={16} />}
                {uploadedDocs.declaration ? "Uploaded" : "Upload"}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button type="button" variant="outline" className="w-1/2" onClick={onPrevious}>
            Back to Profile
          </Button>
          <Button type="submit" className="w-1/2">
            <ArrowRight className="mr-2" size={18} />
            Submit KYC
          </Button>
        </div>
      </form>
    </div>
  );
};

export default KycScreen;
