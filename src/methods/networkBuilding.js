/* eslint-disable no-underscore-dangle,no-use-before-define */
import axios from 'axios';
import { url } from '../../config/url-config';

export default function networkBuilding(tokens, iteration, range) {
  return graphRequest(iteration, range, tokens, {}).then(n => formatNodeLinks(n, tokens));
}

function formatNodeLinks(nodeLinks, rootTokens) {
  const nodes = [];
  const links = [];
  Object.values(nodeLinks)
    .forEach(el => el.forEach(g => nodes.push(g)));
  const newNodes = Array.from(new Set(nodes))
    .map((el, idx) => (
      rootTokens.includes(el) ? { id: idx, name: el, _color: '#6600cc' } : { id: idx, name: el, _color: '#666699' }
    ));
  const idNode = newNodes.map(el => el.name);
  Object.keys(nodeLinks)
    .forEach(k => nodeLinks[k]
      .forEach((el) => {
        const kIndex = idNode.indexOf(k);
        const elIndex = idNode.indexOf(el);
        const color = rootTokens.includes(k) && rootTokens.includes(el) ? '#6600cc' : '#666699';
        links.push({ sid: kIndex, tid: elIndex, _color: color });
      }));
  return { nodes: newNodes, links };
}

function graphRequest(iteration, range, tokens, nodeLinks) {
  return Promise
    .all(tokens.map(t => axios
      .get(`${url[process.env.NODE_ENV]}/graph?token=${t}`)))
    .then((res) => {
      const resMap = res.map(g => g.data);
      return Object.assign(nodeLinks, resMap[0], resMap[1]);
    });
}
