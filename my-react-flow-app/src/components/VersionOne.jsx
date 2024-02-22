import React, { useCallback, useState } from "react";
//React Flow
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  Panel
} from "reactflow";
import "reactflow/dist/style.css";
// Custom Components


const initialNodes = [
  { id: "1", position: { x: 25, y: 200 }, data: { label: "1" } },
  {
    id: "2",
    position: { x: 175, y: 300 },
    data: { label: <div>Default Node</div> },
  },
  {
    id: "4",
    position: { x: 175, y: 100 },
    data: { label: <div>Default Node</div> },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
  // { id: "3", position: { x: 0, y: 300 }, data: { label: "3" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

export default function VersionOne() {
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const proOptions = { hideAttribution: true };
  // const onConnect = useCallback((params) => setEdges(addEdge(params, eds)), [setEdges]);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  return(
    <div style={{ width: "100vw", height: "80vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          proOptions={proOptions}
          panOnScrollMode="horizontal" // Add this line
          // fitView="true"
        >
            <Panel position="top-right">top-left</Panel>
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
)
}

