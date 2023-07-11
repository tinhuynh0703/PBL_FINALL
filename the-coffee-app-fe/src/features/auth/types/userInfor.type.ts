export type UserInfor = {
  jwtAccessToken: string;
  userInfor: {
    role: string;
    avatarUrl: string;
    freeUnit: number;
    phoneNumber: string;
    email: string;
    name: string;
    _id: string;
    deviceToken?: string;
    cartNumber?: number;
  };
};
