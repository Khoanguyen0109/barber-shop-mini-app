import React, { FC, useMemo } from "react";
import { SelectedOptions } from "types/cart";
import { Product, TProduct } from "types/product";
import { calcFinalPrice } from "utils/product";
import { DisplayPrice } from "./price";
import { TService } from "../../types/services";

export const FinalPrice: FC<{
  children: TProduct | TService;
  options?: SelectedOptions;
}> = ({ children, options }) => {
  const finalPrice = useMemo(
    () => calcFinalPrice(children, options),
    [children, options]
  );
  return <DisplayPrice>{finalPrice}</DisplayPrice>;
};
