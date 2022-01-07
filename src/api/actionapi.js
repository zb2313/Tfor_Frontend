import axios from "axios";

const baseurl = "http://121.5.137.205:8085/api/action/";

export const likePost = contentId => {
  let url = baseurl + "likePost?contentId=" + contentId;
  console.log(url);
  return axios.put(`${url}`);
};

export const reportPost = contentId => {
  let url = "http://121.5.137.205:8082/api/view/reportPost/" + contentId;
  console.log(url);
  return axios.get(`${url}`);
};

export const collectPost = data => {
  let url = baseurl + "collectPost";
  console.log(url);
  return axios.post(`${url}`, data);
};

export const followUser = data => {
  let url = baseurl + "followUser";
  console.log(url);
  return axios.post(`${url}`, data);
};

export const followZone = data => {
  let url = baseurl + "followZone";
  console.log(url);
  return axios.post(`${url}`, data);
};

export const cancelCollectPost = (userId, postId) => {
  let url =
    baseurl + "cancelCollectPost?userId=" + userId + "&postId=" + postId;
  console.log(url);
  return axios.delete(`${url}`);
};

export const cancelFollowUser = (userId1, userId2) => {
  let url =
    baseurl + "cancelFollowUser?userId1=" + userId1 + "&userId2=" + userId2;
  console.log(url);
  return axios.delete(`${url}`);
};

export const cancelFollowZone = (userId, zoneId) => {
  let url = baseurl + "cancelFollowZone?userId=" + userId + "&zoneId=" + zoneId;
  console.log(url);
  return axios.delete(`${url}`);
};
