import http from '../../../services/http-common';

export default class MyCart {
  static myCart() {
    return http.get('/orders/user/cart');
  }
}
