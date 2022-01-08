import axios from "axios";
const baseurl = "http://100.80.240.74:5000/";

export const textReport = data => {
  let url = baseurl + "textReport";
  console.log(url);
  return axios.post(`${url}`, data);
};
export const baiduReport = () => {
    let API_Key="XWY6vIBGkpeGpwZnFvMnis6X"
    let Secret_Key="wphWzG3X5qzckL05XInMIhVpYi0njxp9"
    let getTokenUrl="https://aip.baidubce.com/rpc/2.0/nlp/v1/lexer"
    return axios.post(getTokenUrl, {
        grant_type: "client_credentials",
        client_id: API_Key, //API Key
        client_secret: Secret_Key, //Secret Key
    });
};

