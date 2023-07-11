import http from '../../../services/http-common';
import { WebhookParams } from '../types/types';

export default class Webhook {
  static getWebhook() {
    return http.get('/users/webhook');
  }

  static updateWebhook(webhook: WebhookParams) {
    return http.patch('/users/webhook', webhook);
  }
}
