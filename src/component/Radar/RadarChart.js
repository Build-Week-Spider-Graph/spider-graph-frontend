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
    <div className ="radarChart" ref={svgRef}></div>
    <div className ="buttonContainer">
    <button className="displayDataButton" onClick={() => props.graphData()}>fetch graphs</button>
    <button className="displayDataButton" onClick={() => props.graphIdData(1)}>fetch graph-id</button>
    <button className="displayDataButton" onClick={() => props.graphIdLinesData(1)}>fetch graph-id / lines</button>
    <button className="displayDataButton" onClick={() => props.graphIdLinesIdData(1, 1)}>fetch graph-id / line-id</button>
    <button className="displayDataButton" onClick={() => props.graphIdAreasData(1)}>fetch graph-id / areas</button>
    <button className="displayDataButton" onClick={() => props.graphIdAreasIdData(1, 2)}>fetch graph-id / areas-id</button>
    <button className="displayDataButton" onClick={() => props.graphIdLinesIdPointsData(1, 2)}>fetch graph-id / lines-id / points</button>
    <button className="displayDataButton" onClick={() => props.graphIdAreasIdPointsData(1, 2)}>fetch graph-id / areas-id / points</button>
    <button className="displayDataButton" onClick={() => console.log(props)}>check state</button>

    <button className="displayDataButton" onClick={() => console.log(props, graphArray, pointArray)}>check state</button>
    <button className="displayDataButton" onClick={() => console.log(props)}>props</button>

    <button className="displayDataButton" onClick={() => console.log(props.graphs[0].id)}>graph id</button>
    <button className="displayDataButton" onClick={() => console.log(props.graphs[0].title)}>graph title</button>

    <button className="displayDataButton" onClick={() => console.log(props.graphidlines[0].id)}>line id</button>
    <button className="displayDataButton" onClick={() => console.log(props.graphidlines[0].label)}>line label</button>

    <button className="displayDataButton" onClick={() => console.log(props.graphidlinesidpoints[0].id)}>tick id</button>
    <button className="displayDataButton" onClick={() => console.log(props.graphidlinesidpoints[0].label)}>tick label</button>
    <button className="displayDataButton" onClick={() => console.log(props.graphidlinesidpoints[0].position)}>tick position</button>
    </div>
  
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