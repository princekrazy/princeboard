import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import type { Task } from "../../types/database";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
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
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      whileHover={{
        y: -3,
      }}
      className="
bg-[#151B2B]
text-white
rounded-xl
p-4
mb-3
cursor-grab
border
border-white/10
shadow-lg
"
    >
      <h3
        className="
font-medium
"
      >
        {task.title}
      </h3>

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
    </motion.div>
  );
}
