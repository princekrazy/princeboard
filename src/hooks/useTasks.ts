import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Task, TaskStatus } from "../types/database";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTasks() {
    setLoading(true);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
    } else {
      setTasks(data);
    }

    setLoading(false);
  }

  async function createTask(title: string) {
    const { data: user } = await supabase.auth.getUser();

    const { error } = await supabase.from("tasks").insert({
      title,

      status: "todo",

      priority: "normal",

      user_id: user.user?.id,
    });

    if (error) {
      console.error(error);
    } else {
      loadTasks();
    }
  }

  async function updateStatus(id: string, status: TaskStatus) {
    const { error } = await supabase
      .from("tasks")
      .update({
        status,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                status,
              }
            : task,
        ),
      );
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,

    loading,

    createTask,

    updateStatus,
  };
}
