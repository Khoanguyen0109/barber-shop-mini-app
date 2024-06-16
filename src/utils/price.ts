import { EDiscountType } from "../constants";
import { getConfig } from "./config";

export const formatPrice = (prize) => {
  const symbol = getConfig((config) => config.template.currencySymbol);
  const format = new Intl.NumberFormat().format(parseFloat(prize.toString()));
  return `${format}${symbol}`;
};

export function calDiscount(discount, total) {
  switch (discount.discountBy) {
    case EDiscountType.PERCENT:
      return total - total * (parseInt(discount.discount) / 100);
    case EDiscountType.PRICE:
      return total - parseInt(discount.discount);

    default:
      return 0;
  }
}
