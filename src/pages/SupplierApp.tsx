
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import LoginScreen from "@/components/supplier-app/LoginScreen";
import ProfileScreen from "@/components/supplier-app/ProfileScreen";
import KycScreen from "@/components/supplier-app/KycScreen";
import HomepageScreen from "@/components/supplier-app/HomepageScreen";
import TripAcceptanceScreen from "@/components/supplier-app/TripAcceptanceScreen";
import AddVehicleDriverScreen from "@/components/supplier-app/AddVehicleDriverScreen";
import TripHistoryScreen from "@/components/supplier-app/TripHistoryScreen";

enum ScreenState {
  LOGIN,
  PROFILE,
  KYC,
  HOMEPAGE,
  TRIP_ACCEPTANCE,
  ADD_VEHICLE_DRIVER,
  TRIP_HISTORY
}

const SupplierApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>(ScreenState.LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen(ScreenState.PROFILE);
  };

  const handleNextScreen = () => {
    if (currentScreen < ScreenState.TRIP_HISTORY) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePreviousScreen = () => {
    if (currentScreen > ScreenState.PROFILE && isLoggedIn) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleNavigateTo = (screen: ScreenState) => {
    if (isLoggedIn || screen === ScreenState.LOGIN) {
      setCurrentScreen(screen);
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case ScreenState.LOGIN:
        return <LoginScreen onLogin={handleLogin} />;
      case ScreenState.PROFILE:
        return <ProfileScreen onNext={handleNextScreen} />;
      case ScreenState.KYC:
        return <KycScreen onNext={handleNextScreen} onPrevious={handlePreviousScreen} />;
      case ScreenState.HOMEPAGE:
        return <HomepageScreen onNext={handleNextScreen} onPrevious={handlePreviousScreen} />;
      case ScreenState.TRIP_ACCEPTANCE:
        return <TripAcceptanceScreen onNext={handleNextScreen} onPrevious={handlePreviousScreen} />;
      case ScreenState.ADD_VEHICLE_DRIVER:
        return <AddVehicleDriverScreen onNext={handleNextScreen} onPrevious={handlePreviousScreen} />;
      case ScreenState.TRIP_HISTORY:
        return <TripHistoryScreen onPrevious={handlePreviousScreen} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-3xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
          Associate App
        </div>
        {renderCurrentScreen()}
        {isLoggedIn && (
          <div className="flex justify-center gap-2 p-4 bg-gray-50 border-t">
            <button
              onClick={() => handleNavigateTo(ScreenState.PROFILE)}
              className={`px-3 py-1 rounded ${currentScreen === ScreenState.PROFILE ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"}`}
            >
              Profile
            </button>
            <button
              onClick={() => handleNavigateTo(ScreenState.KYC)}
              className={`px-3 py-1 rounded ${currentScreen === ScreenState.KYC ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"}`}
            >
              KYC
            </button>
            <button
              onClick={() => handleNavigateTo(ScreenState.HOMEPAGE)}
              className={`px-3 py-1 rounded ${currentScreen === ScreenState.HOMEPAGE ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigateTo(ScreenState.TRIP_ACCEPTANCE)}
              className={`px-3 py-1 rounded ${currentScreen === ScreenState.TRIP_ACCEPTANCE ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"}`}
            >
              Trips
            </button>
            <button
              onClick={() => handleNavigateTo(ScreenState.ADD_VEHICLE_DRIVER)}
              className={`px-3 py-1 rounded ${currentScreen === ScreenState.ADD_VEHICLE_DRIVER ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"}`}
            >
              Vehicles
            </button>
            <button
              onClick={() => handleNavigateTo(ScreenState.TRIP_HISTORY)}
              className={`px-3 py-1 rounded ${currentScreen === ScreenState.TRIP_HISTORY ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"}`}
            >
              History
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SupplierApp;
