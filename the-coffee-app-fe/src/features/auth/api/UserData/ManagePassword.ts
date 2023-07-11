import http from '../../../../services/http-common';

export type ChangePasswordParams = {
  currentPassword: string;
  newPassword: string;
};

export class ManagePasswordApi {
  static changePassword(body: ChangePasswordParams) {
    return http.patch('/users/change-password', body);
  }
}
