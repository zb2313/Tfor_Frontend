import axios from "axios";
const baseurl = "http://121.5.137.205:8087/api/obs/";

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
