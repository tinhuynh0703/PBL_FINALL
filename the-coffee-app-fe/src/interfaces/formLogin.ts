import * as yup from 'yup';

export interface FormLogin {
  email: string;
  password: string;
}
export const schemaFormLogin = yup.object().shape({
  email: yup.string().required('Email is required').email('Email must be a valid email address'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});
