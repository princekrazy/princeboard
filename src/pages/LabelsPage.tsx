import { useState } from "react";

import { useLabels } from "../hooks/useLabels";

export default function LabelsPage() {
  const { labels, addLabel, deleteLabel } = useLabels();

  const [name, setName] = useState("");

  return (
    <div className="p-8 text-white">
      <h1
        className="
text-3xl
font-bold
mb-8
"
      >
        Labels
      </h1>

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
          placeholder="Label name"
          className="
bg-[#151B2B]
rounded-xl
p-3
"
        />

        <button
          onClick={() => {
            addLabel(name, "#6366F1");

            setName("");
          }}
          className="
bg-emerald-600
px-5
rounded-xl
"
        >
          Create
        </button>
      </div>

      <div
        className="
space-y-3
"
      >
        {labels.map((label) => (
          <div
            key={label.id}
            className="
bg-[#151B2B]
rounded-xl
p-4
flex
justify-between
"
          >
            <span>{label.name}</span>

            <button
              onClick={() => deleteLabel(label.id)}
              className="
text-red-400
"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
