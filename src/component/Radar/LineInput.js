import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
const LineInput = () => {
  const [state, setState] = useState({
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
  const handleChange = e => {
    if (e.target.name === "lineLabel") {
      setState({
        ...state,
        [e.target.name]: e.target.value
      });
    } else {
      const updatedTicks = { ...state };
      updatedTicks[e.target.name][e.target.id].tickLabel = e.target.value;
      setState({
        ...updatedTicks
      });
    }
  };

  const addTick = e => {
    const updatedTicks = { ...state };
    const indexToGo = state.ticks.length;
    updatedTicks["ticks"][indexToGo] = { tickLabel: "" };
    setState({
      ...updatedTicks
    });
  };
  return (
    <div>
      <TextField
        label="Line Label"
        name="lineLabel"
        id="label1"
        value={state.lineLabel}
        onChange={handleChange}
      />
      {state.ticks.map((val, idx) => {
        const tickId = `${idx}`;
        return (
          <div key={`tick-${idx}`}>
            <TextField
              label={`Tick Label ${idx + 1} `}
              name={"ticks"}
              id={tickId}
              value={state.ticks[idx].label}
              className="ticks"
              onChange={handleChange}
            />
          </div>
        );
      })}
      <Button
        className="bottomInput"
        variant="outlined"
        color="primary"
        name="ticks"
        onClick={addTick}
      >
        Add New Tick
      </Button>
    </div>
  );
};
export default LineInput;
