import axios from 'axios';
import { url } from '../../config/url-config';

export default function autocomplete(token, field) {
  return axios.get(
    `${url[process.env.NODE_ENV]}/autocomplete`,
    { params:
        {
          token,
          field,
        },
    }).then(response => response.data);
}
