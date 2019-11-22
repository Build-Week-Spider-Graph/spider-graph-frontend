import React, { useEffect, useRef, useState } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import drawRadarChart from "../../utils/drawRadarChart";
import generateOptions from "../../utils/generateOptions";
// import { data as chartData } from "../../utils/dataFile";
import { connect } from "react-redux";
import {
  graphData,
  graphIdData,
  graphIdLinesData,
  graphIdLinesIdData,
  graphIdAreasData,
  graphIdAreasIdData,
  graphIdLinesIdPointsData,
  graphIdAreasIdPointsData
} from "../../store/actions/userActions";

const RadarChart = props => {
  const [graphArray, setGraphArray] = useState();
  const [pointArray, setPointArray] = useState();
  const [finalData, setFinalData] = useState();
  let svgRef = useRef(null);

  useEffect(() => {
    let p = [];
    if (props.graphids) {
      setGraphArray({
        ...graphArray,
        title: props.graphids[0].title,
        lines: props.graphidlines,
        areas: props.graphidareas
      });
    }
    if (props.graphidlines) {
      props.graphidlines.map(e =>
        axiosWithAuth()
          .get(`/api/graphs/${e.graph_id}/lines/${e.id}/points`)
          .then(res => {
            res.data.map(ee => {
              return p.push(ee);
            });
          })
      );
    }
    setPointArray(p);
  }, [props.graphids, props.graphidlines]);

  useEffect(() => {
    if (
      graphArray &&
      graphArray.areas !== undefined &&
      pointArray[0] !== undefined
    ) {
      // currently iterations are hardcoded
      const newPointArray = [];
      for (let i = 0; i < 4; i++) {
        pointArray.map(point => {
          if (point.position === i + 1) {
            newPointArray.push({
              ...point,
              label: `${point.label}${i}`
            });
          }
        });
      }

      /* if need to change back, delete newPointArray above
        replace everywhere with pointArray
        delete the second .map on 'lines'
      */

      const lines = graphArray.lines
        .map((line, i) => {
          return {
            ...line,
            tick: pointArray.filter(point => point.line_id === line.id)
          };
        })
        .map(line => {
          return {
            ...line,
            tick: line.tick.map((tick, i) => {
              return { ...tick, label: `${tick.label}${i}` };
            })
          };
        });

      const areas = graphArray.areas.map(area => {
        const obj = {};
        const points = newPointArray.filter(point => area.id === point.area_id);
        lines.forEach((line, i) =>
          points.forEach(point => {
            if (point.line_id === i + 1) {
              obj[line.label] = point.label;
            }
          })
        );
        return {
          ...area,
          points: obj
        };
      });
      const data = {
        title: graphArray.title,
        lines,
        areas
      };
      setFinalData(data);
    }
  }, [graphArray, pointArray, props.graphids, props.graphidlines]);
  console.log(finalData, "finalData");

  useEffect(() => {
    if (finalData && finalData.lines) {
      const radarChartOptions = generateOptions(finalData.lines);
      drawRadarChart(
        ".radarChart1",
        finalData.areas,
        radarChartOptions,
        svgRef
      );
    }
  }, [finalData]);

  return (
    <>
      <div className="radarChart" ref={svgRef}></div>
      <div className="buttonContainer">
        <button className="displayDataButton" onClick={() => props.graphData()}>
          fetch graphs
        </button>
        <button
          className="displayDataButton"
          onClick={() => props.graphIdData(1)}
        >
          fetch graph-id
        </button>
        <button
          className="displayDataButton"
          onClick={() => props.graphIdLinesData(1)}
        >
          fetch graph-id / lines
        </button>
        <button
          className="displayDataButton"
          onClick={() => props.graphIdLinesIdData(1, 1)}
        >
          fetch graph-id / line-id
        </button>
        <button
          className="displayDataButton"
          onClick={() => props.graphIdAreasData(1)}
        >
          fetch graph-id / areas
        </button>
        <button
          className="displayDataButton"
          onClick={() => props.graphIdAreasIdData(1, 2)}
        >
          fetch graph-id / areas-id
        </button>
        <button
          className="displayDataButton"
          onClick={() => props.graphIdLinesIdPointsData(1, 2)}
        >
          fetch graph-id / lines-id / points
        </button>
        <button
          className="displayDataButton"
          onClick={() => props.graphIdAreasIdPointsData(1, 2)}
        >
          fetch graph-id / areas-id / points
        </button>
        <button
          className="displayDataButton"
          onClick={() => console.log(props)}
        >
          check props
        </button>
        <button
          className="displayDataButton"
          onClick={() => console.log(finalData)}
        >
          check finalData
        </button>

        <button
          className="displayDataButton"
          onClick={() => console.log(graphArray, pointArray)}
        >
          graph array point array
        </button>
        <button
          className="displayDataButton"
          onClick={() => console.log(props)}
        >
          props
        </button>

        <button
          className="displayDataButton"
          onClick={() => console.log(props.graphs[0].id)}
        >
          graph id
        </button>
        <button
          className="displayDataButton"
          onClick={() => console.log(props.graphs[0].title)}
        >
          graph title
        </button>

        <button
          className="displayDataButton"
          onClick={() => console.log(props.graphidlines[0].id)}
        >
          line id
        </button>
        <button
          className="displayDataButton"
          onClick={() => console.log(props.graphidlines[0].label)}
        >
          line label
        </button>

        <button
          className="displayDataButton"
          onClick={() => console.log(props.graphidlinesidpoints[0].id)}
        >
          tick id
        </button>
        <button
          className="displayDataButton"
          onClick={() => console.log(props.graphidlinesidpoints[0].label)}
        >
          tick label
        </button>
        <button
          className="displayDataButton"
          onClick={() => console.log(props.graphidlinesidpoints[0].position)}
        >
          tick position
        </button>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    error: state.error,
    graphs: state.graphs,
    graphids: state.graphids,
    graphidlines: state.graphidlines,
    graphidlinesid: state.graphidlinesid,
    graphidareas: state.graphidareas,
    graphidareasid: state.graphidareasid,
    graphidlinesidpoints: state.graphidlinesidpoints,
    graphidareasidpoints: state.graphidareasidpoints
  };
};
export default connect(mapStateToProps, {
  graphData,
  graphIdData,
  graphIdLinesData,
  graphIdLinesIdData,
  graphIdAreasData,
  graphIdAreasIdData,
  graphIdLinesIdPointsData,
  graphIdAreasIdPointsData
})(RadarChart);
