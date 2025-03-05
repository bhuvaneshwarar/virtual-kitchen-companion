
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  ChefHat, 
  Calendar, 
  Refrigerator, 
  ShoppingBag, 
  Menu, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        "hover:bg-secondary group",
        isActive 
          ? "bg-secondary text-foreground font-medium" 
          : "text-muted-foreground"
      )}
    >
      <span className="transition-colors duration-200">
        {icon}
      </span>
      <span className="transition-colors duration-200">{label}</span>
    </NavLink>
  );
};

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen, isMobile]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const navItems = [
    { to: "/", icon: <ChefHat size={20} />, label: "Home" },
    { to: "/recipes", icon: <ChefHat size={20} />, label: "Recipes" },
    { to: "/planner", icon: <Calendar size={20} />, label: "Meal Planner" },
    { to: "/inventory", icon: <Refrigerator size={20} />, label: "Inventory" },
    { to: "/shopping", icon: <ShoppingBag size={20} />, label: "Shopping List" }
  ];
  
  // Desktop Navbar
  if (!isMobile) {
    return (
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <ChefHat size={24} />
            <span className="text-xl font-medium">Kitchen Assistant</span>
          </div>
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem 
                key={item.to} 
                to={item.to} 
                icon={item.icon} 
                label={item.label} 
              />
            ))}
          </nav>
        </div>
      </header>
    );
  }
  
  // Mobile Navbar
  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <ChefHat size={24} />
            <span className="text-xl font-medium">Kitchen Assistant</span>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-secondary"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background transition-opacity duration-300",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full pt-20 p-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                onClick={closeMobileMenu}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
