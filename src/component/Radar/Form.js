import React from "react";
import Button from "@material-ui/core/Button";
import LineInput from "./LineInput";
import AreaInput from "./AreaInput";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
const submitForm = e => {
  e.preventDefault();
  axiosWithAuth().post("/api/graphs")
        .then(res => console.log(res, "success"))
        .catch(err => console.log(err, "error"))
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
