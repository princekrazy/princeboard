import { X, Trash2 } from "lucide-react";
import AssignMembers from "./AssignMember";
import { useBoardStore } from "../../store/boardStore";
import Comments from "./Comments";
import AssignLabels from "./AssignLabels";
import ActivityTimeline from "./ActivityTimeline";
import { useTasks } from "../../hooks/useTasks";
interface Props {
  deleteTask: (id: string) => void;
  loadTasks: () => void;
}

export default function TaskDetails({ deleteTask, loadTasks }: Props) {
  const task = useBoardStore((state) => state.selectedTask);

  const close = useBoardStore((state) => state.closeTask);

  if (!task) return null;

  return (
    <>
      {" "}
      <div
        className="
fixed
inset-0
bg-black/40
z-30
"
        onClick={close}
      />
      <div
        className="
fixed
right-0
top-0
h-screen
w-[420px]
bg-[#111827]
border-l
border-white/10
p-6
text-white
z-40
shadow-xl
overflow-y-auto
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
          <h2
            className="
text-xl
font-semibold
"
          >
            Task Details
          </h2>

          <button onClick={close}>
            <X />
          </button>
        </div>

        <h1
          className="
text-2xl
font-bold
mb-3
"
        >
          {task.title}
        </h1>

        <p
          className="
text-gray-400
mb-6
"
        >
          {task.description || "No description"}
        </p>

        <div
          className="
space-y-3
"
        >
          <div>
            <span className="text-gray-400">Priority:</span> {task.priority}
          </div>

          <div>
            <span className="text-gray-400">Status:</span> {task.status}
          </div>

          {task.due_date && (
            <div>
              <span className="text-gray-400">Due:</span> {task.due_date}
            </div>
          )}
        </div>
        <AssignMembers
          taskId={task.id}
          assigned={task.task_assignees || []}
          refresh={loadTasks}
        />
        <AssignLabels
          taskId={task.id}
          assigned={task.task_labels || []}
          refresh={loadTasks}
        />

        <button
          onClick={() => {
            deleteTask(task.id);
            close();
          }}
          className="
mt-10
flex
items-center
gap-2
text-red-400
hover:text-red-300
"
        >
          <Trash2 size={18} />
          Delete Task
        </button>

        <Comments taskId={task.id} />
        <ActivityTimeline taskId={task.id} />
      </div>
    </>
  );
}
