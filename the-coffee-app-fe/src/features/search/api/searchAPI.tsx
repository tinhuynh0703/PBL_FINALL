import http from '../../../services/http-common';

const searchAPI = {
  getByName(name: string) {
    const url = `/products/search?keyword=${name}`;
    return http.get(url);
  },
};
export default searchAPI;
