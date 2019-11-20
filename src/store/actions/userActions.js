import { axiosWithAuth } from "../../utils/axiosWithAuth"
import history from "../../history"

// Grabs User's Profile which returns their object of information
// Passes User's object as payload
export const FETCH_START = "FETCH_START"
export const FETCH_SUCCESS = "FETCH_SUCCESS"
export const FETCH_FAILURE = "FETCH_FAILURE"
export const fetchProfile = () => dispatch => {
    dispatch({ type: FETCH_START })
    axiosWithAuth().get("/users/profile")
        .then(res => dispatch({ type: FETCH_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: FETCH_FAILURE, payload: err.response }))
}

// Logs in the user
// Saves Authorization token to localStorage
// Sends user to dashboard
export const LOGIN_START = "LOGIN_START"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const login = credentials => dispatch => {
    dispatch({ type: LOGIN_START })
    axiosWithAuth().post("/api/auth/login", credentials)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            dispatch({ type: LOGIN_SUCCESS })
            history.push("/dashboard")
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err.reponse })
            if(!alert('Login failed! Either the username or password was incorrect')){window.location.reload();}
        })

} 

// Registers the user
// Saves authorization token to localStorage
// Sends users to dashboard
export const REGISTER_START = "REGISTER_START"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILURE = "REGISTER_FAILURE"
export const register = credentials => dispatch => {
    dispatch({ type: REGISTER_START})
    axiosWithAuth().post("/api/auth/register", credentials)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            dispatch({ type: REGISTER_SUCCESS })
            history.push("/dashboard")
        })
        .catch(err => {
            dispatch({ type: REGISTER_FAILURE, payload: err.response })
            if(!alert('Registration failed! Either information is missing or is not correctly formatted')){window.location.reload();}
        })
}

export const FETCH_GRAPH_START = "FETCH_GRAPH"
export const FETCH_GRAPH_SUCCESS = "FETCH_GRAPH_SUCCESS"
export const FETCH_GRAPH_FAILURE = "FETCH_GRAPH_FAILURE"
export const graphData = () => dispatch => {
    dispatch({ type: FETCH_GRAPH_START})
    axiosWithAuth().get("/api/graphs/")
        .then(res => 
            dispatch({ type: FETCH_GRAPH_SUCCESS, payload: res.data }) & console.log(res, "fetch graphs")
        )
        .catch(err => {
            dispatch({type: FETCH_GRAPH_FAILURE})
        })
}

export const FETCH_GRAPH_ID_START = "FETCH_GRAPH_ID_START"
export const FETCH_GRAPH_ID_SUCCESS = "FETCH_GRAPH_ID_SUCCESS"
export const FETCH_GRAPH_ID_FAILURE = "FETCH_GRAPH_ID_FAILURE"
export const graphIdData = (id) => dispatch => { 
    dispatch({ type: FETCH_GRAPH_ID_START})
    axiosWithAuth().get(`/api/graphs/${id}`) 
        .then(res => 
            dispatch({ type: FETCH_GRAPH_ID_SUCCESS, payload: res.data }) & console.log(res, "fetch graph ids")
        )
        .catch(err => {
            dispatch({type: FETCH_GRAPH_ID_FAILURE})
        })
}

export const FETCH_GRAPH_ID_LINES_START = "FETCH_GRAPH_ID_LINES_START"
export const FETCH_GRAPH_ID_LINES_SUCCESS = "FETCH_GRAPH_ID_LINES_SUCCESS"
export const FETCH_GRAPH_ID_LINES_FAILURE = "FETCH_GRAPH_ID_LINES_FAILURE"
export const graphIdLinesData = (id) => dispatch => { 
    dispatch({ type: FETCH_GRAPH_ID_LINES_START})
    axiosWithAuth().get(`/api/graphs/${id}/lines`) 
        .then(res => 
            dispatch({ type: FETCH_GRAPH_ID_LINES_SUCCESS, payload: res.data }) & console.log(res, "fetch graph-id / lines")
        )
        .catch(err => {
            dispatch({type: FETCH_GRAPH_ID_LINES_FAILURE})
        })
}

export const FETCH_GRAPH_ID_LINES_ID_START = "FETCH_GRAPH_ID_LINES_ID_START"
export const FETCH_GRAPH_ID_LINES_ID_SUCCESS = "FETCH_GRAPH_ID_LINES_ID_SUCCESS"
export const FETCH_GRAPH_ID_LINES_ID_FAILURE = "FETCH_GRAPH_ID_LINES_ID_FAILURE"
export const graphIdLinesIdData = (id, id2) => dispatch => { 
    dispatch({ type: FETCH_GRAPH_ID_LINES_ID_START})
    axiosWithAuth().get(`/api/graphs/${id}/lines/${id2}`) 
        .then(res => 
            dispatch({ type: FETCH_GRAPH_ID_LINES_ID_SUCCESS, payload: res.data }) & console.log(res, "fetch graph-id / lines-id")
        )
        .catch(err => {
            dispatch({type: FETCH_GRAPH_ID_LINES_ID_FAILURE})
        })
}

export const FETCH_GRAPH_ID_AREAS_START = "FETCH_GRAPH_ID_AREAS_START"
export const FETCH_GRAPH_ID_AREAS_SUCCESS = "FETCH_GRAPH_ID_AREAS_SUCCESS"
export const FETCH_GRAPH_ID_AREAS_FAILURE = "FETCH_GRAPH_ID_AREAS_FAILURE"
export const graphIdAreasData = (id) => dispatch => { 
    dispatch({ type: FETCH_GRAPH_ID_AREAS_START})
    axiosWithAuth().get(`/api/graphs/${id}/areas`) 
        .then(res => 
            dispatch({ type: FETCH_GRAPH_ID_AREAS_SUCCESS, payload: res.data }) & console.log(res, "fetch graph-id / areas")
        )
        .catch(err => {
            dispatch({type: FETCH_GRAPH_ID_AREAS_FAILURE})
        })
}

export const FETCH_GRAPH_ID_AREAS_ID_START = "FETCH_GRAPH_ID_AREAS_ID_START"
export const FETCH_GRAPH_ID_AREAS_ID_SUCCESS = "FETCH_GRAPH_ID_AREAS_ID_SUCCESS"
export const FETCH_GRAPH_ID_AREAS_ID_FAILURE = "FETCH_GRAPH_ID_AREAS_ID_FAILURE"
export const graphIdAreasIdData = (id, id2) => dispatch => { 
    dispatch({ type: FETCH_GRAPH_ID_AREAS_ID_START})
    axiosWithAuth().get(`/api/graphs/${id}/areas/${id2}`) 
        .then(res => 
            dispatch({ type: FETCH_GRAPH_ID_AREAS_ID_SUCCESS, payload: res.data }) & console.log(res, "fetch graph-id / areas-id")
        )
        .catch(err => {
            dispatch({type: FETCH_GRAPH_ID_AREAS_ID_FAILURE})
        })
}

export const FETCH_GRAPH_ID_LINES_ID_POINTS_START = "FETCH_GRAPH_ID_LINES_ID_POINTS_START"
export const FETCH_GRAPH_ID_LINES_ID_POINTS_SUCCESS = "FETCH_GRAPH_ID_LINES_ID_POINTS_SUCCESS"
export const FETCH_GRAPH_ID_LINES_ID_POINTS_FAILURE = "FETCH_GRAPH_ID_LINES_ID_POINTS_FAILURE"
export const graphIdLinesIdPointsData = (id, id2) => dispatch => { 
    dispatch({ type: FETCH_GRAPH_ID_LINES_ID_START})
    axiosWithAuth().get(`/api/graphs/${id}/lines/${id2}/points`) 
        .then(res => 
            dispatch({ type: FETCH_GRAPH_ID_LINES_ID_POINTS_SUCCESS, payload: res.data }) & console.log(res, "fetch graph-id / lines-id / points")
        )
        .catch(err => {
            dispatch({type: FETCH_GRAPH_ID_LINES_ID_POINTS_FAILURE})
        })
}

export const FETCH_GRAPH_ID_AREAS_ID_POINTS_START = "FETCH_GRAPH_ID_AREAS_ID_POINTS_START"
export const FETCH_GRAPH_ID_AREAS_ID_POINTS_SUCCESS = "FETCH_GRAPH_ID_AREAS_ID_POINTS_SUCCESS"
export const FETCH_GRAPH_ID_AREAS_ID_POINTS_FAILURE = "FETCH_GRAPH_ID_AREAS_ID_POINTS_FAILURE"
export const graphIdAreasIdPointsData = (id, id2) => dispatch => { 
    dispatch({ type: FETCH_GRAPH_ID_AREAS_ID_START})
    axiosWithAuth().get(`/api/graphs/${id}/areas/${id2}/points`) 
        .then(res => 
            dispatch({ type: FETCH_GRAPH_ID_AREAS_ID_POINTS_SUCCESS, payload: res.data }) & console.log(res, "fetch graph-id / lines-id / points")
        )
        .catch(err => {
            dispatch({type: FETCH_GRAPH_ID_AREAS_ID_POINTS_FAILURE})
        })
}
