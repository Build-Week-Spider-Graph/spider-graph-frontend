import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
  console.log(labelState, "label state");
  const handleLabelChange = e =>
    setLabelState({
      ...labelState,
      [e.target.name]: e.target.value
    });
  const handleTickChange = e => {
    const updatedTicks = { ...labelState };
    updatedTicks[e.target.name][e.target.id].tickLabel = e.target.value;
    setLabelState({
      ...updatedTicks
    });
  };
  const addTick = e => {
    const newTick = { tickLabel: "" };
    const updatedTicks = { ...labelState };
    const indexToGo = labelState.ticks.length;
    updatedTicks["ticks"][indexToGo] = newTick;
    setLabelState({
      ...updatedTicks
    });
  };
  return (
    <div>
      <TextField
        label="Line Label"
        name="lineLabel"
        id="label1"
        value={labelState.lineLabel}
        onChange={handleLabelChange}
      />
      {labelState.ticks.map((val, idx) => {
        const tickId = `${idx}`;
        return (
          <div key={`tick-${idx}`}>
            <TextField
              label={`Tick Label ${idx + 1} `}
              name={"ticks"}
              id={tickId}
              data-idx={tickId}
              value={labelState.ticks[idx].label}
              className="ticks"
              onChange={handleTickChange}
            />
          </div>
        );
      })}
      <Button className="bottomInput" variant="outlined" color="primary" name="ticks" onClick={addTick}>
        Add New Tick
      </Button>
    </div>
  );
};
export default LineInput;