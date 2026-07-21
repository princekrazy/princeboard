import AddMember from "../components/team/AddMember";

import MemberCard from "../components/team/MemberCard";

import { useMembers } from "../hooks/useMembers";

export default function TeamPage() {
  const {
    members,

    loading,

    addMember,

    deleteMember,
  } = useMembers();

  return (
    <div className="p-8 text-white">
      <h1
        className="
text-3xl
font-bold
mb-2
"
      >
        Team Members
      </h1>

      <p
        className="
text-gray-400
mb-8
"
      >
        Manage your workspace members.
      </p>

      <AddMember addMember={addMember} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          className="
space-y-4
"
        >
          {members.length === 0 ? (
            <p
              className="
text-gray-500
"
            >
              No members yet.
            </p>
          ) : (
            members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                deleteMember={deleteMember}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
