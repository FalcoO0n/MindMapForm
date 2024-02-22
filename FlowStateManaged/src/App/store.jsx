import {
    // Edge,
    // EdgeChange,
    // Node,
    // NodeChange,
    // OnNodesChange,
    // OnEdgesChange,
    applyNodeChanges,
    applyEdgeChanges,
  } from 'reactflow';

  import {create} from 'zustand';

const useStore = create((set,get)=>({
    nodes: [
        {
            id: 'root',
            type: 'mindmap',
            data: { label: 'S3 Functionality' },
            position: { x: 0, y: 0 },
        },
    ],
    edges: [],
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        })
    },
    onEdgeChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    addChildNode: (parentNode, position) => {
        const newNode = {
            id: nanoid(),
            type: 'mindmap',
            data: { label: 'New Node' },
            position,
            parentNode: parentNode.id,
        };

        const newEdge = {
            id: nanoid(),
            source: parentNode.id,
            target: newNode.id,
        }

        set({
            nodes: [...get().nodes, newNode],
            edges: [...get().edges, newEdge],
        })
    }
}))

export default useStore;