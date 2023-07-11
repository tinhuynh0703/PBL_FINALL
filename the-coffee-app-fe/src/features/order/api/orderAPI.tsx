import http from '../../../services/http-common';
import { createOrderParams, getOrderByDateParams, updateOrderParams } from './orderParams';

export default class Order {
  static placeOrder(body: createOrderParams) {
    return http.post('/orders', body);
  }
  static updateOrder(updateOrderParams: updateOrderParams) {
    return http.patch(`/orders/me/${updateOrderParams.orderId}`, updateOrderParams.body);
  }
  static getOrderByDate(param: getOrderByDateParams) {
    return http.get('/orders/date-range', param);
  }
  static addCart(body: createOrderParams) {
    return http.post('/orders/cart', body);
  }
}
