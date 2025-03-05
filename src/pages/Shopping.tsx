
import React from "react";
import ShoppingList from "@/components/shopping/ShoppingList";
import PageTransition from "@/components/layout/PageTransition";

const Shopping = () => {
  return (
    <PageTransition>
      <div className="container py-8 max-w-6xl">
        <ShoppingList />
      </div>
    </PageTransition>
  );
};

export default Shopping;
