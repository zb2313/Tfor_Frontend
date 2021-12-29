import axios from "axios";
const baseurl = "http://121.5.137.205:8081/api/obs/"

export const getUploadAuth = () => {
    let url = baseurl + "getUploadAuth"
    console.log(url)
    return axios.get(
        `${url}`
    )
};
