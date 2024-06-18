import { FinalPrice } from "components/display/final-price";
import React, { FC } from "react";
import { Product, TProduct } from "types/product";
import { Box, Button, Text } from "zmp-ui";
import PrimaryText from "../primaryText";
import { NewProductPicker } from "./new-picker";

export const ProductItem: FC<{ product: TProduct }> = ({ product }) => {
  console.log("product", product);
  return (
    <NewProductPicker product={product}>
      {({ open }) => (
        <div
          className="space-y-2  w-48  border-[2px] border-solid border-neutral-200 shadow-md rounded-lg  "
          onClick={open}
        >
          <Box className="w-full h-32 relative border-b-[1px] border-solid border-neutral-200 ">
            <img
              loading="lazy"
              src={product.thumbnail}
              className="w-full h-full object-cover object-center rounded-lg bg-skeleton"
            />
          </Box>
          <Box className="p-2 m-0">
            <Text className="text-lg font-bold">{product.name}</Text>
            <PrimaryText className="text-gray pb-2 font-bold">
              <FinalPrice>{product}</FinalPrice>
            </PrimaryText>
            <Button
              size="small"
              className="mt-2 h-10 w-full rounded-md font-bold py-2"
            >
              Thêm vào giỏ hàng
            </Button>
          </Box>
        </div>
      )}
    </NewProductPicker>
  );
};
