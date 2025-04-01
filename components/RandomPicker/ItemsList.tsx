"use client";

import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export function ItemsList() {
  const { items, selectedItem, removeItem } = useStore();
  return (
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
                  key={item.id}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    duration: 0.6,
                  }}
                  className={`flex justify-between items-center px-4 py-3 ${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } ${selectedItem === item.text ? "bg-purple-900/20" : ""}`}
                >
                  <span className="font-medium text-gray-200">{item.text}</span>
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
  );
}
