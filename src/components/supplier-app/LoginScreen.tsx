
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LogIn, ArrowRight } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const { toast } = useToast();
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOTP = () => {
    if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }
    
    // Mock sending OTP
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${mobileNumber}`,
    });
    
    setShowOTP(true);
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    // Mock OTP verification
    if (otp === "123456") {
      toast({
        title: "Login Successful",
        description: "Welcome to the Supplier App!",
      });
      onLogin();
    } else {
      toast({
        title: "Incorrect OTP",
        description: "The verification code you entered is incorrect",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-700">Login with Mobile Number</h2>
        <p className="text-gray-600 mt-2">Enter your mobile number to receive an OTP</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <Input
            id="mobile"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full"
            maxLength={10}
            disabled={showOTP}
          />
        </div>

        {!showOTP ? (
          <Button onClick={handleSendOTP} className="w-full" disabled={mobileNumber.length !== 10}>
            <LogIn className="mr-2" size={18} />
            Send OTP
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <p className="text-xs text-gray-500">
                A 6-digit code has been sent to your mobile number
              </p>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full"
                maxLength={6}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button onClick={handleVerifyOTP} className="w-full" disabled={otp.length !== 6}>
                <ArrowRight className="mr-2" size={18} />
                Verify & Login
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowOTP(false);
                  setOtp("");
                }} 
                className="w-full"
              >
                Change Mobile Number
              </Button>
            </div>
            <div className="text-center">
              <button 
                className="text-blue-600 text-sm font-medium hover:underline"
                onClick={() => {
                  toast({
                    title: "OTP Resent",
                    description: `A new verification code has been sent to ${mobileNumber}`,
                  });
                }}
              >
                Didn't receive OTP? Resend
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center text-gray-500 text-sm border-t pt-4 mt-6">
        <p>For demo: use any 10-digit number and OTP "123456"</p>
      </div>
    </div>
  );
};

export default LoginScreen;
