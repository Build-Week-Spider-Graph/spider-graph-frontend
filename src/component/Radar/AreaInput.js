import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
const AreaInput = () => {
  const [areaState, setAreaState] = useState({ areaLabel: "" });
  const [inputNumState, setInputNumState] = useState(["", "", ""]);
  const handleChange = e => {
    setAreaState({ ...areaState, [e.target.name]: e.target.value });
  };
  const addPoint = e => {
    setInputNumState([...inputNumState, ""]);
  };
  return (
    <div>
      <TextField
        label="Area Label"
        name="areaLabel"
        id="areaLabel"
        value={areaState.areaLabel}
        onChange={handleChange}
      />
      {inputNumState.map((val, idx) => {
        const tickId = `${idx}`;
        return (
          <div key={`tick-${idx}`}>
            <TextField
              htmlFor={tickId}
              label={`Point to mark ${idx + 1} `}
              name={tickId}
              id={tickId}
              data-idx={idx}
              value={areaState.name}
              className="points"
              onChange={handleChange}
            />
          </div>
        );
      })}
      <Button
        className="bottomInput"
        variant="outlined"
        color="primary"
        value="Add New Point"
        onClick={addPoint}
      >
        Add New Point
      </Button>
    </div>
  );
};
export default AreaInput;
