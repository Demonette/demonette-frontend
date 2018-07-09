import all from './all';
import query from './query';

export default function checkQueryField(queryField, querySize, queryFrom, originFilter) {
  if (queryField.length === 0) {
    return all(querySize, queryFrom, originFilter);
  }
  return query(
    queryField,
    querySize,
    queryFrom,
    originFilter);
}
