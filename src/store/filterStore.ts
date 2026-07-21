import { create } from "zustand";

interface FilterStore {
  search: string;

  priority: "all" | "low" | "normal" | "high";

  setSearch: (value: string) => void;

  setPriority: (value: "all" | "low" | "normal" | "high") => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  search: "",

  priority: "all",

  setSearch: (value) =>
    set({
      search: value,
    }),

  setPriority: (value) =>
    set({
      priority: value,
    }),
}));
