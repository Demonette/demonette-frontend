/* eslint-disable no-underscore-dangle,no-use-before-define */
import axios from 'axios';
import { url } from '../../config/url-config';

export default function source() {
  return axios.get(`${url[process.env.NODE_ENV]}/source`);
}
