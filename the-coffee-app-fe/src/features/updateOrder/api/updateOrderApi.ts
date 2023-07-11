import http from '../../../services/http-common';

export default class UpdateStatusOrderApi {
  static updateStatusOrder(id: string, newStatus: number, reason?: string) {
    return http.patch(`/orders/${id}`, { status: newStatus, reason: reason });
  }
}
