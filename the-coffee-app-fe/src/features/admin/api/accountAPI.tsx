import http from '../../../services/http-common';
import { UserTypeDto } from '../../../interfaces';

export type UpdateUserParams = {
  userId: string;
  body: UserTypeDto;
};

const url = `/admin/account`;
const accountApi = {
  createAccount(body: UserTypeDto) {
    return http.post(url, body);
  },

  updateAccount(updateUserParams: UpdateUserParams) {
    return http.patch(`${url}/${updateUserParams.userId}`, updateUserParams.body);
  },
};
export default accountApi;
