import * as d3 from "d3";

const generateOptions = data => {
  // create the 'arms' from the data
  const fields = data.map(line => {
    return line.label;
  });

  // create the scale, mapping onto each arm from data
  const scalesAndAxes = {};
  fields.forEach((field, i) => {
    let scaleMapping = {};
    const newScale = data[i].tick.map(tick => {
      return tick.label;
    });
    // give padding so the data doesn't start at the origin
    newScale.unshift("  ");
    scaleMapping.scale = d3.scaleBand().domain(newScale);
    scaleMapping.axis = d3
      .axisBottom(newScale)
      .scale(scaleMapping.scale)
      .tickValues(newScale);
    scalesAndAxes[field] = scaleMapping;
  });

  // sets graph size; is responsive to window size but graph needs to be refreshed to update
  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const width =
    Math.min(1200, window.innerWidth - 10) - margin.left - margin.right;
  const height = Math.min(
    width,
    window.innerHeight - margin.top - margin.bottom - 20
  );
  return {
    fields,
    scalesAndAxes,
    width,
    height,
    margin
  };
};

export default generateOptions;