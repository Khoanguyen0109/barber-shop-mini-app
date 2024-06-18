import { selector } from "recoil";
import supabase from "../client/client";
import { isNull } from "lodash";
import { userState } from "../state";
import { EUserVoucherStatus } from "../constants";

export const discountListSelector = selector({
  key: "discountListSelector",
  get: async () => {
    const { data } = await supabase
      .from("discounts")
      .select("*")
      .eq("active", true);
    return data || [];
  },
});
export const payableDiscountSelector = selector({
  key: "payableDiscountSelector",
  get: ({ get }) => {
    const discounts = get(discountListSelector);
    return discounts.filter((item) => !Boolean(item.public));
  },
});

export const discountBannersSelector = selector({
  key: "discountBannersSelector",
  get: ({ get }) => {
    const discounts = get(discountListSelector);
    return discounts.filter((item) => !isNull(item.panel));
  },
});

export const publicDiscountSelector = selector({
  key: "publicDiscountSelector",
  get: ({ get }) => {
    const discounts = get(discountListSelector);
    return discounts.filter((item) => Boolean(item.public));
  },
});

export const userVouchersSelector = selector({
  key: "userVouchersSelector",
  get: async ({ get }) => {
    const user = get(userState);
    const { data } = await supabase
      .from("users")
      .select(`*, user_vouchers(*, discounts(*))`)
      .eq("id", user.id)
      .single();
    return data.user_vouchers.filter(
      (item) => item.status !== EUserVoucherStatus.USED
    );
  },
});

export const userVouchersState = atom({
  key: "userVouchersState",
  default: userVouchersSelector,
});
