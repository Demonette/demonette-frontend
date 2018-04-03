import all from './all';
import query from './query';

export default function checkQueryField(queryField, querySize, queryFrom) {
  if (queryField.length === 0) {
    return all(querySize, queryFrom);
  }
  return query(
    queryField,
    querySize,
    queryFrom);
}
