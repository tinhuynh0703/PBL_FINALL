import { moneyPattern } from './moneyRegex';
export const moneyFormat = (price: number) => {
  return price.toString().replace(moneyPattern, ',');
};
