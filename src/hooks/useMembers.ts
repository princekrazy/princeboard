import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

import type { Member } from "../types/member";

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadMembers() {
    setLoading(true);

    const { data, error } = await supabase

      .from("members")

      .select("*")

      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);

      return;
    }

    setMembers(data || []);

    setLoading(false);
  }

  async function addMember(name: string) {
    const { data: user } = await supabase.auth.getUser();

    const colors = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#EC4899"];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const { data, error } = await supabase

      .from("members")

      .insert({
        name,

        user_id: user.user?.id,

        avatar_color: randomColor,
      })

      .select()

      .single();

    if (error) {
      console.error(error);

      return;
    }

    setMembers((prev) => [data, ...prev]);
  }

  async function deleteMember(id: string) {
    const { error } = await supabase

      .from("members")

      .delete()

      .eq("id", id);

    if (error) {
      console.error(error);

      return;
    }

    setMembers((prev) => prev.filter((member) => member.id !== id));
  }

  useEffect(() => {
    loadMembers();
  }, []);

  return {
    members,

    loading,

    addMember,

    deleteMember,
  };
}
