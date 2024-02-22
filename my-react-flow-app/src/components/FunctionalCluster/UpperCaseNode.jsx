import { memo, useEffect } from "react";
import {
  Position,
  //   NodeProps,
  useReactFlow,
  Handle,
  //   useHandleConnections,
//   useNode,
} from "reactflow";

function UppercaseNode({ id, isConnectable }) {
  const { updateNodeData } = useReactFlow();
//   const { data } = useNode(nodes.find((node) => node.id === id));

//   useEffect(() => {
//     if (data && data.text) {
//       data.text = data.text.toUpperCase();
//     }
//   }, [data]);

  return (
    <div
      style={{
        background: "#eee",
        color: "#222",
        padding: 10,
        fontSize: 12,
        borderRadius: 10,
      }}
    >
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div>uppercase transform</div>
      {/* <div>{data && data.text}</div> */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(UppercaseNode);
