import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import type { Task } from "../../types/database";
import { useBoardStore } from "../../store/boardStore";
import { Grip } from "lucide-react";
interface Props {
  task: Task;
}
import DueDateBadge from "../tasks/DueDateBadge";
export default function TaskCard({ task }: Props) {
  const openTask = useBoardStore((state) => state.openTask);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),

    transition,
  };

  return (
    <motion.div
      onClick={() => openTask(task.id)}
      ref={setNodeRef}
      style={style}
      whileHover={{
        y: -3,
      }}
      className="
bg-[#151B2B]
hover:bg-[#1B2438]
transition-all
text-white
rounded-xl
p-4
mb-3
border
border-white/5
hover:border-emerald-500/40
shadow-lg
"
    >
      <div className="flex justify-between items-start mb-3">
        <h3
          className="
font-medium
"
        >
          {task.title}
        </h3>
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <Grip size={18} />
        </button>
      </div>
      <span
        className={`
text-xs
px-2
py-1
rounded-full

${
  task.priority === "high"
    ? "bg-red-500/20 text-red-400"
    : task.priority === "low"
      ? "bg-green-500/20 text-green-400"
      : "bg-yellow-500/20 text-yellow-400"
}

`}
      >
        {task.priority}
      </span>
      {/* Assignees */}
      <div
        className="
  flex
  -space-x-2
  mt-4
  "
      >
        {task.task_assignees?.map((assignment) => (
          <div
            key={assignment.member_id}
            className="
      h-7
      w-7
      rounded-full
      flex
      items-center
      justify-center
      text-xs
      text-white
      border
      border-[#151B2B]
      "
            style={{
              backgroundColor: assignment.members.avatar_color,
            }}
          >
            {assignment.members.name[0]}
          </div>
        ))}
      </div>

      {/* Due date */}
      <div
        className="
  mt-3
  "
      >
        <DueDateBadge dueDate={task.due_date} />
      </div>

      {/* Labels */}
      <div
        className="
  flex
  gap-2
  flex-wrap
  mt-3
  "
      >
        {task.task_labels?.map((item) => (
          <span
            key={item.label_id}
            className="
      text-xs
      px-2
      py-1
      rounded-full
      "
            style={{
              backgroundColor: item.labels.color + "30",
              color: item.labels.color,
            }}
          >
            {item.labels.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
