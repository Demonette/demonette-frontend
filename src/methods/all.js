import axios from 'axios';
import { url } from '../../config/url-config';

export default function autocomplete(token) {
  return axios.get(
    `${url[process.env.NODE_ENV]}/autocomplete?token=${token}`).then(response => response.data);
}
