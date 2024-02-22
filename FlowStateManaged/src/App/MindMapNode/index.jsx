import { Handle, Position } from 'reactflow';

function MindMapNode({id, data}){
    return (
        <>
            <input defaultValue={data.label} />
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    )
}

export default MindMapNode;