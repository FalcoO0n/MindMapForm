import { Handle, Position } from "reactflow";
import { useState } from "react";
import useStore from "../store";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, 15%)",
    backgroundColor: "#f2f9ff",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",

    padding: "50px",
    zIndex: "1000",
  };

  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, .3)",
    zIndex: "1000",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#fff",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    borderRadius: "3px",
    border: "none",
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeButtonStyle} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

function MindMapNode({ id, data }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#abd9f0",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        minHeight: "100px",
        borderRadius: "5px",
        // marginX: "10px",
        padding: "10px",
      }}
    >
      <div className="inputWrapper">
        <div className="dragHandle">
          {/* icon taken from grommet https://icons.grommet.io */}
          <svg viewBox="0 0 24 24">
            <path
              fill="#333"
              stroke="#333"
              strokeWidth="1"
              d="M15 5h2V3h-2v2zM7 5h2V3H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2z"
            />
          </svg>
        </div>
        <input
          value={data.label}
          onChange={(evt) => updateNodeLabel(id, evt.target.value)}
          className="input"
        />
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <button
        style={{
          backgroundColor: "#fff",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
          borderRadius: "3px",
          border: "none",
          padding: "5px",
          marginTop: "10px",
          maxWidth: "100px",
          zIndex: "3",
          cursor: "pointer",
        }}
        onClick={openModal}
      >
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>{data.label}</h3>
      </Modal>
    </div>
  );
}

export default MindMapNode;
