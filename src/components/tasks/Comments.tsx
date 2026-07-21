import { useState } from "react";

import { useComments } from "../../hooks/useComments";

interface Props {
  taskId: string;
}

export default function Comments({ taskId }: Props) {
  const {
    comments,

    addComment,
  } = useComments(taskId);

  const [text, setText] = useState("");

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
        Comments
      </h3>

      <div
        className="
space-y-3
"
      >
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="
bg-[#151B2B]
rounded-lg
p-3
"
          >
            <p>{comment.content}</p>

            <p
              className="
text-xs
text-gray-500
mt-2
"
            >
              {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div
        className="
flex
gap-2
mt-4
"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="
flex-1
bg-[#151B2B]
rounded-lg
p-3
text-white
"
        />

        <button
          onClick={() => {
            addComment(text);

            setText("");
          }}
          className="
bg-emerald-600
px-4
rounded-lg
"
        >
          Send
        </button>
      </div>
    </div>
  );
}
