import { atom, selector } from "recoil";
import { Cart } from "../types/cart";
import { calcFinalPrice } from "../utils/product";
import { calDiscount } from "../utils/price";
import { settingState } from "./setting-state";
import { addressesState, userState } from "../state";

export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});
export const discountState = atom({
  key: "voucher-discount",
  default: null,
});

export const shippingFeeState = selector({
  key: "shippingFee",
  get: ({ get }) => {
    const setting = get(settingState);
    return setting.find((item) => item.name === "shippingFee")
      ? Number(setting.find((item) => item.name === "shippingFee").value)
      : 0;
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    const discount = get(discountState);
    const shippingFee = get(shippingFeeState);
    if (cart.length === 0) {
      return 0;
    }
    const total =
      cart.reduce((total, item) => {
        if (!item.selected) {
          return total;
        }
        return (
          total + item.quantity * calcFinalPrice(item.product, item.options)
        );
      }, 0) + shippingFee;
    if (discount) {
      return calDiscount(discount, total);
    }
    return total;
  },
});

export const preTotalPriceState = selector({
  key: "preTotalPriceState",
  get: ({ get }) => {
    const cart = get(cartState);
    const total = cart.reduce((total, item) => {
      if (!item.selected) {
        return total;
      }
      return total + item.quantity * calcFinalPrice(item.product, item.options);
    }, 0);

    return total;
  },
});

export const voucherSelectedState = atom({
  key: "voucherSelectedState",
  default: null,
});

export const addressSelectedState = atom({
  key: "addressSelectedState",
  default: addressesState?.[0] || null,
});

export const noteState = atom({
  key: "note",
  default: "",
});
