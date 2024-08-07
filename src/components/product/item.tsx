import { FinalPrice } from "components/display/final-price";
import React, { FC } from "react";
import { Product, TProduct } from "types/product";
import { Box, Button, Text } from "zmp-ui";
import PrimaryText from "../primaryText";
import { NewProductPicker } from "./new-picker";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useRecoilState } from "recoil";
import { selectedProductState } from "../../state/product-state";

export const ProductItem: FC<{ product: TProduct }> = ({ product }) => {
  const navigate = useNavigate();
  const [productSelected, setProductSelected] =
    useRecoilState(selectedProductState);
  const onClickItemToDetail = (e) => {
    e.stopPropagation();
    setProductSelected(product);
    setTimeout(() => {
      navigate(ROUTES.PRODUCT_DETAIL(product.id));
    }, 300);
  };
  return (
    <NewProductPicker product={product}>
      {({ open }) => (
        <div
          className="space-y-2 flex flex-col  max-w-48 border-solid border-neutral-200 shadow-md rounded-lg overflow-hidden "
          onClick={open}
        >
          <Box className="w-full h-32 relative border-b-[1px] border-solid border-neutral-200 ">
            <img
              loading="lazy"
              src={product.thumbnail}
              className="w-full h-full object-cover object-center  bg-skeleton"
              onClick={onClickItemToDetail}
            />
          </Box>
          <Box className="p-2 m-0 flex flex-col justify-between flex-1">
            <Box>
              <Text className=" font-bold">{product.name}</Text>
              <PrimaryText className="text-gray pb-2 font-bold">
                <FinalPrice>{product}</FinalPrice>
              </PrimaryText>
            </Box>

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
