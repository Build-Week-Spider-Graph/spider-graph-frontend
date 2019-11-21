import React, { useState, useRef } from "react";
const LineInput = () => {
  const [labelState, setLabelState] = useState({
    lineLabel: "",
    ticks: [
      {
        tickLabel: ""
      },
      {
        tickLabel: ""
      },
      {
        tickLabel: ""
      }
    ]
  });
  let container = useRef(null);
  console.log(labelState, "label state");
  const handleLabelChange = e =>
    setLabelState({
      ...labelState,
      [e.target.name]: e.target.value
    });
  const handleTickChange = e => {
    const updatedTicks = { ...labelState };
    updatedTicks[e.target.className][e.target.dataset.idx].tickLabel =
      e.target.value;
    setLabelState({
      ...updatedTicks
    });
  };
  const addTick = e => {
    const newTick = { tickLabel: "" };
    const updatedTicks = { ...labelState };
    const indexToGo = +e.target.previousSibling.lastChild.dataset.idx + 1;
    updatedTicks[e.target.className][indexToGo] = newTick;
    setLabelState({
      ...updatedTicks
    });
  };
  return (
    <div>
      <label htmlFor="label1">Line Label </label>
      <input
        type="text"
        name="lineLabel"
        id="label1"
        value={labelState.lineLabel}
        onChange={handleLabelChange}
      />
      {labelState.ticks.map((val, idx) => {
        const tickId = `${idx}`;
        return (
          <div key={`tick-${idx}`}>
            <label htmlFor={tickId}>{`Tick Label ${idx + 1} `}</label>
            <input
              type="text"
              name={tickId}
              id={tickId}
              data-idx={tickId}
              value={labelState.ticks[idx].label}
              className="ticks"
              onChange={handleTickChange}
            />
          </div>
        );
      })}
      <button className="ticks" onClick={addTick}>
        Add New Tick
      </button>
    </div>
  );
};
export default LineInput;