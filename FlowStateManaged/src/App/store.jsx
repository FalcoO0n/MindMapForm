import {
  // Edge,
  // EdgeChange,
  // Node,
  // NodeChange,
  // OnNodesChange,
  // OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

import { create } from "zustand";
import { nanoid } from "nanoid/non-secure";

const useStore = create((set, get) => ({
  nodes: [
    {
      id: "root",
      id1: "1",
      id2: "0",
      type: "mindmap",
      data: { label: "S3 Functionality" },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgeChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  levelNodeTypes: ["mindmap", "mindmap", "mindmap", "mindmap"],
  currentLevel: 0,
  addChildNode: (parentNode, position) => {
    const currentLevel = parentNode.level !== undefined ? parentNode.level + 1 : 1; // Calculate next level
    const nodeType = get().levelNodeTypes[currentLevel % get().levelNodeTypes.length];

    const newNode = {
      id: nanoid(),
      type: nodeType, // Assign correct type based on level
      data: { label: `New Node (Level ${currentLevel})` }, // Update label with current level
      position,
      parentNode: parentNode.id,
      level: currentLevel, // Assign level to the new node
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
    };

    set((state) => ({
      nodes: [...state.nodes, newNode],
      edges: [...state.edges, newEdge],
    }));
  },

  updateNodeLabel: (nodeId, label) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {...node.data, label};
        }
        return node;
      })
    })
  },

  saveState: () => {
    const state = get();
    localStorage.setItem("mindmapState", JSON.stringify(state));
  },
  restoreState: () => {
    const savedState = localStorage.getItem("mindmapState");
    if (savedState){
      set(JSON.parse(savedState));
    }
  }

}));

export default useStore;
