import axios from "axios";
const baseurl = "http://139.196.202.57:8081/api/"
export const getAllZone = () => {
    var url = baseurl + "view/getAllZone"
    console.log(url)
    return axios.get(
        `${url}`
    )
};

export const getbyPostId = (postId) => {
    var url = baseurl + "view/getPost/" + postId
    return axios.get(
        `${url}`
    )
};

export const getRankByDay = (day) => {
    var url = baseurl + "view/getRank/" + day
    return axios.get(
        `${url}`
    )
};

export const getRecommandByUserId = (userId) => {
    var url = baseurl + "view/getRecommend/" + userId
    return axios.get(
        `${url}`
    )
};

