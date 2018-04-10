/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { url } from '../../config/url-config';


export default function networkBuilding(tokens, iteration, range) {
  const nodeLinks = {};
  // eslint-disable-next-line no-use-before-define
  graphRequest(iteration, range, tokens, nodeLinks);
  // eslint-disable-next-line no-use-before-define
  return formatNodeLinks();
}

function formatNodeLinks(nodeLinks) {
  const nodes = Object.keys(nodeLinks).map((el, idx) => ({ id: idx, name: el }));
  const links = Object.values()
    .map(v => v
      .map(
        (el, idx) => ({ sid: idx, tid: nodes.indexOf(el) }),
      ),
    );
  return { nodes, links };
}

function graphRequest(iteration, range, tokens, nodeLinks) {
  if (iteration < range) {
    tokens.forEach((t) => {
      axios.get(`${url[process.env.NODE_ENV]}/search?graph=${t}`)
        .then((response) => {
          // eslint-disable-next-line no-param-reassign
          nodeLinks[t] = response.data.hits;
          graphRequest(iteration + 1, range, response.data.hits, nodeLinks);
        });
    });
  }
}
