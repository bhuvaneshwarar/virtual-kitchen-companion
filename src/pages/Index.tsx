
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat, Calendar, Refrigerator, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ChefHat size={24} />,
    title: "Recipe Discovery",
    description: "Browse and search from hundreds of recipes suitable for any occasion.",
    link: "/recipes",
    color: "bg-amber-500/10",
    textColor: "text-amber-500"
  },
  {
    icon: <Calendar size={24} />,
    title: "Meal Planning",
    description: "Plan your meals for the week and get organized with a custom calendar.",
    link: "/planner",
    color: "bg-sky-500/10",
    textColor: "text-sky-500" 
  },
  {
    icon: <Refrigerator size={24} />,
    title: "Inventory Tracking",
    description: "Keep track of the ingredients you have and get notified when they expire.",
    link: "/inventory",
    color: "bg-emerald-500/10",
    textColor: "text-emerald-500"
  },
  {
    icon: <ShoppingBag size={24} />,
    title: "Shopping Lists",
    description: "Generate shopping lists based on your meal plans and inventory.",
    link: "/shopping",
    color: "bg-purple-500/10",
    textColor: "text-purple-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your Virtual Kitchen Assistant
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Simplify your cooking experience with elegant recipe management, 
              meal planning, inventory tracking, and smart shopping lists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the features designed to transform your kitchen experience.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={feature.link} className="block h-full">
                  <Card className="h-full transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className={`${feature.color} p-3 rounded-full w-fit mb-4`}>
                        <span className={feature.textColor}>{feature.icon}</span>
                      </div>
                      <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{feature.description}</p>
                      <div className="flex items-center text-sm font-medium">
                        Explore
                        <ArrowRight size={16} className="ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-muted-foreground">Curated Recipes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Easy</div>
              <div className="text-muted-foreground">Meal Planning</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Smart</div>
              <div className="text-muted-foreground">Shopping Lists</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
