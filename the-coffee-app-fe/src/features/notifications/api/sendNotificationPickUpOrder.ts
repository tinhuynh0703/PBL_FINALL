import http from '../../../services/http-common';

export type BodyApiNotificationPickUpOrder = {
  orderId: string;
};

export default class NotificationPickUpOrderApi {
  static send(body: BodyApiNotificationPickUpOrder) {
    return http.post('/notifications/remind-order', body);
  }
}
