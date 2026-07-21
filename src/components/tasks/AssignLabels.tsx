import { useLabels } from "../../hooks/useLabels";

import { supabase } from "../../lib/supabase";

export default function AssignLabels({
  taskId,

  assigned,
}: {
  taskId: string;

  assigned: any[];
}) {
  const { labels } = useLabels();

  function isAssigned(id: string) {
    return assigned.some((item) => item.label_id === id);
  }

  async function toggle(labelId: string, checked: boolean) {
    if (checked) {
      await supabase

        .from("task_labels")

        .insert({
          task_id: taskId,

          label_id: labelId,
        });
    } else {
      await supabase

        .from("task_labels")

        .delete()

        .eq("task_id", taskId)

        .eq("label_id", labelId);
    }
  }

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3">Labels</h3>

      {labels.map((label) => (
        <label
          key={label.id}
          className="
flex
gap-3
items-center
mb-2
"
        >
          <input
            type="checkbox"
            checked={isAssigned(label.id)}
            onChange={(e) => toggle(label.id, e.target.checked)}
          />

          <span
            className="
px-3
py-1
rounded-full
text-sm
"
            style={{
              backgroundColor: label.color + "30",

              color: label.color,
            }}
          >
            {label.name}
          </span>
        </label>
      ))}
    </div>
  );
}
