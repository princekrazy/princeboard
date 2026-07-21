import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

import type { Label } from "../types/label";

export function useLabels() {
  const [labels, setLabels] = useState<Label[]>([]);

  async function loadLabels() {
    const { data } = await supabase

      .from("labels")

      .select("*")

      .order("created_at", {
        ascending: false,
      });

    setLabels(data || []);
  }

  async function addLabel(name: string, color: string) {
    const { data: user } = await supabase.auth.getUser();

    const { data } = await supabase

      .from("labels")

      .insert({
        name,

        color,

        user_id: user.user?.id,
      })

      .select()

      .single();

    if (data) {
      setLabels((prev) => [data, ...prev]);
    }
  }

  async function deleteLabel(id: string) {
    await supabase

      .from("labels")

      .delete()

      .eq("id", id);

    setLabels((prev) => prev.filter((label) => label.id !== id));
  }

  useEffect(() => {
    loadLabels();
  }, []);

  return {
    labels,

    addLabel,

    deleteLabel,
  };
}
