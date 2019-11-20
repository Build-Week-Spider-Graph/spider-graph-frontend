import React, { useEffect, useState } from "react";
import "./Dashboard.scss"
import { connect } from "react-redux"
import { fetchProfile } from "../../store/actions"
import HeaderLayout from "../HeaderLayout/HeaderLayout"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import RadarChart from "../Radar/RadarChart"
import Form from "../Radar/Form"

const Dashboard = ({ 
    currentUser,
    fetchProfile
}) => {
    const [newInfo, setNewInfo] = useState({
    })


    useEffect(() => {
        fetchProfile();
        setNewInfo({
            ...newInfo,
        })
    }, [fetchProfile])


    const handleChange = e => {
        setNewInfo({
            ...newInfo,
            [e.target.name]: +e.target.value
        })
    }

    return (
      <div className = "containerDashboard">
      <HeaderLayout />
        <div className = "mainBox">
        <div className="headerDashboard">
            <h1>Graphs</h1>
        </div>
        <div className="data-display-containers">
                <div className ="box">
                <h3 className="graphTitle">Spider Graph</h3>
                <RadarChart />
                </div>
            </div>
        </div>
      </div>
  );
};

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        loading: state.loading,
    }
}

export default connect(mapStateToProps, {fetchProfile})(Dashboard);
