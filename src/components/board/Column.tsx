import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TaskCard from "./TaskCard";
import type { Task } from "../../types/database";
import { useDroppable } from "@dnd-kit/core";
interface Props {
  title: string;

  id: string;

  tasks: Task[];
}

export default function Column({ title, id, tasks }: Props) {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div
      ref={setNodeRef}
      className="
bg-[#111827]
rounded-2xl
p-4
min-h-[550px]
w-full
"
    >
      <div
        className="
flex
justify-between
mb-4
"
      >
        <h2
          className="
text-white
font-semibold
"
        >
          {title}
        </h2>

        <span
          className="
text-gray-400
text-sm
"
        >
          {tasks.length}
        </span>
      </div>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}
