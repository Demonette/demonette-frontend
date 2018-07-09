import axios from 'axios';
import { url } from '../../config/url-config';
import formatAgg from './formatAggregations';

export default function query(queryField, querySize, queryFrom, originFilter) {
  return axios.get(`${url[process.env.NODE_ENV]}/search?token=${queryField}
  &size=${querySize}
  &from=${queryFrom}
  &originFilter=${originFilter}`)
    .then(response => ({
      data: response.data.hits.hits,
      total: response.data.hits.total,
      facet: formatAgg(response.data.aggregations) }));
}

