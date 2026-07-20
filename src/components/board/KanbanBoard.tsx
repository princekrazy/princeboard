import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import Column from "./Column";

import { columns } from "../../constants/columns";

import { useTasks } from "../../hooks/useTasks";
import type { TaskStatus } from "../../types/database";

export default function KanbanBoard() {
  const {
    tasks,

    loading,

    updateStatus,
  } = useTasks();

  if (loading)
    return (
      <div
        className="
text-white
p-10
"
      >
        Loading...
      </div>
    );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id.toString();

    const destination = over.id as TaskStatus;

    updateStatus(taskId, destination);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className="
min-h-screen
bg-[#0B0F19]
p-8
"
      >
        <h1
          className="
text-3xl
font-bold
text-white
mb-8
"
        >
          FlowBoard
        </h1>

        <div
          className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
"
        >
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
