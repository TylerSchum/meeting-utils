"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Save, Shuffle, Trash2, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NameRandomizer() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [itemIds, setItemIds] = useState<string[]>([]);

  // Load items from local storage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("randomizer-items");
    if (savedItems) {
      const items = JSON.parse(savedItems);
      setItems(items);
      // Generate IDs for existing items if they don't have them
      setItemIds(items.map(() => crypto.randomUUID()));
    }

    // Force dark mode
    document.documentElement.classList.add("dark");
  }, []);

  // Save items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("randomizer-items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!newItem.trim()) return;

    const newId = crypto.randomUUID();
    setItemIds([...itemIds, newId]);
    setItems([...items, newItem.trim()]);
    setNewItem("");

    toast.success("Item added", {
      description: `"${newItem.trim()}" has been added to your list.`,
      duration: 2000,
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    const newItemIds = [...itemIds];
    const removed = newItems.splice(index, 1);
    newItemIds.splice(index, 1);
    setItems(newItems);
    setItemIds(newItemIds);

    toast.success("Item removed", {
      description: `"${removed}" has been removed from your list.`,
      duration: 2000,
    });
  };

  const shuffleList = () => {
    if (items.length < 2) {
      toast.error("Not enough items", {
        description: "You need at least 2 items to shuffle.",
        duration: 3000,
      });
      return;
    }

    setIsShuffling(true);
    setSelectedItem(null);

    // between 3-7 shuffles
    const shuffleCount = Math.floor(Math.random() * 5) + 3; // Number of shuffles to perform
    const shuffleDelay = 600; // Time between each shuffle (ms)

    // Perform multiple shuffles
    for (let shuffleIndex = 0; shuffleIndex < shuffleCount; shuffleIndex++) {
      setTimeout(() => {
        // Create pairs of items and their IDs
        const pairs = items.map((item, index) => ({
          item,
          id: itemIds[index],
        }));

        // Shuffle the pairs
        const shuffled = [...pairs].sort(() => Math.random() - 0.5);

        // Update both arrays
        setItems(shuffled.map((pair) => pair.item));
        setItemIds(shuffled.map((pair) => pair.id));

        // Only set isShuffling to false after the last shuffle
        if (shuffleIndex === shuffleCount - 1) {
          setTimeout(() => setIsShuffling(false), 500);
        }
      }, shuffleIndex * shuffleDelay);
    }
  };

  const selectRandom = () => {
    if (items.length === 0) {
      toast.error("No items", {
        description: "You need at least 1 item to select randomly.",
        duration: 3000,
      });
      return;
    }

    setIsSelecting(true);
    setSelectedItem(null);

    // Rapidly cycle through items for animation effect
    const cycleSteps = 15;
    const cycleInterval = 100; // ms between selections

    for (let i = 0; i < cycleSteps; i++) {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * items.length);

        if (i === cycleSteps - 1) {
          // Final selection
          setSelectedItem(items[randomIndex]);
          setTimeout(() => setIsSelecting(false), 500);
        } else {
          // Just for animation
          setSelectedItem(items[randomIndex]);
        }
      }, i * cycleInterval);
    }
  };

  const clearAll = () => {
    if (items.length === 0) return;

    setItems([]);
    setSelectedItem(null);

    toast.success("List cleared", {
      description: "All items have been removed from your list.",
      duration: 2000,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="w-full max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-pink-500 mb-1">
            Random Picker
          </h1>
          <p className="text-gray-400">
            Add items to your list, then shuffle or pick a random one
          </p>
        </div>

        {/* Add new item form */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter an item..."
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            className="flex-1 bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
          />
          <Button
            onClick={addItem}
            variant="default"
            className="bg-gray-800 hover:bg-gray-700 text-white w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center mb-6">
          <Button
            onClick={shuffleList}
            disabled={isShuffling || items.length < 2}
            className="bg-blue-600 hover:bg-blue-700 text-white col-span-1"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle List
          </Button>

          <Button
            onClick={selectRandom}
            disabled={isSelecting || items.length === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white col-span-1"
          >
            <Zap className="mr-2 h-4 w-4" />
            Pick Random
          </Button>

          <Button
            onClick={clearAll}
            variant="outline"
            className="text-red-400 border-red-900 hover:bg-red-900/30 col-span-2"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Selected item display */}
        {selectedItem && (
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-purple-900/30 border border-purple-800 p-4 rounded-lg text-center"
            >
              <span className="text-xl font-bold text-purple-400">
                {selectedItem}
              </span>
            </motion.div>
          </div>
        )}

        {/* Items list */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-300">
            Your Items ({items.length})
          </h3>
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Your list is empty. Add some items to get started!
              </p>
            ) : (
              <AnimatePresence>
                <ul>
                  {items.map((item, index) => (
                    <motion.li
                      key={itemIds[index]}
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        duration: 0.6,
                      }}
                      className={`flex justify-between items-center px-4 py-3 ${
                        index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                      } ${selectedItem === item ? "bg-purple-900/20" : ""}`}
                    >
                      <span className="font-medium text-gray-200">{item}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-400 hover:bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              </AnimatePresence>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-4 text-sm text-gray-500">
          <Save className="h-4 w-4 mr-1" /> Your list is automatically saved to
          your browser
        </div>
      </div>
    </div>
  );
}
