import React from "react";

export default function Humidity({ value }) {
  return (
    <div className="quadrant">
      <h1 className="title-text">Humidity</h1>
      <h1 className="value-text">{value + " %"}</h1>
    </div>
  );
}
