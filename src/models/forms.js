import axios from 'util/axios';
import { URLS } from 'constants.js';

const getCategories = () => {
  return axios.get(URLS.api.categories).then(rsp => {
    return rsp.data.results;
  });
};

// eslint-disable-next-line import/prefer-default-export
export { getCategories };
