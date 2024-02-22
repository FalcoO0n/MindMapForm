import React, { useState, useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const [inputData, setInputData] = useState({});
  const [inputValue, setInputValue] = useState('');


  const handleInputChange = useCallback((evt) => {
    setInputValue(evt.target.value);
  }, []);

  const handleUpdateClick = useCallback(() => {
    setInputData(prevData => ({
      ...prevData,
      [Date.now()]: inputValue
    }));
    // console.log(inputData);
  }, [inputValue, inputData]);
  console.log(inputData);

  return (
    <div className="text-updater-node">
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} id="c" />
      <div>
        <label htmlFor="text">Text: </label>
        <input id="text" name="text" onChange={handleInputChange} className="nodrag" />
        <button className="nodrag btn" onClick={handleUpdateClick}>
          Update
        </button>
      </div>
      {/* <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      /> */}
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default TextUpdaterNode;
