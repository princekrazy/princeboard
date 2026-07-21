import { Search } from "lucide-react";
import SearchBar from "../layout/SearchBar";
import { useAuth } from "../../hooks/useAuth";
export default function Header() {
  const { signOut } = useAuth();
  return (
    <header
      className="
h-20
border-b
border-white/10
flex
items-center
justify-between
px-8
text-white
"
    >
      <div>
        <h2
          className="
font-semibold
"
        >
          My Workspace
        </h2>
      </div>

      <div
        className="
flex
items-center
gap-4
"
      >
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
          <Search size={18} />

          <SearchBar />
        </div>

        <button
          onClick={signOut}
          className="
text-sm
text-gray-400
hover:text-white
"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
