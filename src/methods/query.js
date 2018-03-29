import axios from 'axios';
import { url } from '../../config/url-config';

export default function query(queryField, querySize, queryFrom) {
  return axios.get(`${url[process.env.NODE_ENV]}/search?token=${queryField}
  &size=${querySize}
  &from=${queryFrom}`)
    .then(response => ({
      data: response.data.hits.hits,
      total: response.data.hits.total,
      facet: response }));
}
