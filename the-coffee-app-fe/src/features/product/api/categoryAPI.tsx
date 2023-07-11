import { PaginationParams } from '../../../interfaces';
import http from '../../../services/http-common';
const url = '/categories';
export type UpdateCategoryParams = {
  categoryId: string;
  body: { name: string };
};
const categoryApi = {
  getAll(paginationParams?: PaginationParams) {
    return http.get(url, paginationParams);
  },

  get(name: string) {
    const url = `/categories/${name}`;
    return http.get(url);
  },
  createCategory(body: { name: string }) {
    return http.post(url, body);
  },
  updateCategory(updateCategoryParams: UpdateCategoryParams) {
    return http.patch(`/categories/${updateCategoryParams.categoryId}`, updateCategoryParams.body);
  },
};
export default categoryApi;
