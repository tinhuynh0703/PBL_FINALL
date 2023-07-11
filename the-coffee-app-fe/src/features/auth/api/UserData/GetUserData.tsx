import http from '../../../../services/http-common';

export default class GetUserData {
  static getUserData() {
    return http.get('/users/profile');
  }
  static getFreeUnit() {
    return http.get('/users/freeunit');
  }

  static addDeviceToken(body: { deviceToken: string }) {
    return http.post('/users/deviceToken', body);
  }
  static updateAvatar(body: FormData) {
    return http.patch('users/avatar', body);
  }
}
