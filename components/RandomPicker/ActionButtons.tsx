"use client";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { Shuffle, Trash2, Zap } from "lucide-react";

export function ActionButtons() {
  const {
    isShuffling,
    isSelecting,
    shuffleList,
    selectRandom,
    clearAll,
    items,
  } = useStore();
  const itemCount = items.length;
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center mb-6">
      <Button
        onClick={shuffleList}
        disabled={isShuffling || itemCount < 2}
        className="bg-blue-600 hover:bg-blue-700 text-white col-span-1"
      >
        <Shuffle className="mr-2 h-4 w-4" />
        Shuffle List
      </Button>

      <Button
        onClick={selectRandom}
        disabled={isSelecting || itemCount === 0}
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
  );
}
