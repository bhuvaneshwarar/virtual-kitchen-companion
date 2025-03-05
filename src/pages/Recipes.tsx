
import React, { useState } from "react";
import { useKitchen, Recipe } from "@/contexts/KitchenContext";
import RecipeCard from "@/components/recipe/RecipeCard";
import RecipeSearch from "@/components/recipe/RecipeSearch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";

const Recipes = () => {
  const { recipes, searchRecipes } = useKitchen();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  // Handle search
  const handleSearch = (query: string) => {
    const results = searchRecipes(query);
    setFilteredRecipes(results);
  };
  
  // Open recipe detail dialog
  const openRecipeDetail = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };
  
  // Close recipe detail dialog
  const closeRecipeDetail = () => {
    setSelectedRecipe(null);
  };
  
  return (
    <PageTransition>
      <div className="container py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Recipes</h1>
          <p className="text-muted-foreground">
            Discover new recipes or search for your favorites
          </p>
        </div>
        
        <div className="mb-8">
          <RecipeSearch onSearch={handleSearch} />
        </div>
        
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No recipes found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button onClick={() => handleSearch("")}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => openRecipeDetail(recipe)}
              />
            ))}
          </div>
        )}
        
        {/* Recipe Detail Dialog */}
        <Dialog open={!!selectedRecipe} onOpenChange={(open) => !open && closeRecipeDetail()}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedRecipe && (
              <>
                <DialogHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedRecipe.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <DialogTitle className="text-2xl">
                    {selectedRecipe.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedRecipe.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                  <div className="relative h-64 md:h-80 overflow-hidden rounded-lg mb-6">
                    <img
                      src={selectedRecipe.image}
                      alt={selectedRecipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mb-6 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>Prep: {selectedRecipe.prepTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>Cook: {selectedRecipe.cookTime} min</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>Serves: {selectedRecipe.servings}</span>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="ingredients">
                    <TabsList className="mb-4">
                      <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                      <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="ingredients">
                      <ul className="space-y-2">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="rounded-full bg-primary/10 text-primary w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                              •
                            </span>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="instructions">
                      <ol className="space-y-4">
                        {selectedRecipe.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="rounded-full bg-primary/10 text-primary w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <DialogFooter className="gap-2 sm:gap-0 mt-6">
                  <Button variant="outline" onClick={closeRecipeDetail}>
                    Close
                  </Button>
                  <Button>Add to Meal Plan</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default Recipes;
