import { useActivity } from "../../hooks/useActivity";

export default function ActivityTimeline({ taskId }: { taskId: string }) {
  const { activity } = useActivity(taskId);

  return (
    <div
      className="
mt-8
"
    >
      <h3
        className="
font-semibold
mb-4
"
      >
        Activity
      </h3>

      {activity.map((item) => (
        <div
          key={item.id}
          className="
border-l
border-emerald-500
pl-4
mb-3
"
        >
          <p>{item.action}</p>

          <span
            className="
text-xs
text-gray-500
"
          >
            {new Date(item.created_at).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
