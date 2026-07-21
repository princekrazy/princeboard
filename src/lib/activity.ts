import { supabase } from "./supabase";

export async function logActivity(taskId: string, action: string) {
  await supabase

    .from("activity_logs")

    .insert({
      task_id: taskId,

      action,
    });
}
