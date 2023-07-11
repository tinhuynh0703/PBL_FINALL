const API_ROOT = process.env.REACT_APP_API_ENDPOINT as string;
const REQUEST_TIMEOUT = process.env.REQUEST_TIMEOUT as unknown as number;

export const envVariable = {
  API_ROOT,
  REQUEST_TIMEOUT,
};
