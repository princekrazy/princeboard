import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";

export function useTasks() {
  const store = useTaskStore();

  useEffect(() => {
    if (store.tasks.length === 0) {
      store.loadTasks();
    }
  }, []);

  return store;
}
