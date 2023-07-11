import http from '../../../services/http-common';

export default class OrderHistory {
  static myOrders() {
    return http.get('/orders/user');
  }
}
