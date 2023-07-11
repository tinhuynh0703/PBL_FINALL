import { PaginationParams } from '../../../interfaces';
import http from '../../../services/http-common';

export type UpdateProductParams = {
  productId: string;
  body: FormData;
};

const url = `/products`;
const productApi = {
  getAllProduct() {
    return http.get(url);
  },

  getProductPagination(paginationParams: PaginationParams) {
    return http.get(url, paginationParams);
  },

  getByCategory(name: string) {
    const url = `/categories/${name}/products`;
    return http.get(url);
  },

  createProduct(body: FormData) {
    return http.post(url, body);
  },

  updateProduct(updateProductParams: UpdateProductParams) {
    return http.patch(`/products/${updateProductParams.productId}`, updateProductParams.body);
  },
};
export default productApi;
