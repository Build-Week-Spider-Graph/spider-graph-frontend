import * as d3 from "d3";

const drawRadarChart = (id, data, options, svgRef) => {
  var cfg = {
    w: 800, //Width of the circle
    h: 600, //Height of the circle
    margin: { top: 150, right: 100, bottom: 150, left: 100 }, //The margins of the SVG
    labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 80, //The number of pixels after which a label needs to be given a new line
    opacityArea: 0.35, //The opacity of the area of the blob
    dotRadius: 4, //The size of the colored circles of each blog
    opacityCircles: 0.1, //The opacity of the circles of each blob
    strokeWidth: 0.7, //The width of the stroke around each blob
    roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
    color: d3.scaleOrdinal(d3.schemeDark2), //Color function
    hover: true,
    axisLabels: true,
    tickLabels: true,
    fields: false,
    scalesAndAxes: false
  };

  //Put all of the options into a variable called cfg
  if ("undefined" !== typeof options) {
    for (let i in options) {
      if ("undefined" !== typeof options[i]) {
        cfg[i] = options[i];
      }
    }
  }

  /*
   * Given a dataset which is an array of objects (that all have the same
   * fields), filter and sort those fields
   *
   */
  const subsetAndSortData = (data, fields) => {
    data = data.map(function(row) {
      var newRow = {};
      fields.map(function(key) {
        return (newRow[key] = row[key]);
      });
      return newRow;
    });
    return data;
  };

  // If fields specified, filter and sort data to fields
  if (cfg.fields !== false) {
    data = subsetAndSortData(data, cfg.fields);
  } else {
    cfg.fields = Object.keys(data[0]);
  }

  const autos = cfg.scalesAndAxes;
  let scales = cfg.fields.map(function(k) {
    return autos[k].scale;
  });
  let axes = cfg.fields.map(function(k) {
    return autos[k].axis;
  });

  // Rearrange data to an array of arrays
  data = data.map(row => {
    let newRow = cfg.fields.map(key => {
      return { axis: key, value: row[key] };
    });
    return newRow;
  });

  const total = cfg.fields.length, //The number of different axes
    radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
    angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

  // Update ranges of scales to match radius.
  scales = scales.map(function(i) {
    // This is gross - no other way to get ordinal scales to behave correctly.
    if (typeof i.rangePoints !== "undefined") {
      return i.rangePoints([0, radius]);
    } else {
      return i.range([0, radius]);
    }
  });

  /////////////////////////////////////////////////////////
  //////////// Create the container SVG and g /////////////
  /////////////////////////////////////////////////////////

  //Remove whatever chart with the same id/class was present before
  d3.select(svgRef.current)
    .select("svg")
    .remove();

  //Initiate the radar chart SVG
  const svg = d3
    .select(svgRef.current)
    .append("svg")
    .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
    .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
    .attr("class", "radar" + id);

  //Append a g element
  const g = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
        (cfg.w / 2 + cfg.margin.left) +
        "," +
        (cfg.h / 2 + cfg.margin.top) +
        ")"
    );

  /////////////////////////////////////////////////////////
  //////////////////// Draw the axes //////////////////////
  /////////////////////////////////////////////////////////

  //Wrapper for the grid & axes
  const axisGrid = g.append("g").attr("class", "axisWrapper");

  //Create the straight lines radiating outward from the center
  const axis = axisGrid
    .selectAll(".axis")
    .data(cfg.fields)
    .enter()
    .append("g")
    .attr("class", "axis");
  //Append the axes
  const axisGroup = axis
    .append("g")
    .attr("transform", (d, i) => {
      return "rotate(" + ((180 / Math.PI) * (i * angleSlice) + 270) + ")";
    })
    .each(function(d, i) {
      let ax = axes[i];
      if (cfg.tickLabels !== true) {
        ax = ax.tickFormat(function(d) {
          return "";
        });
      }
      ax(d3.select(this));
    });

  //Append axis category labels
  if (cfg.axisLabels === true) {
    //   const rotate = 360 * angleSlice + 25;
    axisGroup
      .append("text")
      .attr("class", "legend")
      .style("font-size", "16px")
      .attr("text-anchor", "middle")
      .attr("transform", (d, i) => {
        return (
          "translate(" +
          radius * cfg.labelFactor +
          ", 20) rotate(" +
          (i * angleSlice - 90) +
          ")" +
          (i * angleSlice < 2 || i * angleSlice > 5 ? "rotate(180)" : "")
        );
      })
      .attr("dy", "1em")
      // .attr("x", function(d, i) {
      //   return (
      //     radius * cfg.labelFactor * Math.cos(angleSlice * i - Math.PI / 2)
      //   );
      // })
      // .attr("y", function(d, i) {
      //   return (
      //     radius * cfg.labelFactor * Math.sin(angleSlice * i - Math.PI / 2)
      //   );
      // })

      .text(function(d) {
        return d;
      })
      .call(wrap, cfg.wrapWidth);
  }

  // rotate text of Tick Marks
  const tickText = d3.selectAll("g.tick").select("text");
  tickText
    .attr("transform", " rotate(245)")
    .attr("dx", "-2em")
    .attr("dy", "-3em");

  /////////////////////////////////////////////////////////
  ///////////// Draw the radar chart blobs ////////////////
  /////////////////////////////////////////////////////////

  //The radial line function
  const radarLine = d3
    .radialLine()
    .curve(d3.curveLinearClosed)
    .radius((d, i) => {
      return scales[i](d.value);
    })
    .angle((d, i) => {
      return i * angleSlice;
    });

  if (cfg.roundStrokes) {
    radarLine.curve(d3.curveCardinalClosed);
  }

  //Create a wrapper for the blobs
  const blobWrapper = g
    .selectAll(".radarWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarWrapper")
    .attr("class", (d, i) => {
      return "radarWrapper" + i;
    });

  //Append the backgrounds
  blobWrapper
    .append("path")
    .attr("class", (d, i) => {
      return "radarArea" + i;
    })
    .attr("d", (d, i) => {
      return radarLine(d);
    })
    .style("fill", (d, i) => {
      return cfg.color(i);
    })
    .style("fill-opacity", cfg.opacityArea)
    .on("mouseover", function(d, i) {
      if (cfg.hover === true) {
        //Dim all blobs
        d3.selectAll(".radarArea" + i)
          .transition()
          .duration(200)
          .style("fill-opacity", 0.1);
        //Bring back the hovered over blob
        d3.select(this)
          .transition()
          .duration(200)
          .style("fill-opacity", 0.7);
      }
    })
    .on("mouseout", function(d, i) {
      if (cfg.hover === true) {
        //Bring back all blobs
        d3.selectAll(".radarArea" + i)
          .transition()
          .duration(200)
          .style("fill-opacity", cfg.opacityArea);
      }
    });

  //Create the outlines
  blobWrapper
    .append("path")
    .attr("class", "radarStroke")
    .attr("d", function(d, i) {
      return radarLine(d);
    })
    .style("stroke-width", cfg.strokeWidth + "px")
    .style("stroke", function(d, i) {
      return cfg.color(i);
    })
    .style("fill", "none");

  //Append the "points"
  blobWrapper
    .selectAll(".radarCircle")
    .data(function(d, i) {
      return d;
    })
    .enter()
    .append("circle")
    .attr("class", "radarCircle")
    .attr("r", cfg.dotRadius)
    .attr("cx", function(d, i) {
      return scales[i](d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr("cy", function(d, i) {
      return scales[i](d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style("fill", function(d, i, j) {
      return cfg.color();
    })
    .style("fill-opacity", 0.8);

  /////////////////////////////////////////////////////////
  //////// Append invisible circles for tooltip ///////////
  /////////////////////////////////////////////////////////

  if (cfg.hover === true) {
    //Wrapper for the invisible circles on top
    var blobCircleWrapper = g
      .selectAll(".radarCircleWrapper")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "radarCircleWrapper");

    //Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper
      .selectAll(".radarInvisibleCircle")
      .data(function(d, i) {
        return d;
      })
      .enter()
      .append("circle")
      .attr("class", "radarInvisibleCircle")
      .attr("r", cfg.dotRadius * 1.5)
      .attr("cx", function(d, i) {
        return scales[i](d.value) * Math.cos(angleSlice * i - Math.PI / 2);
      })
      .attr("cy", function(d, i) {
        return scales[i](d.value) * Math.sin(angleSlice * i - Math.PI / 2);
      })
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function(d, i) {
        let newX = parseFloat(d3.select(this).attr("cx")) - 10;
        let newY = parseFloat(d3.select(this).attr("cy")) - 10;

        tooltip
          .attr("x", newX)
          .attr("y", newY)
          .text(function(x) {
            return d.value;
          })
          .transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mouseout", function() {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0);
      });

    //Set up the small tooltip for when you hover over a circle
    const tooltip = g
      .append("text")
      .attr("class", "tooltip")
      .style("opacity", 0);
  }

  /////////////////////////////////////////////////////////
  /////////////////// Helper Function /////////////////////
  /////////////////////////////////////////////////////////

  //Taken from http://bl.ocks.org/mbostock/7555321
  //Wraps SVG text
  function wrap(text, width) {
    text.each(function() {
      let text = d3.select(this),
        words = text
          .text()
          .split(/\s+/)
          .reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  } //wrap
}; //RadarChart

export default drawRadarChart;