import axios from "axios";
const baseurl = "http://139.196.202.57:8081/api/obs/";

export const getUploadAuth = () => {
  let url = baseurl + "getUploadAuth";
  console.log(url);
  return axios.get(`${url}`);
};
export const getPostImgs = id => {
  let url = baseurl + "getPostImageUrls?contentId=" + id;
  console.log(url);
  return axios.get(`${url}`);
};
export const getUserImg = userId => {
  let url = baseurl + "getProfileURL?uid=" + userId;
  return axios.get(`${url}`);
};
