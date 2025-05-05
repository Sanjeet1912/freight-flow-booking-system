
import React, { useState } from "react";
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

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={`bg-sidebar h-screen flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 fixed left-0 top-0 z-20 shadow-lg`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white">FreightFlow</h1>
        )}
        {collapsed && (
          <h1 className="text-xl font-bold text-white mx-auto">FF</h1>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <LayoutDashboard size={20} />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/booking" 
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <Truck size={20} />
              {!collapsed && <span>FTL Booking</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/trips" 
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <Package size={20} />
              {!collapsed && <span>FTL Trips</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/payments" 
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <CreditCard size={20} />
              {!collapsed && <span>Payment Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/clients" 
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <Users size={20} />
              {!collapsed && <span>Client Management</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/suppliers" 
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <Warehouse size={20} />
              {!collapsed && <span>Supplier Management</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/vehicles" 
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <Car size={20} />
              {!collapsed && <span>Vehicle Management</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-sidebar-border flex justify-center">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:text-white"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevrons-left"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
