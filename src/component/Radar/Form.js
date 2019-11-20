import React, { useState, useEffect } from "react";

const Form = () => {
  //   const [formData, setFormData] = useState({
  //     num: 3,
  //     genLabels: [],
  //     tickArray: [],
  //     areaNum: ""
  //   });
  //   useEffect(() => {
  //     const genLabels = armLabelGen(formData.num);
  //     setFormData({
  //       ...formData,
  //       genLabels
  //       // tickArray
  //     });
  //   }, [formData.num]);
  //   const handleChanges = e => {
  //     // if (e.target.name === "armsNum") {
  //     //   const labelsToGenerate = armLabelGen(formData.armsNum);
  //     //   setFormData({
  //     //     ...formData,
  //     //     generatedLabels: labelsToGenerate,
  //     //     [e.target.name]: e.target.value
  //     //   });
  //     // }
  //     // is there a way to make tickData an array? e.target.value overrides it until a submit?
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value
  //     });
  //   };
  //   const submit = e => {
  //     e.preventDefault();
  //     const tickArray = document.getElementById("tickArray").value.split("\n");
  //     setFormData({
  //       ...formData
  //       // genLabels
  //       // tickArray
  //     });
  //   };
  //   //   const combineArmsAndTicks = () => {};
  //   const [armLabels, setArmLabels] = useState([]);
  //   const handleArmLabelChanges = e => {
  //     console.log(e.target.name, e.target.value);
  //     setArmLabels([...armLabels, { [e.target.name]: e.target.value }]);
  //   };
  //   const addForm = num => {
  //     setFormData(formData => {
  //       return { ...formData, num: num + 1 };
  //     });
  //   };
  //   //   set arm labels
  //   // const submitArmLabels = e => {
  //   //   e.preventDefault();
  //   //   const target = e.target.querySelector("input");
  //   //   const newArmLabel = {
  //   //     [target.name]: target.value
  //   //   };
  //   //   setArmLabels([{ ...armLabels, [target.name]: target.value }]);
  //   // };
  //   // form multipliers
  //   const armLabelGen = num => {
  //     let rows = [];
  //     for (let i = 1; i <= 3; i++) {
  //       rows.push(
  //         <div key={i}>
  //           <label htmlFor={`armLabel${i}`}>Label Arm {i}</label>
  //           <input
  //             id={`armLabel${i}`}
  //             type="text"
  //             name={`armLabel${i}`}
  //             value={armLabels.armLabel}
  //             // value={armLabels.armLabel + String(i)}
  //             onChange={handleArmLabelChanges}
  //           />
  //           {/* label is *NOT* updating dynamically */}
  //           <button type="submit">Label </button>
  //         </div>
  //       );
  //     }
  //     return rows;
  //   };
  //   console.log(formData);
  //   // ******* i need to parse each array index and make that into its own array
  //   //   const radioGen = (armLabels, tickData, areas) => {
  //   //     let rows = [];
  //   //     const ticks = tickData.map(line => line.split(" "));
  //   //     const lines = armLabels.map((label, i) => {
  //   //       return {
  //   //         id: i,
  //   //         label: label,
  //   //         tick: [
  //   //           {
  //   //             id: i,
  //   //             label: ticks,
  //   //             position: i
  //   //           }
  //   //         ]
  //   //       };
  //   //     });
  //   //     return rows;
  //   //   };
  //   return (
  //     <>
  //       {/* how many arms? */}
  //       <form id="form" onSubmit={submit}>
  //         <div>
  //           {/* arm labels */}
  //           {formData.genLabels &&
  //             formData.genLabels.map(label => {
  //               return label;
  //             })}
  //           <button onClick={() => addForm(formData.num)}>Add arm</button>
  //         </div>
  //         {/* tick values */}
  //         <label htmlFor="tickArray"></label>
  //         <textarea
  //           id="tickArray"
  //           name="tickArray"
  //           onChange={handleChanges}
  //           rows="10"
  //           cols="50"
  //         />
  //         <br />
  //         {/* how many areas? */}
  //         <label htmlFor="areaNum">How many areas?</label>
  //         <input
  //           id="areaNum"
  //           type="text"
  //           name="areaNum"
  //           value={formData.areaNum}
  //           onChange={handleChanges}
  //         />
  //         <br />
  //         <button type="submit">set area #</button>
  //       </form>
  //       <br />
  //     </>
  //   );
};

export default Form;