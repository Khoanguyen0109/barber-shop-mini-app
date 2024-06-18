import { atom, selector, selectorFamily } from "recoil";
import { Product, TProduct } from "types/product";
import supabase from "../client/client";
import { groupBy } from "lodash";
import { Category } from "../types/category";

export const mapProduct = (item) => {
  return {
    ...item,
    costdown: item.discount
      ? Number(item.price) - (Number(item.price) * Number(item.discount)) / 100
      : Number(item.price),
    variants: groupBy([...item.inventories], "group"),
    image: item.image.split(",").map((item) => ({ image: item })),
  };
};

export const selectedProductState = atom<Product | null>({
  key: "selectedProduct",
  default: null,
});

export const categoriesState = selector<Category[]>({
  key: "categories",
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
      .eq("level", "Hot")
      .eq("active", true);
    return data?.map((item) => mapProduct(item)) || [];
  },
});

export const productsState = selector<Product[]>({
  key: "products",
  get: async ({ get }) => {
    const { data, error } = await supabase
      .from("products")
      .select(`*, inventories: product_inventories(*)`)
      .eq("active", true);
    return data?.map((item) => mapProduct(item)) || [];
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: `1`,
});

export const productsByCategoryState = selectorFamily<Product[], string>({
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

export const servicesSelector = selector({
  key: "servicesSelector",
  get: async ({ get }) => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("active", true);
    return data || [];
  },
});
