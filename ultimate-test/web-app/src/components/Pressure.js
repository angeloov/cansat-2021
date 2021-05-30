import React from "react";

function Pressure({ value }) {
  return (
    <div className="quadrant">
      <h1 className="title-text">Athmosferic</h1>
      <h1 className="title-text">Pressure</h1>
      <h1 className="value-text">{value + " Pa"}</h1>
    </div>
  );
}

export default Pressure;
