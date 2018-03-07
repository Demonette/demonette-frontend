import axios from 'axios';
import { url } from '../../config/url-config';

export default function query(queryField) {
  return axios.get(`${url[process.env.NODE_ENV]}/search?token=${queryField}`)
    .then(response => response.data);
}
