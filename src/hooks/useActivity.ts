import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

export function useActivity(taskId?: string) {
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    if (!taskId) return;

    supabase

      .from("activity_logs")

      .select("*")

      .eq("task_id", taskId)

      .order("created_at", {
        ascending: false,
      })

      .then(({ data }) => {
        setActivity(data || []);
      });
  }, [taskId]);

  return {
    activity,
  };
}
