import { atom, selector } from "recoil";
import { userState } from "../state";
import supabase from "../client/client";

export const forceOrderUpdate = atom({
  key: "forceOrder",
  default: 0,
});

export const orderState = selector({
  key: "orders",
  get: async ({ get }) => {
    get(forceOrderUpdate);
    const user = get(userState);
    const { data, error } = await supabase
      .from("orders")
      .select(`* , orderDetails: order_details(* , product:products(*))`)
      .eq("userId", user.id)
      .order("createdAt", { ascending: false });

    return data;
  },
});

const orderPointSelector = selector({
  key: "orderPointSelector",
  get: async ({ get }) => {
    get(forceOrderUpdate);
    const user = get(userState);

    const { data } = await supabase
      .from("orders")
      .select("*")
      .or(`userId.eq.${user.id},ctvId.eq.${user.id},shipperId.eq.${user.id}`);
    return data;
  },
});


export const userPointSelector = selector({
  key: "userPointSelector",
  get: ({ get }) => {
    const orders = get(orderPointSelector);
    return orders;
  },
});
