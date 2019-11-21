import React, { useEffect, useRef, useState } from "react";
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import drawRadarChart from "../../utils/drawRadarChart";
import generateOptions from "../../utils/generateOptions";
import { data as chartData } from "../../utils/dataFile";
import { connect } from "react-redux"
import {graphData, graphIdData, graphIdLinesData, graphIdLinesIdData, graphIdAreasData, graphIdAreasIdData, graphIdLinesIdPointsData, graphIdAreasIdPointsData} from "../../store/actions/userActions"


const RadarChart = (props) => {
  const [graphArray, setGraphArray] = useState({})
  const [pointArray, setPointArray] = useState()
  let svgRef = useRef(null);
  const data = chartData;
  const radarChartOptions = generateOptions(data.lines, data.lines);
  useEffect(() => {
    drawRadarChart(".radarChart1", data.areas, radarChartOptions, svgRef);
  }, [data, radarChartOptions]);
  useEffect(() => {
    let p = []
    if(props.graphids)
    setGraphArray({
        ...graphArray,
        title: props.graphids[0].title,
        lines: props.graphidlines,
        areas: props.graphidareas
    })
    if(props.graphidlines)
    props.graphidlines.map(e => {
      axiosWithAuth().get(`/api/graphs/${e.graph_id}/lines/${e.id}/points`) 
      .then(res => {
        res.data.map(ee => {
          p.push(ee)
        })
      })
    })
    setPointArray(p)
  }, [props.graphids, props.graphidlines]);
  return (<>
    <button onClick={() => props.graphData()}>fetch graphs</button>
    <button onClick={() => props.graphIdData(1)}>fetch graph-id</button>
    <button onClick={() => props.graphIdLinesData(1)}>fetch graph-id / lines</button>
    <button onClick={() => props.graphIdLinesIdData(1, 1)}>fetch graph-id / line-id</button>
    <button onClick={() => props.graphIdAreasData(1)}>fetch graph-id / areas</button>
    <button onClick={() => props.graphIdAreasIdData(1, 2)}>fetch graph-id / areas-id</button>
    <button onClick={() => props.graphIdLinesIdPointsData(1, 2)}>fetch graph-id / lines-id / points</button>
    <button onClick={() => props.graphIdAreasIdPointsData(1, 2)}>fetch graph-id / areas-id / points</button>
    <button onClick={() => console.log(props, graphArray, pointArray)}>check state</button>
  <div ref={svgRef}></div>
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
export default connect(
  mapStateToProps,
  { graphData, graphIdData, graphIdLinesData, graphIdLinesIdData, graphIdAreasData, graphIdAreasIdData, graphIdLinesIdPointsData, graphIdAreasIdPointsData }
)(RadarChart)