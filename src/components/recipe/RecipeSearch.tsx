
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeSearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({ 
  onSearch, 
  initialQuery = "" 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  
  // Common recipe tags
  const availableTags = [
    "breakfast", "lunch", "dinner", "vegetarian", "vegan", 
    "healthy", "quick", "dessert", "gluten-free", "italian"
  ];
  
  // Effect to handle search triggering
  useEffect(() => {
    const searchQuery = [query, ...activeTags].filter(Boolean).join(" ");
    onSearch(searchQuery);
  }, [query, activeTags, onSearch]);
  
  const handleTagToggle = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  const clearSearch = () => {
    setQuery("");
    setActiveTags([]);
  };
  
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          size={18} 
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="pl-10 pr-10 py-6 transition-shadow duration-300 focus-within:shadow-md"
        />
        {(query || activeTags.length > 0) && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {availableTags.map(tag => (
          <Badge
            key={tag}
            variant={activeTags.includes(tag) ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all duration-200",
              activeTags.includes(tag) 
                ? "hover:bg-primary/90" 
                : "hover:bg-secondary"
            )}
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
