import React from "react";
import Button from "@material-ui/core/Button";
import LineInput from "./LineInput";
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
      <Button className="bottomInput" variant="outlined" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};
export default Form;
