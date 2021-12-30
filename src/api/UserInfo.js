import axios from "axios";
const baseurl = "http://121.5.137.205:8081/api/user"
export const changeEmail = (data) => {
    let url = baseurl + "/changeEmail"
    console.log(url)
    return axios.put(
        `${url}`,data
    )
};
export const changePhoneNbr = (data) => {
    let url = baseurl + "/changePhoneNbr"
    console.log(url)
    return axios.put(
        `${url}`,data
    )
};
export const getVerifyCodeE = (param) => {
    let url = baseurl + "/getverifycode/email/"+param;
    console.log(url)
    return axios.get(
        `${url}`
    )
};
export const getVerifyCodeT = (param) => {
    let url = baseurl + "/getverifycode/tel/86"+param;
    console.log(url)
    return axios.get(
        `${url}`
    )
};
export const loginEmial = (data) => {
    let url = baseurl + "/login/email";
    console.log(url)
    return axios.post(
        `${url}`,data
    )
};
export const loginPwd = (data) => {
    let url = baseurl + "/login/pwd";
    console.log(url)
    return axios.post(
        `${url}`,data
    )
};
export const loginTel = (data) => {
    let url = baseurl + "/login/tel";
    console.log(url)
    return axios.post(
        `${url}`,data
    )
};

export const modifyUserInfo = (data) => {
    let url = baseurl + "/modify"
    return axios.put(
        `${url}`,data,
    )
};
export const userRegister = (data) => {
    let url = baseurl + "/register"
    console.log(url)
    return axios.post(
        `${url}`,data
    )
};
export const getUserImg = (userId) => {
    let url = "http://121.5.137.205:8081/api/obs/getProfileURL?uid=" + userId
    return axios.get(
        `${url}`
    )
}
export const getUserInfo = (userId) => {
    let url = baseurl + "/getInfo/" + userId
    return axios.get(
        `${url}`
    )
}

export const getInfoNeedAuth = (userId) => {
    let url = baseurl + "/getInfoNeedAuth/" + userId
    return axios.get(
        `${url}`
    )
}

export const getRelationInfo = (userId) => {
    let url = baseurl + "/getRelationInfo/" + userId
    return axios.get(
        `${url}`
    )
}

export const getFollowingList = (userId) => {
    let url = baseurl + "/getFollowingList/" + userId
    return axios.get(
        `${url}`
    )
}
export const getCollectionList = (userId) => {
    let url = baseurl + "/getCollectionList/" + userId
    return axios.get(
        `${url}`
    )
}
export const getFollowingZoneList = (userId) => {
    let url = baseurl + "/getFollowingZoneList/" + userId
    return axios.get(
        `${url}`
    )
}
export const getPostList = (userId) => {
    let url = baseurl + "/getPostList/" + userId
    return axios.get(
        `${url}`
    )
}
