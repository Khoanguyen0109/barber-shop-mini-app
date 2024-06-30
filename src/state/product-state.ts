import { atom, selector, selectorFamily } from "recoil";
import { Product, TProduct } from "types/product";
import supabase from "../client/client";
import { groupBy } from "lodash";
import { Category } from "../types/category";
import { EProductType } from "../constants";

export const mapProduct = (item) => {
  return {
    ...item,
    costdown: item.discount
      ? Number(item.price) - (Number(item.price) * Number(item.discount)) / 100
      : Number(item.price),
    variants: groupBy([...item.inventories], "group"),
    // variants: item.inventories,
    image: item.image.split(",").map((item) => ({ image: item })),
  };
};
export const globalProductInventoriesSelector = selector({
  key: "globalProductInventoriesSelector",
  get: async ({ get }) => {
    const { data } = await supabase
      .from("product_inventories")
      .select("*")
      .is("productId", null);
    if (data?.length) {
      return data;
    } else {
      return [];
    }
  },
});

export const selectedProductState = atom<TProduct | null>({
  key: "selectedProduct",
  default: null,
});

export const categoriesState = selector<Category[]>({
  key: "categoriesState",
  get: async () => {
    const { data } = await supabase.from("categories").select();
    return data || [];
  },
});

export const hotProductsState = selector<TProduct[]>({
  key: "hotProducts",
  get: async ({ get }) => {
    const { data, error } = await supabase
      .from("products")
      .select(`*, inventories: product_inventories(*)`)
      .eq("hot", true)
      .eq("active", true)
      .eq("type", EProductType.PRODUCT);
    return data?.map((item) => mapProduct(item)) || [];
  },
});

export const productsState = selector<TProduct[]>({
  key: "productsState",
  get: async ({ get }) => {
    const { data, error } = await supabase
      .from("products")
      .select(`*, inventories: product_inventories(*)`)
      .eq("active", true);
    return data?.map((item) => mapProduct(item)) || [];
  },
});

export const packageProductState = selector<TProduct[]>({
  key: "packageProductState",
  get: ({ get }) => {
    const products = get(productsState);
    const packages = products.filter(
      (item) => item.type === EProductType.PACKAGE
    );
    return packages;
  },
});

export const normalProductState = selector<TProduct[]>({
  key: "normalProductState",
  get: ({ get }) => {
    const products = get(productsState);
    const packages = products.filter(
      (item) => item.type === EProductType.PRODUCT
    );
    return packages;
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: `1`,
});

export const productsByCategoryState = selectorFamily<TProduct[], string>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    ({ get }) => {
      const allProducts = get(productsState);
      return allProducts.filter(
        (product) => product.categoryId.toString() === categoryId
      );
    },
});

// export const servicesSelector = selector({
//   key: "servicesSelector",
//   get: async ({ get }) => {
//     const { data, error } = await supabase
//       .from("services")
//       .select("*")
//       .eq("active", true);
//     return data || [];
//   },
// });
