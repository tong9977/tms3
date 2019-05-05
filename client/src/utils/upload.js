import axios from 'axios';
export default function (file) {
  const url = 'http://localhost:3030/upload';

  const formData = new FormData();
  formData.append('files', file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return axios.post(url, formData, config);
};