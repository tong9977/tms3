import axios from 'axios';
export default function (dataUrl) {
  const url = 'http://localhost:3030/blob';

  return axios.post(url, {uri:dataUrl});
};