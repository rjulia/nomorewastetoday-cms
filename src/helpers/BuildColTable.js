import * as _ from 'lodash';

export const BuildColTable = (data) => {
  const names = Object.keys(data);
  const columns = names.map((name) => {
    if (name === 'id' || name === '__typename') return null;
    return { title: _.upperFirst(name), field: name };
  });
  return columns.filter((i) => i !== null);
};
