import React from "react";

export const Instruction = ({ instrActive, setInstrActive }) => {
  return (
    <div
      className={instrActive ? "modal active" : "modal"}
      onClick={() => setInstrActive(false)}
    >
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <h1>Тут будет инструкция</h1>
      </div>
    </div>
  );
};
