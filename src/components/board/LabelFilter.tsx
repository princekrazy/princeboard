import { useLabels } from "../../hooks/useLabels";

interface Props {
  selectedLabel: string | null;
  setSelectedLabel: (id: string | null) => void;
}

export default function LabelFilter({
  selectedLabel,
  setSelectedLabel,
}: Props) {
  const { labels } = useLabels();

  return (
    <select
      value={selectedLabel ?? "all"}
      onChange={(e) =>
        setSelectedLabel(e.target.value === "all" ? null : e.target.value)
      }
      className="
      bg-[#151B2B]
      text-white
      rounded-xl
      px-4
      py-2
      outline-none
      border
      border-white/10
      cursor-pointer
      "
    >
      <option value="all">All Labels</option>

      {labels.map((label) => (
        <option key={label.id} value={label.id}>
          {label.name}
        </option>
      ))}
    </select>
  );
}
