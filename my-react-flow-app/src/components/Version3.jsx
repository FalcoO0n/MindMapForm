import { useCallback, useState } from "react";
import ReactFlow, { Background, MiniMap, addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";

//custom components
import TextUpdaterNode from "./TextUpdator/VersionTwo.jsx";
import TextNode from "./FunctionalCluster/TextNode.jsx";
import UpperCaseNode from "./FunctionalCluster/UpperCaseNode.jsx";

import "./TextUpdator/textUpdator.css";
import CounterNode from "./CounterNode/CounterNode.jsx";
import "./CounterNode/counterStyle.css";
import Navbar from "./Navbar.jsx";
import CustomEdge from "./customEdge.jsx";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [
  { id: "node-1", type: "textUpdater", position: { x: 50, y: 200 }, data: { value: 123 } },
  { id: "node-5", type: "textNode", position: { x: 150, y: 300 }, data: { text: "Hello" } },
  {
    id: "1a",
    type: "uppercase",
    data: {},
    position: { x: 100, y: 0 },
  },
//   {
//     id: "node-2",
//     type: "output",
//     targetPosition: "top",
//     position: { x: 0, y: 200 },
//     data: { label: "node 2" },
//   },
//   {
//     id: "node-3",
//     type: "output",
//     targetPosition: "top",
//     position: { x: 200, y: 200 },
//     data: { label: "node 3" },
//   },
  {
    id: "node-4",
    type: "counterNode",
    targetPosition: "left",
    position: { x: 350, y: 190 },
    data: { label: "node 4" },
  },
];

const initialEdges = [
//   { id: "edge-1", type: "custom-edge", source: "node-1", target: "node-2", sourceHandle: "b"},
//   { id: "edge-2", source: "node-1", sourceHandle: "a", target: "node-3" },
  { id: "edge-3", source: "node-1", target: "node-4", sourceHandle: "c", targetHandle: "a" },
];

const edgeTypes = {
  "custom-edge": CustomEdge,
};

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { 
    textUpdater: TextUpdaterNode, 
    textNode: TextNode, 
    counterNode: CounterNode,
    uppercase: UpperCaseNode,
};

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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

  return (
    <div style={{ width: "100vw", height: "80vh" }}>
      <Navbar />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // fitView
        
        style={rfStyle}
      >
        <Background />
        <MiniMap nodeStrokeWidth={2} />
      </ReactFlow>
    </div>
  );
}

export default Flow;
