import React, { useRef, useCallback } from "react";
import ReactFlow, { Controls, Panel, ConnectionLineType, useStoreApi, useReactFlow  } from "reactflow";
import { shallow } from "zustand/shallow";
import useStore from "./store";
// we need to import the React Flow styles to make it work
import "reactflow/dist/style.css";
import MindMapEdge from "./MindMapEdge";
import MindMapNode from "./MindMapNode";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
});

// this makes the node origin to be in the center of a node
const nodeOrigin = [0.5, 0.5];
const nodeTypes = { mindmap: MindMapNode };
const edgeTypes = { mindmap: MindMapEdge };
const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

function Flow() {
  // whenever we use multiple values, we should use shallow for making sure that the component only re-renders when one of the values change

  const store = useStoreApi(); // we need to use the store api to access the state
  const { nodes, edges, onNodesChange, onEdgesChange } = useStore(selector, shallow);

  const connectingNodeId = useRef(null);

  const getChildNodePosition = (event, parentNode) => {
    const {domNode} = store.getState();

    if(
      !domNode ||
      !parentNode?.positionAbsolute ||
      !parentNode?.width ||
      !parentNode?.height
    ){
      return ;
    }
    const {top, left} = domNode.getBoundingClientRect();

    const panePosition =({
      x: event.clientX - left,
      y: event.clientY - top,
    
    })

    return {
      x: panePosition.x - parentNode.positionAbsolute.x - parentNode.width / 2,
      y: panePosition.y - parentNode.positionAbsolute.y - parentNode.height /2,
    }
  }

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback((event) => {
    // we only want to create a new node if the connection ends on the pane
    const { nodeInternals } = store.getState();
    const targetIsPane = event.target.classList.contains("react-flow__pane");

    if (targetIsPane && connectingNodeId.current) {
      const parentNode = nodeInternals.get(connectingNodeId.current); //nodeInternals is a Map that contains all the nodes and current state
      const childNodePosition = getChildNodePosition(event, parentNode);

      if (parentNode && childNodePosition) {
        addChildNode(parentNode, childNodePosition);
      }

      console.log(`add new node with parent node ${connectingNodeId.current}`);
    }
  }, [getChildNodePosition]);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeOrigin={nodeOrigin}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineStyle={connectionLineStyle}
      connectionLineType={ConnectionLineType.Straight}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      fitView
    >
      <Controls showInteractive={false} />
      <Panel position="top-left">React Mind Map Form</Panel>
    </ReactFlow>
  );
}

export default Flow;
