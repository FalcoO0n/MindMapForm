import { memo, useState } from "react";
import { Position, Handle,  useReactFlow } from "reactflow";

function TextNode({ id, data }) {
  const { updateNodeData } = useReactFlow();
  ;
  const updateText = (text) => {
    setText(text);
    updateNodeData(id, { text });
  };

  return (
    <>
      <div
        style={{
          background: "#eee",
          color: "#222",
          padding: 10,
          fontSize: 12,
          borderRadius: 10,
        }}
      >
        <div>node {id}</div>
        <div>
          <input className="nodrag" onChange={(event) => updateText(event.target.value)} value={data.text} />
        </div>
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}

export default memo(TextNode);