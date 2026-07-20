import { create } from "zustand";
import type { Task } from "../types/database";

interface BoardStore {
  selectedTask: Task | null;

  openTask: (task: Task) => void;

  closeTask: () => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  selectedTask: null,

  openTask: (task) =>
    set({
      selectedTask: task,
    }),

  closeTask: () =>
    set({
      selectedTask: null,
    }),
}));
