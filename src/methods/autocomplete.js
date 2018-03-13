import axios from 'axios';
import { url } from '../../config/url-config';

export default function autocomplete(queryField) {
  return axios.get(`${url[process.env.NODE_ENV]}/autocomplete?token=${queryField}`)
    .then(response => response.data);
}
