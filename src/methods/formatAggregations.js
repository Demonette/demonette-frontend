let agg = {};

function addNewKeyToAgg(newName, el) {
  const dictAgg = {};
  agg[newName].buckets.forEach((ela) => {
    dictAgg[ela.key] = ela;
  });
  agg[el].buckets.forEach((eln, idx) => {
    if (eln.key in dictAgg) {
      agg[el].buckets[idx].doc_count += dictAgg[eln.key].doc_count;
    }
  });
  agg[newName] = agg[el];
}

export default function formatAgg(pAgg) {
  agg = pAgg;
  Object.keys(agg).forEach((el) => {
    if (el.includes('_')) {
      const newName = el.slice(0, -2);
      if (!(newName in agg)) {
        agg[newName] = agg[el];
      } else if (el.includes('count')) {
        agg[newName].value += agg[el].value;
      } else {
        addNewKeyToAgg(newName, el);
      }
      delete agg[el];
    }
  });
  return agg;
}
