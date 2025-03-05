
import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for our data
export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  tags: string[];
  image: string;
};

export type MealPlan = {
  id: string;
  date: Date;
  meals: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
    snacks?: string[];
  };
};

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: Date;
};

export type ShoppingItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  checked: boolean;
};

// Context type
type KitchenContextType = {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, "id">) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  
  mealPlans: MealPlan[];
  addMealPlan: (mealPlan: Omit<MealPlan, "id">) => void;
  updateMealPlan: (id: string, mealPlan: Partial<MealPlan>) => void;
  deleteMealPlan: (id: string) => void;
  
  inventoryItems: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, "id">) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  
  shoppingItems: ShoppingItem[];
  addShoppingItem: (item: Omit<ShoppingItem, "id">) => void;
  updateShoppingItem: (id: string, item: Partial<ShoppingItem>) => void;
  deleteShoppingItem: (id: string) => void;
  toggleShoppingItem: (id: string) => void;
  
  searchRecipes: (query: string) => Recipe[];
};

// Create the context
const KitchenContext = createContext<KitchenContextType | undefined>(undefined);

// Sample data
const sampleRecipes: Recipe[] = [
  {
    id: "1",
    name: "Avocado Toast",
    description: "A simple, nutritious breakfast that's quick to make and full of healthy fats.",
    ingredients: [
      "2 slices whole grain bread",
      "1 ripe avocado",
      "2 eggs",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "1 tbsp olive oil"
    ],
    instructions: [
      "Toast the bread slices until golden brown.",
      "Cut the avocado in half, remove the pit, and scoop out the flesh into a bowl.",
      "Mash the avocado with a fork, adding salt and pepper to taste.",
      "Spread the mashed avocado on the toast.",
      "Heat olive oil in a pan and fry the eggs to your liking.",
      "Place the fried eggs on top of the avocado toast.",
      "Sprinkle with red pepper flakes if desired."
    ],
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    tags: ["breakfast", "healthy", "quick", "vegetarian"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Classic Pasta Carbonara",
    description: "A traditional Italian pasta dish with eggs, cheese, pancetta and black pepper.",
    ingredients: [
      "350g spaghetti",
      "150g pancetta or guanciale, diced",
      "3 large eggs",
      "75g Pecorino Romano cheese, grated",
      "50g Parmesan cheese, grated",
      "Freshly ground black pepper",
      "1 clove garlic, minced (optional)"
    ],
    instructions: [
      "Bring a large pot of salted water to a boil and cook the spaghetti according to package instructions until al dente.",
      "While the pasta is cooking, heat a large skillet over medium heat. Add the pancetta and cook until crispy, about 8-10 minutes.",
      "In a bowl, whisk together the eggs, grated cheeses, and a generous amount of black pepper.",
      "When the pasta is done, reserve 1 cup of the pasta water, then drain the pasta.",
      "Working quickly, add the hot pasta to the skillet with the pancetta. Toss to combine.",
      "Remove the skillet from the heat and pour in the egg and cheese mixture, stirring rapidly to create a creamy sauce.",
      "Add a splash of the reserved pasta water if needed to loosen the sauce.",
      "Serve immediately with extra grated cheese and black pepper."
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    tags: ["dinner", "Italian", "pasta"],
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Berry Smoothie Bowl",
    description: "A refreshing and nutritious smoothie bowl topped with fresh fruits and granola.",
    ingredients: [
      "1 cup mixed berries (strawberries, blueberries, raspberries)",
      "1 frozen banana",
      "1/2 cup Greek yogurt",
      "1/4 cup almond milk",
      "1 tbsp honey or maple syrup",
      "Toppings: sliced fruits, granola, chia seeds, coconut flakes"
    ],
    instructions: [
      "Add the berries, frozen banana, Greek yogurt, almond milk, and honey to a blender.",
      "Blend until smooth and creamy. The consistency should be thicker than a regular smoothie.",
      "Pour into a bowl.",
      "Arrange your toppings artfully on top of the smoothie base.",
      "Serve immediately and enjoy with a spoon."
    ],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    tags: ["breakfast", "healthy", "quick", "vegetarian"],
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=2098&auto=format&fit=crop"
  }
];

const sampleMealPlans: MealPlan[] = [
  {
    id: "1",
    date: new Date(),
    meals: {
      breakfast: "1", // Avocado Toast ID
      lunch: "3", // Berry Smoothie Bowl ID
      dinner: "2" // Pasta Carbonara ID
    }
  }
];

const sampleInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Eggs",
    category: "Dairy & Eggs",
    quantity: 6,
    unit: "pcs"
  },
  {
    id: "2",
    name: "Milk",
    category: "Dairy & Eggs",
    quantity: 1,
    unit: "liter",
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 5))
  },
  {
    id: "3",
    name: "Bread",
    category: "Bakery",
    quantity: 1,
    unit: "loaf",
    expiryDate: new Date(new Date().setDate(new Date().getDate() + 3))
  }
];

const sampleShoppingItems: ShoppingItem[] = [
  {
    id: "1",
    name: "Avocados",
    category: "Produce",
    quantity: 3,
    unit: "pcs",
    checked: false
  },
  {
    id: "2",
    name: "Pasta",
    category: "Dry Goods",
    quantity: 1,
    unit: "pkg",
    checked: false
  }
];

// Provider component
export const KitchenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization with local storage or sample data
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : sampleRecipes;
  });
  
  const [mealPlans, setMealPlans] = useState<MealPlan[]>(() => {
    const saved = localStorage.getItem("mealPlans");
    const parsed = saved ? JSON.parse(saved) : sampleMealPlans;
    // Convert date strings back to Date objects
    return parsed.map((plan: any) => ({
      ...plan,
      date: new Date(plan.date)
    }));
  });
  
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem("inventoryItems");
    const parsed = saved ? JSON.parse(saved) : sampleInventoryItems;
    // Convert date strings back to Date objects
    return parsed.map((item: any) => ({
      ...item,
      expiryDate: item.expiryDate ? new Date(item.expiryDate) : undefined
    }));
  });
  
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem("shoppingItems");
    return saved ? JSON.parse(saved) : sampleShoppingItems;
  });
  
  // Save to local storage when state changes
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);
  
  useEffect(() => {
    localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
  }, [mealPlans]);
  
  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(inventoryItems));
  }, [inventoryItems]);
  
  useEffect(() => {
    localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
  }, [shoppingItems]);
  
  // Functions for recipe management
  const addRecipe = (recipe: Omit<Recipe, "id">) => {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString()
    };
    setRecipes(prev => [...prev, newRecipe]);
  };
  
  const updateRecipe = (id: string, recipe: Partial<Recipe>) => {
    setRecipes(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...recipe } : item
      )
    );
  };
  
  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(item => item.id !== id));
  };
  
  // Functions for meal plan management
  const addMealPlan = (mealPlan: Omit<MealPlan, "id">) => {
    const newMealPlan = {
      ...mealPlan,
      id: Date.now().toString()
    };
    setMealPlans(prev => [...prev, newMealPlan]);
  };
  
  const updateMealPlan = (id: string, mealPlan: Partial<MealPlan>) => {
    setMealPlans(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...mealPlan } : item
      )
    );
  };
  
  const deleteMealPlan = (id: string) => {
    setMealPlans(prev => prev.filter(item => item.id !== id));
  };
  
  // Functions for inventory management
  const addInventoryItem = (item: Omit<InventoryItem, "id">) => {
    const newItem = {
      ...item,
      id: Date.now().toString()
    };
    setInventoryItems(prev => [...prev, newItem]);
  };
  
  const updateInventoryItem = (id: string, item: Partial<InventoryItem>) => {
    setInventoryItems(prev => 
      prev.map(i => 
        i.id === id ? { ...i, ...item } : i
      )
    );
  };
  
  const deleteInventoryItem = (id: string) => {
    setInventoryItems(prev => prev.filter(item => item.id !== id));
  };
  
  // Functions for shopping list management
  const addShoppingItem = (item: Omit<ShoppingItem, "id">) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      checked: false
    };
    setShoppingItems(prev => [...prev, newItem]);
  };
  
  const updateShoppingItem = (id: string, item: Partial<ShoppingItem>) => {
    setShoppingItems(prev => 
      prev.map(i => 
        i.id === id ? { ...i, ...item } : i
      )
    );
  };
  
  const deleteShoppingItem = (id: string) => {
    setShoppingItems(prev => prev.filter(item => item.id !== id));
  };
  
  const toggleShoppingItem = (id: string) => {
    setShoppingItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  // Function for recipe search
  const searchRecipes = (query: string): Recipe[] => {
    if (!query.trim()) return recipes;
    
    const lowerCaseQuery = query.toLowerCase();
    return recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(lowerCaseQuery) ||
      recipe.description.toLowerCase().includes(lowerCaseQuery) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerCaseQuery))
    );
  };
  
  // Context value
  const value = {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    
    mealPlans,
    addMealPlan,
    updateMealPlan,
    deleteMealPlan,
    
    inventoryItems,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    
    shoppingItems,
    addShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
    toggleShoppingItem,
    
    searchRecipes
  };
  
  return (
    <KitchenContext.Provider value={value}>
      {children}
    </KitchenContext.Provider>
  );
};

// Custom hook to use the context
export const useKitchen = () => {
  const context = useContext(KitchenContext);
  if (context === undefined) {
    throw new Error("useKitchen must be used within a KitchenProvider");
  }
  return context;
};
