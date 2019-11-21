import React, { useState } from "react";
const AreaInput = () => {
  const [areaState, setAreaState] = useState({ areaLabel: "" });
  const [formState, setFormState] = useState(["", "", ""]);
  console.log(areaState, "area change");
  const handleChange = e => {
    setAreaState({ ...areaState, [e.target.name]: e.target.value });
  };
  const addPoint = e => {
    setFormState([...formState, ""]);
  };
  return (
    <div>
      <label htmlFor="label1">Area Label </label>
      <input
        type="text"
        name="areaLabel"
        id="areaLabel"
        value={areaState.areaLabel}
        onChange={handleChange}
      />
      {formState.map((val, idx) => {
        const tickId = `${idx}`;
        return (
          <div key={`tick-${idx}`}>
            <label htmlFor={tickId}>{`Point to mark ${idx + 1} `}</label>
            <input
              type="text"
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
      <button type="button" value="Add New Point" onClick={addPoint} >Add New Point</button>
    </div>
  );
};
export default AreaInput;