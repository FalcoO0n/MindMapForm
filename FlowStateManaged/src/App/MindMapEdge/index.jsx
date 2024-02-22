import {BaseEdge, getStraightPath} from 'reactflow'; 

function MindMapEdge(props){
    const {sourceX, sourceY, targetX, targetY} = props;

    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    })

    return <BaseEdge {...props} path={edgePath} />
       
    
}

export default MindMapEdge;