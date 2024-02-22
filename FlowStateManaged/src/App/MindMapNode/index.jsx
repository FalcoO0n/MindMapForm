import { Handle, Position } from 'reactflow';

function MindMapNode({id, data}){
    return (
        <>
            <input defaultValue={data.label} />
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    )
}

export default MindMapNode;