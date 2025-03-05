
import React from "react";
import MealPlanner from "@/components/planner/MealPlanner";
import PageTransition from "@/components/layout/PageTransition";

const Planner = () => {
  return (
    <PageTransition>
      <div className="container py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meal Planner</h1>
          <p className="text-muted-foreground">
            Plan your meals for the week and stay organized
          </p>
        </div>
        
        <MealPlanner />
      </div>
    </PageTransition>
  );
};

export default Planner;
