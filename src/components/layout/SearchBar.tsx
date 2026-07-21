import { Search } from "lucide-react";

import { useFilterStore } from "../../store/filterStore";

export default function SearchBar() {
  const { search, setSearch } = useFilterStore();

  return (
    <div
      className="
bg-[#151B2B]
rounded-xl
px-4
py-2
flex
items-center
gap-2
"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="
bg-transparent
outline-none
text-white
text-sm
"
      />
    </div>
  );
}
