
import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { 
  Truck, 
  Package, 
  CreditCard, 
  Users, 
  Warehouse, 
  Car,
  LayoutDashboard,
} from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title = "FreightFlow" }: MainLayoutProps) => {
  const menuItems = [
    { icon: LayoutDashboard, title: "Dashboard", to: "/" },
    { icon: Truck, title: "FTL Booking", to: "/booking" },
    { icon: Package, title: "FTL Trips", to: "/trips" },
    { icon: CreditCard, title: "Payment Dashboard", to: "/payments" },
    { icon: Users, title: "Client Management", to: "/clients" },
    { icon: Warehouse, title: "Supplier Management", to: "/suppliers" },
    { icon: Car, title: "Vehicle Management", to: "/vehicles" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">FreightFlow</h2>
              <div className="hidden md:flex items-center gap-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1920px] mx-auto">
        <header className="bg-white border-b">
          <div className="px-4 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
        </header>
        
        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

