import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { DragOverlay } from "@dnd-kit/core";

import Column from "./Column";
import Skeleton from "../ui/skeleton";
import LabelFilter from "./LabelFilter";
import { columns } from "../../constants/columns";

import { useTasks } from "../../hooks/useTasks";
import type { TaskStatus } from "../../types/database";
import { useState } from "react";
import type { Task } from "../../types/database";

import CreateTaskModal from "../tasks/CreateTaskModal";
import BoardStats from "./BoardStats";

import TaskFilters from "./TaskFilters";

import { useFilterStore } from "../../store/filterStore";
import { Plus } from "lucide-react";
import TaskDetails from "../tasks/TaskDetails";
export default function KanbanBoard() {
  const { search, priority } = useFilterStore();
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const { deleteTask } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
  );
  const [open, setOpen] = useState(false);
  const {
    tasks,

    loading,

    updateStatus,
    createTask,
  } = useTasks();

  if (loading)
    return (
      <div
        className="
grid
grid-cols-4
gap-6
p-8
"
      >
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((task) => task.id === event.active.id);

    setActiveTask(task || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    const taskId = active.id.toString();

    const destination = over.id.toString();

    const validStatuses: TaskStatus[] = [
      "todo",
      "in_progress",
      "in_review",
      "done",
    ];

    if (!validStatuses.includes(destination as TaskStatus)) {
      return;
    }

    updateStatus(taskId, destination as TaskStatus);
  }
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPriority = priority === "all" || task.priority === priority;

    const matchesLabel =
      selectedLabel === null ||
      task.task_labels?.some(
        (taskLabel) => taskLabel.label_id === selectedLabel,
      );

    return matchesSearch && matchesPriority && matchesLabel;
  });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveTask(null)}
    >
      <DragOverlay>
        {activeTask && (
          <div
            className="
      bg-[#151B2B]
      text-white
      rounded-xl
      p-4
      border
      border-white/10
      shadow-xl
      w-[300px]
      "
          >
            {activeTask.title}
          </div>
        )}
      </DragOverlay>
      <div
        className="
min-h-screen
bg-[#0B0F19]
p-8
"
      >
        <div
          className="
flex
justify-between
items-center
mb-8
"
        >
          <LabelFilter
            selectedLabel={selectedLabel}
            setSelectedLabel={setSelectedLabel}
          />
          <TaskFilters />

          <button
            onClick={() => setOpen(true)}
            className="
flex
items-center
gap-2
bg-emerald-600
text-white
px-4
py-2
rounded-xl
hover:bg-emerald-700
"
          >
            <Plus size={18} />
            New Task
          </button>
        </div>
        <BoardStats tasks={tasks} />

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
              tasks={filteredTasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
        <CreateTaskModal
          open={open}
          close={() => setOpen(false)}
          createTask={createTask}
        />
      </div>
      <TaskDetails deleteTask={deleteTask} />
    </DndContext>
  );
}
