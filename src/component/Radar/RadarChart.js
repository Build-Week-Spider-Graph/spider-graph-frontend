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
    <div ref={svgRef}></div>
    <button onClick={() => console.log(props, graphArray, pointArray)}>check state</button>
    <button onClick={() => console.log(props)}>props</button>

    <button onClick={() => console.log(props.graphs[0].id)}>graph id</button>
    <button onClick={() => console.log(props.graphs[0].title)}>graph title</button>

    <button onClick={() => console.log(props.graphidlines[0].id)}>line id</button>
    <button onClick={() => console.log(props.graphidlines[0].label)}>line label</button>

    <button onClick={() => console.log(props.graphidlinesidpoints[0].id)}>tick id</button>
    <button onClick={() => console.log(props.graphidlinesidpoints[0].label)}>tick label</button>
    <button onClick={() => console.log(props.graphidlinesidpoints[0].position)}>tick position</button>

    <button onClick={() => console.log(props.graphidlinesidpoints[0].label)}>tick label</button>
  
  </>
  );
};



const dataTest = {
  id: 0,
  title: "Graph Title",
  lines: 
    {
      id: 0,
      label: "Customer Segment",
      tick: [
        { id: 0, label: "Business", position: 1 },
        { id: 1, label: "Education", position: 2 },
        { id: 2, label: "SME", position: 3 },
        { id: 3, label: "Entertainment", position: 4 },
        { id: 4, label: "Healthcare", position: 5 }
      ]
    },
    areas: 
      {
        "Customer Segment": "SME",
        Product: "Dashboard",
        Content: "Security",
        Experience: "Proficient",
        "New Business": "SDL Tool",
        Geographies: "Australia",
        Channel: "3rd Party"
      },
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