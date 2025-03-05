
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  Refrigerator, 
  Search, 
  Plus, 
  Trash2, 
  Edit,
  AlertCircle 
} from "lucide-react";
import { format, isBefore, addDays } from "date-fns";
import { useKitchen, InventoryItem } from "@/contexts/KitchenContext";
import { cn } from "@/lib/utils";

const InventoryTracker: React.FC = () => {
  const { inventoryItems, deleteInventoryItem } = useKitchen();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter inventory items based on search query
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group inventory items by category
  const groupedItems = filteredItems.reduce<Record<string, InventoryItem[]>>((groups, item) => {
    const category = item.category || "Uncategorized";
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});
  
  // Check if an item is expired or about to expire
  const isExpired = (date?: Date): boolean => {
    if (!date) return false;
    return isBefore(new Date(date), new Date());
  };
  
  const isAboutToExpire = (date?: Date): boolean => {
    if (!date) return false;
    const today = new Date();
    const threeDaysFromNow = addDays(today, 3);
    return !isBefore(new Date(date), today) && isBefore(new Date(date), threeDaysFromNow);
  };
  
  // Render expiry status
  const renderExpiryStatus = (item: InventoryItem) => {
    if (!item.expiryDate) return null;
    
    if (isExpired(item.expiryDate)) {
      return (
        <Badge variant="destructive" className="ml-2">
          Expired
        </Badge>
      );
    }
    
    if (isAboutToExpire(item.expiryDate)) {
      return (
        <Badge variant="outline" className="ml-2 border-amber-500 text-amber-500">
          Expires soon
        </Badge>
      );
    }
    
    return (
      <span className="ml-2 text-xs text-muted-foreground">
        Expires: {format(new Date(item.expiryDate), "MMM d, yyyy")}
      </span>
    );
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Kitchen Inventory</h2>
          <p className="text-muted-foreground">
            Track your ingredients and supplies
          </p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" />
          Add Item
        </Button>
      </div>
      
      <div className="relative mb-6">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          size={18} 
        />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search inventory..."
          className="pl-10"
        />
      </div>
      
      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-3xl font-bold mt-1">{inventoryItems.length}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Refrigerator size={24} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-3xl font-bold mt-1">{Object.keys(groupedItems).length}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Refrigerator size={24} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-3xl font-bold mt-1">
                  {inventoryItems.filter(item => isAboutToExpire(item.expiryDate)).length}
                </p>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-full">
                <AlertCircle size={24} className="text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Inventory table by category */}
      {Object.keys(groupedItems).length === 0 ? (
        <Card className="text-center p-8">
          <div className="mb-4">
            <Refrigerator size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium">Your inventory is empty</p>
            <p className="text-muted-foreground mb-6">Add items to start tracking your kitchen inventory</p>
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
              <CardTitle className="text-lg font-medium">{category}</CardTitle>
              <CardDescription>{items.length} items</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} className={cn(
                      isExpired(item.expiryDate) && "bg-destructive/5"
                    )}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell>
                        {renderExpiryStatus(item)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit size={18} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteInventoryItem(item.id)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default InventoryTracker;
