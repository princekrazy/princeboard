import { supabase } from "../lib/supabase";

export function useAssignments() {
  async function assignMember(taskId: string, memberId: string) {
    const { error } = await supabase.from("task_assignees").upsert(
      {
        task_id: taskId,
        member_id: memberId,
      },
      {
        onConflict: "task_id,member_id",
      },
    );

    if (error) {
      console.error(error);
    }
  }

  async function removeMember(taskId: string, memberId: string) {
    const { error } = await supabase

      .from("task_assignees")

      .delete()

      .eq("task_id", taskId)

      .eq("member_id", memberId);

    if (error) {
      console.error(error);
    }
  }

  return {
    assignMember,

    removeMember,
  };
}
