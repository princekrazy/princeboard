import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

export function useComments(taskId?: string) {
  const [comments, setComments] = useState<any[]>([]);

  async function loadComments() {
    if (!taskId) return;

    const { data, error } = await supabase

      .from("comments")

      .select("*")

      .eq("task_id", taskId)

      .order("created_at", {
        ascending: true,
      });

    if (!error) setComments(data || []);
  }

  async function addComment(content: string) {
    const { data: user } = await supabase.auth.getUser();

    const { data, error } = await supabase

      .from("comments")

      .insert({
        task_id: taskId,

        user_id: user.user?.id,

        content,
      })

      .select()
      .single();

    if (!error) {
      setComments((prev) => [...prev, data]);
    }
  }

  useEffect(() => {
    loadComments();
  }, [taskId]);

  return {
    comments,

    addComment,
  };
}
