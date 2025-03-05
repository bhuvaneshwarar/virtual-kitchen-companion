
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { useKitchen, Recipe, MealPlan } from "@/contexts/KitchenContext";
import { cn } from "@/lib/utils";

const MealPlanner: React.FC = () => {
  const { recipes, mealPlans, addMealPlan, updateMealPlan } = useKitchen();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  
  // Generate days for the current week view
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  
  // Navigate between weeks
  const goToPreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };
  
  const goToNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };
  
  // Get meal plan for a specific date
  const getMealPlanForDate = (date: Date): MealPlan | undefined => {
    return mealPlans.find(plan => 
      format(new Date(plan.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };
  
  // Get recipe by ID
  const getRecipeById = (id: string): Recipe | undefined => {
    return recipes.find(recipe => recipe.id === id);
  };
  
  // Handle meal selection change
  const handleMealChange = (date: Date, mealType: string, recipeId: string | null) => {
    const existingPlan = getMealPlanForDate(date);
    
    if (existingPlan) {
      // Update existing meal plan
      const updatedMeals = { ...existingPlan.meals };
      
      if (recipeId) {
        updatedMeals[mealType as keyof typeof updatedMeals] = recipeId;
      } else {
        delete updatedMeals[mealType as keyof typeof updatedMeals];
      }
      
      updateMealPlan(existingPlan.id, { meals: updatedMeals });
    } else if (recipeId) {
      // Create new meal plan
      const meals: any = {};
      meals[mealType] = recipeId;
      
      addMealPlan({
        date: new Date(date),
        meals: meals
      });
    }
  };
  
  // Render meal selection for a specific meal type
  const renderMealSelection = (date: Date, mealType: string, mealTitle: string) => {
    const mealPlan = getMealPlanForDate(date);
    const selectedRecipeId = mealPlan?.meals[mealType as keyof typeof mealPlan.meals] as string | undefined;
    const selectedRecipe = selectedRecipeId ? getRecipeById(selectedRecipeId) : undefined;
    
    return (
      <div className="mb-3">
        <div className="text-sm font-medium mb-1">{mealTitle}</div>
        <Select
          value={selectedRecipeId || ""}
          onValueChange={(value) => handleMealChange(date, mealType, value || null)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a recipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">None</SelectItem>
            {recipes.map((recipe) => (
              <SelectItem key={recipe.id} value={recipe.id}>
                {recipe.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedRecipe && (
          <div className="mt-1 text-xs text-muted-foreground line-clamp-1">
            {selectedRecipe.description}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      {/* Weekly meal planner */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Meal Planner</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                <ChevronLeft size={18} />
              </Button>
              <span className="text-sm font-medium">
                {format(currentWeekStart, "MMM d")} - {format(addDays(currentWeekStart, 6), "MMM d, yyyy")}
              </span>
              <Button variant="outline" size="icon" onClick={goToNextWeek}>
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((date) => {
              const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
              const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
              
              return (
                <div 
                  key={date.toString()}
                  className={cn(
                    "border rounded-lg p-2 transition-all duration-200",
                    isToday && "border-primary",
                    isSelected && "ring-2 ring-primary ring-offset-2"
                  )}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="text-center mb-3">
                    <div className="text-xs text-muted-foreground">{format(date, 'E')}</div>
                    <div className="text-lg font-semibold">{format(date, 'd')}</div>
                  </div>
                  
                  {/* Preview of meals for this day */}
                  <div className="space-y-2">
                    {['breakfast', 'lunch', 'dinner'].map(mealType => {
                      const mealPlan = getMealPlanForDate(date);
                      const recipeId = mealPlan?.meals[mealType as keyof typeof mealPlan.meals];
                      const recipe = recipeId ? getRecipeById(recipeId as string) : null;
                      
                      return (
                        <div key={mealType} className="text-xs truncate">
                          <span className="font-medium text-muted-foreground capitalize">
                            {mealType}:
                          </span>
                          {recipe ? (
                            <span className="ml-1">{recipe.name}</span>
                          ) : (
                            <span className="ml-1 text-muted-foreground italic">None</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Selected day detail */}
      <Card>
        <CardHeader>
          <CardTitle>
            {format(selectedDate, "EEEE, MMMM d")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderMealSelection(selectedDate, "breakfast", "Breakfast")}
          {renderMealSelection(selectedDate, "lunch", "Lunch")}
          {renderMealSelection(selectedDate, "dinner", "Dinner")} 
          
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              <Plus size={16} className="mr-2" />
              Add Custom Meal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlanner;
