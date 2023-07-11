import http from '../../../../services/http-common';
import { LogoutParams, UserParams } from './types';

export default class Auth {
  static login(body: UserParams) {
    return http.post('/auth/login', body);
  }
  static logout(body: LogoutParams) {
    return http.post('/auth/logout', body);
  }
}
