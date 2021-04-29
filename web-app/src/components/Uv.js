import React from "react";

function Uv({ value }) {
  return (
    <div className="quadrant">
      <h1 className="title-text">UV</h1>
      <h1 className="value-text">{value + " nm"}</h1>
    </div>
  );
}

export default Uv;
