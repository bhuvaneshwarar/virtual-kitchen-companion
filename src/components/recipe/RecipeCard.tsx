
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { Recipe } from "@/contexts/KitchenContext";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { name, description, prepTime, cookTime, servings, tags, image } = recipe;
  
  const totalTime = prepTime + cookTime;
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 cursor-pointer",
        "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
      )}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            imageLoaded ? "" : "image-blur-up",
            imageLoaded ? "loaded" : ""
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-lg font-medium mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{servings}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
