import axios from "axios";
const baseurl = "http://121.5.137.205:8082/api/";
export const getAllZone = () => {
  var url = baseurl + "view/getAllZone";
  console.log(url);
  return axios.get(`${url}`);
};

export const getbyPostId = postId => {
  var url = baseurl + "view/getPost/" + postId;
  return axios.get(`${url}`);
};

export const getRankByDay = day => {
  var url = baseurl + "view/getRank/" + day;
  return axios.get(`${url}`);
};

export const getRecommandByUserId = userId => {
  var url = baseurl + "view/getRecommend/" + userId;
  return axios.get(`${url}`);
};

export const getPostByZoneId = zoneId => {
  var url = baseurl + "view/getPostList/" + zoneId;
  return axios.get(`${url}`);
};

export const getPostBySearch = keyWord => {
  var url = baseurl + "view/search/" + keyWord;
  return axios.get(`${url}`);
};
export const getCommentPost = keyWord => {
  let url = baseurl + "view/getCommentOfPost/?contentId=" + keyWord;
  return axios.get(`${url}`);
};
