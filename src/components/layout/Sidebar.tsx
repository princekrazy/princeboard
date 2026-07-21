import { LayoutDashboard, Users, Tag } from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      className="
      w-64
      bg-[#111827]
      border-r
      border-white/10
      min-h-screen
      p-5
      text-white
      hidden
      md:block
      "
    >
      <h1
        className="
        text-2xl
        font-bold
        mb-10
        "
      >
        PrinceBoard
      </h1>

      <nav
        className="
        space-y-2
        "
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl p-3 transition-colors ${
              isActive
                ? "bg-emerald-600 text-white"
                : "text-gray-400 hover:bg-white/5"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Board
        </NavLink>

        <NavLink
          to="/team"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl p-3 transition-colors ${
              isActive
                ? "bg-emerald-600 text-white"
                : "text-gray-400 hover:bg-white/5"
            }`
          }
        >
          <Users size={18} />
          Team
        </NavLink>

        <NavLink
          to="/labels"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl p-3 transition-colors ${
              isActive
                ? "bg-emerald-600 text-white"
                : "text-gray-400 hover:bg-white/5"
            }`
          }
        >
          <Tag size={18} />
          Labels
        </NavLink>
      </nav>
    </aside>
  );
}
