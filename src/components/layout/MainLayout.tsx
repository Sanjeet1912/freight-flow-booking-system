
import React, { ReactNode } from "react";
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";
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
    <SidebarProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Sidebar variant="floating" collapsible="none" className="w-full">
          <SidebarContent>
            <SidebarMenu className="flex justify-center space-x-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.to} 
                      className={({ isActive }) => 
                        `flex flex-col items-center ${isActive ? 'text-primary' : ''}`
                      }
                    >
                      <item.icon className="mb-1" />
                      <span className="text-xs">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
