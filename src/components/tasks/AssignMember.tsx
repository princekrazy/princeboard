import { useMembers } from "../../hooks/useMembers";

import { useAssignments } from "../../hooks/useAssignments";
import { useTaskStore } from "../../store/taskStore";

interface Props {
  taskId: string;

  assigned: any[];
  refresh: () => void;
}

export default function AssignMembers({
  taskId,

  assigned,
}: Props) {
  const updateTaskAssignees = useTaskStore(
    (state) => state.updateTaskAssignees,
  );
  const { members } = useMembers();

  const { assignMember, removeMember } = useAssignments();

  function isAssigned(id: string) {
    return assigned.some((item) => item.member_id === id);
  }

  return (
    <div
      className="
mt-6
"
    >
      <h3
        className="
font-semibold
mb-3
"
      >
        Assigned Members
      </h3>

      <div
        className="
space-y-2
"
      >
        {members.map((member) => (
          <label
            key={member.id}
            className="
flex
items-center
gap-3
bg-[#151B2B]
p-3
rounded-lg
cursor-pointer
"
          >
            <input
              type="checkbox"
              checked={isAssigned(member.id)}
              onChange={async (e) => {
                let updatedAssignments = [...assigned];

                if (e.target.checked) {
                  await assignMember(taskId, member.id);

                  updatedAssignments.push({
                    member_id: member.id,
                    members: member,
                  });
                } else {
                  await removeMember(taskId, member.id);

                  updatedAssignments = updatedAssignments.filter(
                    (item) => item.member_id !== member.id,
                  );
                }

                updateTaskAssignees(taskId, updatedAssignments);
              }}
            />

            <div
              className="
h-8
w-8
rounded-full
flex
items-center
justify-center
text-white
text-sm
"
              style={{
                backgroundColor: member.avatar_color,
              }}
            >
              {member.name[0]}
            </div>

            <span>{member.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
