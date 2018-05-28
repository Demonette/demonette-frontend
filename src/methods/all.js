import axios from 'axios';
import { url } from '../../config/url-config';

export default function autocomplete(querySize, queryFrom) {
  function formatAgg(agg) {
    Object.keys(agg).forEach((el) => {
      if (el.includes('_')) {
        const newName = el.slice(0, -2);
        if (!(newName in agg)) {
          agg[newName] = agg[el];
        } else if (el.includes('count')) {
          agg[newName].value += agg[el].value;
        } else {
          const dictAgg = {};
          agg[newName].buckets.forEach((ela) => { dictAgg[ela.key] = ela; });
          agg[el].buckets.forEach(eln => {
            if (eln.key in dictAgg) {
              eln.doc_count += dictAgg[eln.key].doc_count;
            }
          });
          console.log(agg[el]);
          agg[newName] = agg[el];
        }
        delete agg[el];
      }
    });
    return agg;
  }
  return axios.get(
    `${url[process.env.NODE_ENV]}/all?size=${querySize}&from=${queryFrom}`)
    .then(response => ({
      data: response.data.hits.hits,
      total: response.data.hits.total,
      facet: formatAgg(response.data.aggregations) }));
}
