import { useState } from "react";

import { X } from "lucide-react";

interface Props {
  open: boolean;

  close: () => void;

  createTask: (data: any) => void;
}

export default function CreateTaskModal({ open, close, createTask }: Props) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState<"low" | "normal" | "high">("normal");

  const [dueDate, setDueDate] = useState("");

  if (!open) return null;

  function submit() {
    if (!title.trim()) return;

    createTask({
      title,

      description,

      priority,

      due_date: dueDate,
    });

    setTitle("");

    setDescription("");

    close();
  }

  return (
    <div
      className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
z-50
"
    >
      <div
        className="
bg-[#151B2B]
w-[420px]
rounded-2xl
p-6
text-white
shadow-xl
"
      >
        <div
          className="
flex
justify-between
mb-5
"
        >
          <h2
            className="
text-xl
font-semibold
"
          >
            Create Task
          </h2>

          <button onClick={close}>
            <X />
          </button>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="
w-full
bg-[#0B0F19]
border
border-white/10
rounded-lg
p-3
mb-3
"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="
w-full
bg-[#0B0F19]
border
border-white/10
rounded-lg
p-3
mb-3
"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="
w-full
bg-[#0B0F19]
border
border-white/10
rounded-lg
p-3
mb-3
"
        >
          <option value="low">Low</option>

          <option value="normal">Normal</option>

          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="
w-full
bg-[#0B0F19]
border
border-white/10
rounded-lg
p-3
mb-5
"
        />

        <button
          onClick={submit}
          className="
w-full
bg-indigo-600
hover:bg-indigo-700
rounded-lg
py-3
font-medium
"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
