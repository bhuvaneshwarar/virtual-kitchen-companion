
import React from "react";
import InventoryTracker from "@/components/inventory/InventoryTracker";
import PageTransition from "@/components/layout/PageTransition";

const Inventory = () => {
  return (
    <PageTransition>
      <div className="container py-8 max-w-6xl">
        <InventoryTracker />
      </div>
    </PageTransition>
  );
};

export default Inventory;
