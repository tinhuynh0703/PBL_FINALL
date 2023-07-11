export default interface Account {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  available: string;
  phoneNumber: string;
  avatarUrl: string;
  role: {
    id: string;
    name: string;
  };
  freeUnit: number;
}
