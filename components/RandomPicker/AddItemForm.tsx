"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddItemForm() {
  const [newItem, setNewItem] = useState("");
  const { addItem } = useStore();

  const handleSubmit = () => {
    if (!newItem.trim()) return;
    addItem(newItem.trim());
    setNewItem("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-6">
      <Input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter an item..."
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="flex-1 bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
      />
      <Button
        onClick={handleSubmit}
        variant="default"
        className="bg-gray-800 hover:bg-gray-700 text-white w-full sm:w-auto"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
    </div>
  );
}
