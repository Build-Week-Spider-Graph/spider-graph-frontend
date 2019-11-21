import React, { useState, useEffect } from "react";

import LineInput from "./LineInput.js";
import AreaInput from "./AreaInput";
const submitForm = e => {
  e.preventDefault();
};
const Form = () => {
  return (
    <form onSubmit={submitForm}>
      <LineInput />
      <LineInput />
      {/* <button value="Add New Label" onClick={addLine}>
        Add another line
      </button> */}
      <hr />
      <AreaInput />
      <AreaInput />
      <input className="bottomInput" type="submit" value="Submit" />
    </form>
  );
};
export default Form;