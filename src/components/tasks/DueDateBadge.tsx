import { CalendarDays } from "lucide-react";

import { getDueDateStatus } from "../../lib/dueDate";

export default function DueDateBadge({ dueDate }: { dueDate?: string | null }) {
  const status = getDueDateStatus(dueDate);

  if (!status) {
    return null;
  }

  return (
    <div
      className={`
flex
items-center
gap-1
text-xs
px-2
py-1
rounded-full

${
  status.type === "overdue"
    ? "bg-red-500/20 text-red-400"
    : status.type === "today"
      ? "bg-orange-500/20 text-orange-400"
      : status.type === "soon"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-white/10 text-gray-300"
}

`}
    >
      <CalendarDays size={13} />

      {status.label}
    </div>
  );
}
