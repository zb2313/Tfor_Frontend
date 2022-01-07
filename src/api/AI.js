import axios from "axios";
const baseurl ="http://100.80.240.74:5000/";

export const textReport = (data) => {
    let url = baseurl + "textReport";
    console.log(url);
    return axios.post(`${url}`,data);
};
