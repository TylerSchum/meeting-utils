"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";

export function SelectedItem() {
  const { selectedItem } = useStore();
  if (!selectedItem) return null;

  return (
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
  );
}
