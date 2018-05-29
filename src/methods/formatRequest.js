/* eslint-disable no-restricted-syntax,guard-for-in */
import capitalize from './capitalize';

export default function formatRequest(entryResult) {
  const res = {
    graph_1: [
      { name: 'typeSemantique_1' },
      { name: 'categorie_1' },
      { name: 'construction_1' },
      { name: 'typeConstruction_1' },
    ],
    graph_2: [
      { name: 'typeSemantique_2' },
      { name: 'categorie_2' },
      { name: 'construction_2' },
      { name: 'typeConstruction_2' },
    ],
    relation: [
      { name: 'complexite' },
      { name: 'orientation' },
      { name: 'definitionConcrete' },
      { name: 'definitionAbstraite' },
    ],
  };
  for (const entity in res) {
    for (const index in res[entity]) {
      const feature = res[entity][index].name;
      if (entryResult[feature] !== '') {
        const origin = `origine${capitalize(feature)}`;
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
