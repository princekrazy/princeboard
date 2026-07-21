import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Task, TaskStatus } from "../types/database";
import toast from "react-hot-toast";
import { logActivity } from "../lib/activity";
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTasks() {
    setLoading(true);

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
      setTasks(data);
    }

    setLoading(false);
  }

  async function createTask(taskData: {
    title: string;
    description?: string;
    priority: "low" | "normal" | "high";
    due_date?: string;
  }) {
    const { data: user } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        title: taskData.title,

        description: taskData.description,

        priority: taskData.priority,

        due_date: taskData.due_date,

        status: "todo",

        user_id: user.user?.id,
      })
      .select()
      .single();

    if (error) {
      console.error(error);

      return;
    }
    toast.success("Task created");

    setTasks((prev) => [data, ...prev]);
  }
  async function deleteTask(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error(error);

      return;
    }
    toast.success("Task deleted");

    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  async function updateStatus(id: string, status: TaskStatus) {
    const { error } = await supabase
      .from("tasks")
      .update({
        status,
      })
      .eq("id", id);
    await logActivity(
      id,

      `Moved task to ${status}`,
    );
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
    deleteTask,
  };
}
