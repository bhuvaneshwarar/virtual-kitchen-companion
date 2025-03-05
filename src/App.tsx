
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { KitchenProvider } from "@/contexts/KitchenContext";
import Navbar from "@/components/layout/Navbar";
import Index from "./pages/Index";
import Recipes from "./pages/Recipes";
import Planner from "./pages/Planner";
import Inventory from "./pages/Inventory";
import Shopping from "./pages/Shopping";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <KitchenProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)] pt-16">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/shopping" element={<Shopping />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </main>
        </BrowserRouter>
      </KitchenProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
