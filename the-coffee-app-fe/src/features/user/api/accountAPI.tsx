import http from '../../../services/http-common';

type PaginationParams = {
  limit?: number;
  offset?: number;
};

const url = `/users`;

const accountAPI = {
  getAllUser() {
    return http.get(url);
  },

  getUserPagination(paginationParams: PaginationParams) {
    return http.get(url, paginationParams);
  },
};
export default accountAPI;
