// import { NodeProps } from 'reactflow';
import { useState } from "react";
import "./counterStyle.css";
import { Handle, Position } from "reactflow";

export default function CounterNode(isConnectable) {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-node">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} id="a" />

      <div className="counterHead">
        <p className="counterHeadTitle">Counter Node</p>
      </div>
      <div className="counterBody">
        <p className="text">Count: {count}</p>
        <button className="nodrag btn" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button className="nodrag btn" onClick={() => count > 0 && setCount(count - 1)}>
          Decrease
        </button>
      </div>
      <Handle type="target" position={Position.Right} isConnectable={isConnectable} id="b" />
    </div>
  );
}
