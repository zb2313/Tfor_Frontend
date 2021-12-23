import axios from "axios";
const baseurl = "http://139.196.202.57:8081/api/user"
export const changeEmail = (data) => {
    let url = baseurl + "/chageEmail"
    console.log(url)
    return axios.put(
        `${url}`,data
    )
};
export const changePhoneNbr = (data) => {
    let url = baseurl + "/chagePhoneNbr"
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
    let url = baseurl + "/getverifycode/tel/"+param;
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
    console.log(url)
    return axios.put(
        `${url}`,data
    )
};
export const userRegister = (data) => {
    let url = baseurl + "/register"
    console.log(url)
    return axios.post(
        `${url}`,data
    )
};

