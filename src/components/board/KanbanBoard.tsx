import { columns } from "../../constants/columns";
import { useTasks } from "../../hooks/useTasks";

export default function KanbanBoard() {
  const { tasks, loading, createTask } = useTasks();

  if (loading) {
    return <p>Loading board...</p>;
  }

  return (
    <div
      className="
grid 
grid-cols-4 
gap-5
p-8
"
    >
      <button
        onClick={() => createTask("My first task")}
        className="
bg-black
text-white
px-4
py-2
rounded
mb-5
"
      >
        Add Task
      </button>
      {columns.map((column) => (
        <div
          key={column.id}
          className="
bg-gray-100
rounded-xl
p-4
min-h-[500px]
"
        >
          <h2
            className="
font-semibold
mb-4
"
          >
            {column.title}
          </h2>

          {tasks
            .filter((task) => task.status === column.id)
            .map((task) => (
              <div
                key={task.id}
                className="
bg-white
rounded-lg
p-4
mb-3
shadow
"
              >
                {task.title}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
