
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
  FileText
} from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title = "FreightFlow" }: MainLayoutProps) => {
  const menuItems = [
    { icon: LayoutDashboard, title: "Dashboard", to: "/" },
    { icon: Truck, title: "Create Booking", to: "/booking" },
    { icon: Package, title: "FTL Trips", to: "/trips" },
    { icon: CreditCard, title: "Payments", to: "/payments" },
    { icon: FileText, title: "Invoices", to: "/invoices" },
    { icon: Users, title: "Admin", to: "/admin" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar variant="sidebar" collapsible="icon" className="bg-[#0A4B8F] text-white">
          <SidebarHeader className="border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6" />
              <h2 className="text-lg font-semibold">FTL Ops Dashboard</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.to} 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-white/10 text-white' 
                            : 'text-white/80 hover:bg-white/5 hover:text-white'
                        }`
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
            <div className="px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-gray-500 hover:text-gray-700" />
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;

