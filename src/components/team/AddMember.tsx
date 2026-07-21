import { useState } from "react";

interface Props {
  addMember: (name: string) => void;
}

export default function AddMember({ addMember }: Props) {
  const [name, setName] = useState("");

  return (
    <div
      className="
flex
gap-3
mb-8
"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Member name"
        className="
bg-[#151B2B]
border
border-white/10
rounded-xl
px-4
py-3
text-white
flex-1
"
      />

      <button
        onClick={() => {
          if (!name.trim()) return;

          addMember(name);

          setName("");
        }}
        className="
bg-emerald-600
px-5
rounded-xl
text-white
"
      >
        Add Member
      </button>
    </div>
  );
}
