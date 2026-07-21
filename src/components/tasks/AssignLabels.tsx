import { useLabels } from "../../hooks/useLabels";

import { supabase } from "../../lib/supabase";
import { useTaskStore } from "../../store/taskStore";
interface Props {
  taskId: string;

  assigned: any[];
  refresh: () => void;
}

export default function AssignLabels({
  taskId,

  assigned,
}: Props) {
  const updateTaskLabels = useTaskStore((state) => state.updateTaskLabels);
  const { labels } = useLabels();

  function isAssigned(id: string) {
    return assigned.some((item) => item.label_id === id);
  }

  async function toggle(labelId: string, checked: boolean) {
    let updatedLabels = [...assigned];

    if (checked) {
      await supabase

        .from("task_labels")

        .insert({
          task_id: taskId,

          label_id: labelId,
        });

      const label = labels.find((l) => l.id === labelId);

      if (label) {
        updatedLabels.push({
          label_id: labelId,

          labels: label,
        });
      }
    } else {
      await supabase

        .from("task_labels")

        .delete()

        .eq("task_id", taskId)

        .eq("label_id", labelId);

      updatedLabels = updatedLabels.filter((item) => item.label_id !== labelId);
    }

    updateTaskLabels(taskId, updatedLabels);
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
            onChange={async (e) => await toggle(label.id, e.target.checked)}
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
