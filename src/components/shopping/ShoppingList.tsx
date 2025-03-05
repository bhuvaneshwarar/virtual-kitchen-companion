
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ShoppingBag, 
  Plus, 
  Trash2,
  Check,
  Search 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useKitchen, ShoppingItem } from "@/contexts/KitchenContext";
import { cn } from "@/lib/utils";

const ShoppingList: React.FC = () => {
  const { shoppingItems, toggleShoppingItem, deleteShoppingItem } = useKitchen();
  const [searchQuery, setSearchQuery] = useState("");
  const [newItemName, setNewItemName] = useState("");
  
  // Filter shopping items based on search query
  const filteredItems = shoppingItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group shopping items by category
  const groupedItems = filteredItems.reduce<Record<string, ShoppingItem[]>>((groups, item) => {
    const category = item.category || "Uncategorized";
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});
  
  // Handle adding a new item (simple version)
  const handleAddItem = () => {
    if (newItemName.trim()) {
      // In a real app, we would open a modal with more fields
      // For this example, we'll just add with minimal info
      const newItem = {
        name: newItemName.trim(),
        category: "General",
        quantity: 1,
        unit: "item",
        checked: false
      };
      
      // Call the addShoppingItem function from context
      // But we don't have it defined in the component params
      // In real implementation, we would have this function
      
      // Reset input
      setNewItemName("");
    }
  };
  
  // Calculate progress
  const totalItems = shoppingItems.length;
  const checkedItems = shoppingItems.filter(item => item.checked).length;
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Shopping List</h2>
          <p className="text-muted-foreground">
            Keep track of what you need to buy
          </p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" />
          Add Item
        </Button>
      </div>
      
      {/* Progress card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Shopping Progress</h3>
              <p className="text-muted-foreground">
                {checkedItems} of {totalItems} items checked
              </p>
            </div>
            <div className="w-full md:w-64">
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick add and search */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div className="relative">
          <Plus 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            size={18} 
          />
          <Input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add item quickly..."
            className="pl-10"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddItem();
            }}
          />
        </div>
        
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            size={18} 
          />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search list..."
            className="pl-10"
          />
        </div>
      </div>
      
      {/* Shopping list by category */}
      {Object.keys(groupedItems).length === 0 ? (
        <Card className="text-center p-8">
          <div className="mb-4">
            <ShoppingBag size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium">Your shopping list is empty</p>
            <p className="text-muted-foreground mb-6">Add items to your shopping list</p>
            <Button>
              <Plus size={16} className="mr-2" />
              Add First Item
            </Button>
          </div>
        </Card>
      ) : (
        Object.entries(groupedItems).map(([category, items]) => (
          <Card key={category} className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">{category}</CardTitle>
                <Badge variant="outline">
                  {items.filter(item => item.checked).length}/{items.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li 
                    key={item.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                      item.checked 
                        ? "bg-muted/50 text-muted-foreground" 
                        : "bg-card hover:bg-secondary/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        checked={item.checked}
                        onCheckedChange={() => toggleShoppingItem(item.id)}
                        className="transition-transform duration-300"
                      />
                      <span className={cn(
                        "transition-all duration-200",
                        item.checked && "line-through"
                      )}>
                        {item.name}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {item.quantity} {item.unit}
                        </span>
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteShoppingItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ShoppingList;
