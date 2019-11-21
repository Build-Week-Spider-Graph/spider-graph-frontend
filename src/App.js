import React from "react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux"
import { store } from "./index"
import { connect } from "react-redux"
import "./App.css";
import SignUp from "./component/SignUp/SignUp"
import Login from "./component/Login/Login";
import Dashboard from "./component/Dashboard/Dashboard"
import { PrivateRoute } from "./component/PrivateRoute"
import {graphData, graphIdData, graphIdLinesData, graphIdLinesIdData, graphIdAreasData, graphIdAreasIdData, graphIdLinesIdPointsData, graphIdAreasIdPointsData} from "./store/actions/userActions"

function App(props) {
  return (
    <>
   <Route  exact path="/" component={Login} />
      <Route exact path="/SignUp" render={props => 
        <Provider store={store}>
          <SignUp {...props} />
          
        </Provider> 
        }/>
      <PrivateRoute path="/dashboard" component={Dashboard} />
   </>
  );
}

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
)(App)
