import type { Task } from "../../types/database";

interface Props {
  tasks: Task[];
}

export default function BoardStats({ tasks }: Props) {
  const completed = tasks.filter((task) => task.status === "done").length;

  const overdue = tasks.filter(
    (task) => task.due_date && new Date(task.due_date) < new Date(),
  ).length;

  return (
    <div
      className="
grid
grid-cols-3
gap-4
mb-8
"
    >
      <div
        className="
bg-[#151B2B]
rounded-xl
p-4
text-white
"
      >
        <p
          className="
text-gray-400
text-sm
"
        >
          Total Tasks
        </p>

        <h2
          className="
text-2xl
font-bold
"
        >
          {tasks.length}
        </h2>
      </div>

      <div
        className="
bg-[#151B2B]
rounded-xl
p-4
text-white
"
      >
        <p
          className="
text-gray-400
text-sm
"
        >
          Completed
        </p>

        <h2
          className="
text-2xl
font-bold
"
        >
          {completed}
        </h2>
      </div>

      <div
        className="
bg-[#151B2B]
rounded-xl
p-4
text-white
"
      >
        <p
          className="
text-gray-400
text-sm
"
        >
          Overdue
        </p>

        <h2
          className="
text-2xl
font-bold
"
        >
          {overdue}
        </h2>
      </div>
    </div>
  );
}
