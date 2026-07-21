import { Trash2 } from "lucide-react";

import type { Member } from "../../types/member";

interface Props {
  member: Member;

  deleteMember: (id: string) => void;
}

export default function MemberCard({ member, deleteMember }: Props) {
  return (
    <div
      className="
bg-[#151B2B]
border
border-white/10
rounded-xl
p-5
flex
items-center
justify-between
text-white
"
    >
      <div
        className="
flex
items-center
gap-4
"
      >
        <div
          className="
h-12
w-12
rounded-full
flex
items-center
justify-center
font-bold
"
          style={{
            backgroundColor: member.avatar_color,
          }}
        >
          {member.name[0]}
        </div>

        <div>
          <h3
            className="
font-semibold
"
          >
            {member.name}
          </h3>

          <p
            className="
text-sm
text-gray-400
"
          >
            Team Member
          </p>
        </div>
      </div>

      <button
        onClick={() => deleteMember(member.id)}
        className="
text-red-400
hover:text-red-300
"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
