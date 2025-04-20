
import React, { ReactNode } from "react";
import { 
  Sidebar, 
  SidebarProvider, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  SidebarHeader 
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
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar variant="sidebar" collapsible="icon" className="border-r">
          <SidebarHeader className="border-b px-4 py-2">
            <h2 className="text-xl font-semibold">FreightFlow</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.to} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 ${isActive ? 'text-primary' : ''}`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm z-10">
            <div className="px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              <SidebarTrigger />
            </div>
          </header>
          
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
