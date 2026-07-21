import { create } from "zustand";

interface BoardStore {
  selectedTaskId: string | null;

  openTask: (id: string) => void;

  closeTask: () => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  selectedTaskId: null,

  openTask: (id) =>
    set({
      selectedTaskId: id,
    }),

  closeTask: () =>
    set({
      selectedTaskId: null,
    }),
}));
