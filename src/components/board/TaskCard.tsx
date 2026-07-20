import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import type { Task } from "../../types/database";
import { useBoardStore } from "../../store/boardStore";
import { Grip } from "lucide-react";
interface Props {
  task: Task;
}

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
      onClick={() => openTask(task)}
      ref={setNodeRef}
      style={style}
      whileHover={{
        y: -3,
      }}
      className="
bg-[#151B2B]
text-white
rounded-xl
p-4
mb-3
border
border-white/10
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
    </motion.div>
  );
}
