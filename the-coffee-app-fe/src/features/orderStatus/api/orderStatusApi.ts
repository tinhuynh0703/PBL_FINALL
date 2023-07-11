import http from '../../../services/http-common';
import { OrderStatus } from '../../../enum/Order';

export default class OrderByStatusApi {
  static getOrdersByStatus(orderStatus: OrderStatus) {
    return http.get('/orders', { status: orderStatus });
  }
}
