export interface UserTypeDto {
  id?: string;
  password?: string;
  name: string;
  available: string;
  phoneNumber: string;
  email: string;
  role: string;
  freeUnit?: number;
}
