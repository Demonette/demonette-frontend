/* eslint-disable no-restricted-syntax,guard-for-in */
export default function formatRequest(entryResult) {
  const st1 = { name: 'st1', value: '' };
  const st2 = { name: 'st2', value: '' };

  Object.keys(entryResult)
    .map(k => k)
    .filter(kf => kf.match(/st[0-9]/))
    .filter(kff => entryResult[kff])
    .forEach((el) => {
      // eslint-disable-next-line no-unused-expressions
      el.slice(-1) === '1' ? st1.value += `${entryResult[el]},` : st2.value += `${entryResult[el]},`;
    });
  st1.value = st1.value.slice(0, -2);
  st2.value = st2.value.slice(0, -2);
  const res = {
    graph_1: [
      { name: 'rad' },
      { name: 'constructionPhonologique_1' },
      { name: 'st1N_1' },
      { name: 'st1A_1' },
      { name: 'st2A_1' },
      { name: 'st1V_1' },
      { name: 'st2V_1' },
      { name: 'st3V_1' },
      { name: 'st4V_1' },
      { name: 'st12V_1' },
      { name: 'st13V_1' },
      st1,
    ],
    graph_2: [
      { name: 'rad_2' },
      { name: 'constructionPhonologique_2' },
      { name: 'st1N_2' },
      { name: 'st1A_2' },
      { name: 'st2A_2' },
      { name: 'st1V_2' },
      { name: 'st2V_2' },
      { name: 'st3V_2' },
      { name: 'st4V_2' },
      { name: 'st12V_2' },
      { name: 'st13V_2' },
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
      if (entryResult[feature] !== '') {
        const origin = `origine${feature}`;
        res[entity][index].value = entryResult[feature];
        if (entryResult[origin]) {
          res[entity][index].origin = entryResult[origin];
        }
      } else {
        delete res[entity].splice(index, index);
      }
    }
  }
  return res;
}
