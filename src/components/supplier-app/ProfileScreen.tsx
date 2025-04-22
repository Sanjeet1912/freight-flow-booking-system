
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, ArrowRight } from "lucide-react";

interface ProfileScreenProps {
  onNext: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNext }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    entityName: "",
    cityName: "",
    pinCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.entityName || !formData.cityName || !formData.pinCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!/^\d{6}$/.test(formData.pinCode)) {
      toast({
        title: "Invalid PIN Code",
        description: "Please enter a valid 6-digit PIN code",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved",
    });
    
    onNext();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={40} className="text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mt-4">Profile Information</h2>
        <p className="text-gray-600 mt-2">Fill your entity details</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="entityName">Entity Name</Label>
          <Input
            id="entityName"
            name="entityName"
            placeholder="Enter your business or entity name"
            value={formData.entityName}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cityName">City</Label>
          <Input
            id="cityName"
            name="cityName"
            placeholder="Enter your city"
            value={formData.cityName}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pinCode">PIN Code</Label>
          <Input
            id="pinCode"
            name="pinCode"
            placeholder="Enter 6-digit PIN code"
            value={formData.pinCode}
            onChange={handleChange}
            maxLength={6}
          />
        </div>
        
        <Button type="submit" className="w-full">
          <ArrowRight className="mr-2" size={18} />
          Continue to KYC
        </Button>
      </form>
    </div>
  );
};

export default ProfileScreen;
