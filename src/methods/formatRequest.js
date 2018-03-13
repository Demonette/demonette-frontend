/* eslint-disable no-restricted-syntax,guard-for-in */
export default function formatRequest(entryResult) {
  const res = {
    graphie_1: [
      { name: 'type_1' },
      { name: 'cat_1' },
      { name: 'constr_1' },
      { name: 'type_constr_1' },
    ],
    graphie_2: [
      { name: 'type_2' },
      { name: 'cat_2' },
      { name: 'constr_2' },
      { name: 'type_constr_2' },
    ],
    relation: [
      { name: 'complexite' },
      { name: 'orientation' },
      { name: 'def_conc' },
      { name: 'def_abs' },
    ],
  };
  for (const entity in res) {
    for (const index in res[entity]) {
      const feature = res[entity][index].name;
      if (entryResult[feature] !== '') {
        const origin = `ori_${feature}`;
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
