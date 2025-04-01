import { toast } from "sonner";
import { create } from "zustand";

interface RandomizerStore {
  items: { id: string; text: string }[];
  selectedItem: string | null;
  isShuffling: boolean;
  isSelecting: boolean;

  // Actions
  addItem: (newItem: string) => void;
  removeItem: (index: number) => void;
  shuffleList: () => void;
  selectRandom: () => void;
  clearAll: () => void;
}

export const useStore = create<RandomizerStore>((set, get) => ({
  items: [],
  itemIds: [],
  selectedItem: null,
  isShuffling: false,
  isSelecting: false,

  addItem: (newItem) => {
    if (!newItem.trim()) return;

    const newId = crypto.randomUUID();
    set((state) => ({
      items: [...state.items, { id: newId, text: newItem.trim() }],
    }));

    toast.success("Item added", {
      description: `"${newItem.trim()}" has been added to your list.`,
      duration: 2000,
    });
  },

  removeItem: (index) => {
    set((state) => {
      const newItems = [...state.items];
      const removed = newItems.splice(index, 1);

      toast.success("Item removed", {
        description: `"${removed[0].text}" has been removed from your list.`,
        duration: 2000,
      });

      return { items: newItems };
    });
  },

  shuffleList: () => {
    const { items } = get();
    if (items.length < 2) {
      toast.error("Not enough items", {
        description: "You need at least 2 items to shuffle.",
        duration: 3000,
      });
      return;
    }

    set({ isShuffling: true, selectedItem: null });

    const shuffleCount = Math.floor(Math.random() * 5) + 3;
    const shuffleDelay = 600;

    for (let shuffleIndex = 0; shuffleIndex < shuffleCount; shuffleIndex++) {
      setTimeout(() => {
        set((state) => {
          const pairs = [...state.items];

          const shuffled = [...pairs].sort(() => Math.random() - 0.5);

          return {
            items: shuffled,
          };
        });

        if (shuffleIndex === shuffleCount - 1) {
          setTimeout(() => set({ isShuffling: false }), 500);
        }
      }, shuffleIndex * shuffleDelay);
    }
  },

  selectRandom: () => {
    const { items } = get();
    if (items.length === 0) {
      toast.error("No items", {
        description: "You need at least 1 item to select randomly.",
        duration: 3000,
      });
      return;
    }

    set({ isSelecting: true, selectedItem: null });

    const cycleSteps = 15;
    const cycleInterval = 100;

    for (let i = 0; i < cycleSteps; i++) {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * items.length);

        if (i === cycleSteps - 1) {
          set((state) => ({
            selectedItem: state.items[randomIndex].text,
            isSelecting: false,
          }));
        } else {
          set((state) => ({
            selectedItem: state.items[randomIndex].text,
          }));
        }
      }, i * cycleInterval);
    }
  },

  clearAll: () => {
    const { items } = get();
    if (items.length === 0) return;

    set({ items: [], selectedItem: null });

    toast.success("List cleared", {
      description: "All items have been removed from your list.",
      duration: 2000,
    });
  },
}));
