export type UserParams = {
  email: string;
  password: string;
  deviceToken?: string | undefined;
};
export type LogoutParams = {
  deviceToken: string | undefined;
};
