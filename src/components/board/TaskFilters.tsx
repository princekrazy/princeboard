import { useFilterStore } from "../../store/filterStore";

export default function TaskFilters() {
  const { priority, setPriority } = useFilterStore();

  return (
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value as any)}
      className="
bg-[#151B2B]
text-white
rounded-xl
px-4
py-2
outline-none
"
    >
      <option value="all">All Priorities</option>

      <option value="high">High</option>

      <option value="normal">Normal</option>

      <option value="low">Low</option>
    </select>
  );
}
