import axios from "axios"

export const axiosWithAuth = () => {
    return axios.create({
        baseURL: "https://build-week-spider-graph.herokuapp.com/",
        headers: {
            Authorization: localStorage.getItem('token'),
        }
    })
}