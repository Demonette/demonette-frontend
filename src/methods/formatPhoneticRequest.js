/* eslint-disable no-restricted-syntax,guard-for-in */
import sampaApiConverter from './sampaApiConverter';
import capitalize from './capitalize';

export default function formatRequest(entryResult) {
  const st1 = { name: 'st_1', value: '' };
  const st2 = { name: 'st_2', value: '' };

  Object.keys(entryResult)
    .map(k => k)
    .filter(kf => kf.match(/st[0-9]/))
    .filter(kff => entryResult[kff])
    .forEach((el) => {
      // eslint-disable-next-line no-unused-expressions
      el.slice(-1) === '1' ? st1.value += `${entryResult[el]},` : st2.value += `${entryResult[el]},`;
    });
  st1.value = st1.value.slice(0, -2);
  st2.value = sampaApiConverter(st2.value.slice(0, -2));
  const res = {
    graph_1: [
      { name: 'rad' },
      { name: 'constructionPhonologique_1' },
      st1,
    ],
    graph_2: [
      { name: 'rad_2' },
      { name: 'constructionPhonologique_2' },
      st2,
    ],
    relation: [
      { name: 'relationPhonologieConcrete' },
      { name: 'seqCommRad1Rad_2' },
      { name: 'relationPhonologiqueAbstraite' },
    ],
  };
  for (const entity in res) {
    for (const index in res[entity]) {
      const feature = res[entity][index].name;
      if (entryResult[feature]) {
        res[entity][index].value = sampaApiConverter(entryResult[feature]);
        const origin = `orgine${capitalize(feature)}`;
        if (entryResult[origin]) {
          res[entity][index].origin = entryResult[origin];
        }
      }
    }
  }
  return res;
}
