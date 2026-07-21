export type TaskStatus = "todo" | "in_progress" | "in_review" | "done";
import type { Member } from "./member";

export interface TaskAssignee {
  member_id: string;

  members: Member;
}
export type Priority = "low" | "normal" | "high";
import type { Label } from "./label";

export interface TaskLabel {
  label_id: string;

  labels: Label;
}
export interface Task {
  id: string;

  title: string;

  description?: string | null;

  status: TaskStatus;

  priority: Priority;

  due_date?: string | null;

  user_id: string;

  created_at: string;
  task_labels?: TaskLabel[];
  task_assignees?: TaskAssignee[];
}
