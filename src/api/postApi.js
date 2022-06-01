import axios from "axios";
const baseurl = "http://139.196.202.57:8081/api/post/";
//const baseurl = "http://localhost:8081/api/post/"
export const deleteContent = contentId => {
  let url = baseurl + "deleteContent/" + contentId;
  console.log(url);
  return axios.delete(`${url}`);
};
export const postComment = data => {
  let url = baseurl + "postComment";
  console.log(url);
  return axios.post(`${url}`, data);
};
