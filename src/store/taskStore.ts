import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type { Task, TaskStatus } from "../types/database";
import toast from "react-hot-toast";

interface TaskStore {
  tasks: Task[];
  updateTaskLabels: (taskId: string, labels: any[]) => void;
  updateTaskAssignees: (taskId: string, assignees: any[]) => void;

  loading: boolean;

  selectedTaskId: string | null;

  loadTasks: () => Promise<void>;

  createTask: (taskData: any) => Promise<void>;

  deleteTask: (id: string) => Promise<void>;

  updateStatus: (id: string, status: TaskStatus) => Promise<void>;

  selectTask: (id: string) => void;

  closeTask: () => void;

  updateTask: (task: Task) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  loading: false,

  selectedTaskId: null,

  selectTask: (id) =>
    set({
      selectedTaskId: id,
    }),

  closeTask: () =>
    set({
      selectedTaskId: null,
    }),
  updateTaskAssignees: (taskId, assignees) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              task_assignees: assignees,
            }
          : task,
      ),
    })),
  updateTaskLabels: (taskId, labels) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              task_labels: labels,
            }
          : task,
      ),
    })),

  loadTasks: async () => {
    set({
      loading: true,
    });

    const { data, error } = await supabase

      .from("tasks")

      .select(
        `
*,

task_labels(
    label_id,
    labels(*)
),

task_assignees(
    member_id,
    members(*)
)

`,
      )

      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
    } else {
      set({
        tasks: data || [],
      });
    }

    set({
      loading: false,
    });
  },

  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    })),

  deleteTask: async (id) => {
    const { error } = await supabase

      .from("tasks")

      .delete()

      .eq("id", id);

    if (error) {
      toast.error("Task delete failed");

      return;
    }

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));

    toast.success("Task deleted");
  },

  updateStatus: async (id, status) => {
    await supabase

      .from("tasks")

      .update({
        status,
      })

      .eq("id", id);

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task,
      ),
    }));
  },

  createTask: async (taskData) => {
    const { data: user } = await supabase.auth.getUser();

    const { data, error } = await supabase

      .from("tasks")

      .insert({
        ...taskData,

        status: "todo",

        user_id: user.user?.id,
      })

      .select()

      .single();

    if (error) {
      console.error(error);

      return;
    }

    set((state) => ({
      tasks: [data, ...state.tasks],
    }));
  },
}));
