import { EProductType } from "../constants";

export interface PercentSale {
  type: "percent";
  percent: number;
}

export interface FixedSale {
  amount: number;
  type: "fixed";
}

export type Sale = PercentSale | FixedSale;

export interface Option {
  id: string;
  label?: string;
  priceChange?: Sale;
}

export interface BaseVariant {
  id: string;
  label?: string;
  options: Option[];
}

export interface SingleOptionVariant extends BaseVariant {
  type: "single";
  default?: string;
}

export interface MultipleOptionVariant extends BaseVariant {
  type: "multiple";
  default?: string[];
}

export type Variant = SingleOptionVariant | MultipleOptionVariant;

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  categoryId: string[];
  description?: string;
  sale?: Sale;
  variants?: Variant[];
}

export type TProduct = {
  id: number;
  name: string;
  image: string;
  thumbnail: string;
  price: number;
  desc: string;
  categoryId: number;
  variants?: Variant[];
  type: EProductType;
};

