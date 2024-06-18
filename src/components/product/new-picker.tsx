import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SelectedOptions } from "types/cart";
import { Product, TProduct } from "types/product";
import { isIdentical, isIdenticalV2 } from "utils/product";
import { useNavigate } from "react-router-dom";
import { Box, Button, Icon, Text } from "zmp-ui";
import { FinalPrice } from "../display/final-price";
import { QuantityPicker } from "./quantity-picker";
import { groupBy, includes, isEmpty, uniq } from "lodash";
import { DisplaySelectedOptions } from "../display/selected-options";
import { cartState } from "../../state/cart-state";
import { globalProductInventoriesSelector } from "../../state/product-state";
import { ROUTES } from "../../routes";
import ProductVariant from "../product-variant";

export interface ProductPickerProps {
  product?: TProduct;
  selected?: {
    options: SelectedOptions;
    quantity: number;
  };
  children: (methods: {
    open: () => void;
    close: () => void;
    openRedirect: () => void;
  }) => ReactNode;
}

export const NewProductPicker: FC<ProductPickerProps> = ({
  children,
  product,
  selected,
}) => {
  const globalInventories = useRecoilValue(globalProductInventoriesSelector);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<SelectedOptions>({});
  const [quantity, setQuantity] = useState(1);
  const setCart = useSetRecoilState(cartState);
  const [isRedirect, setIsRedirect] = useState(false);
  const variants = useMemo(
    () =>
      visible
        ? {
            ...(product?.variants ? product?.variants : {}),
            ...groupBy(globalInventories, "group"),
          }
        : {},
    [visible]
  );
  useEffect(() => {
    if (selected) {
      setOptions(selected.options);
      setQuantity(selected.quantity);
    }
  }, [selected]);

  const addToCart = () => {
    if (product) {
      setCart((cart) => {
        let res = [...cart];
        if (selected) {
          // updating an existing cart item, including quantity and size, or remove it if new quantity is 0
          const editing = cart.find(
            (item) =>
              item.product.id === product.id &&
              isIdenticalV2(item.options, selected.options)
          )!;
          if (quantity === 0) {
            res.splice(cart.indexOf(editing), 1);
          } else {
            const existed = cart.find(
              (item, i) =>
                i !== cart.indexOf(editing) &&
                item.product.id === product.id &&
                isIdenticalV2(item.options, options)
            )!;
            res.splice(cart.indexOf(editing), 1, {
              ...editing,
              options,
              quantity: existed ? existed.quantity + quantity : quantity,
            });
            if (existed) {
              res.splice(cart.indexOf(existed), 1);
            }
          }
        } else {
          // adding new item to cart, or merging if it already existed before
          const existed = cart.find(
            (item) =>
              item.product.id === product.id &&
              isIdenticalV2(item.options, options)
          );
          if (existed) {
            res.splice(cart.indexOf(existed), 1, {
              ...existed,
              quantity: existed.quantity + quantity,
            });
          } else {
            res = res.concat({
              selected: true,
              product,
              options,
              price: product.price,
              quantity,
            });
          }
        }
        return res;
      });
    }
    setVisible(false);
    setQuantity(1);
    setOptions({});
    if (isRedirect) {
      navigate(ROUTES.CART);
    }
  };
  return (
    <>
      {children({
        openRedirect: () => {
          setVisible(true);
          setIsRedirect(true);
        },
        open: () => setVisible(true),
        close: () => {
          setVisible(false);
          setIsRedirect(false);
        },
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {product && (
            <Box className="space-y-6 mt-4 " p={4}>
              <Box className="space-y-2">
                <Box className="flex items-start">
                  <img
                    loading="lazy"
                    src={product.thumbnail}
                    className="w-20 h-20 mr-2 rounded-xl"
                  />
                  <Box>
                    <Text.Title className="font-bold">
                      {product.name}
                    </Text.Title>
                    <Text className="font-bold mt-1">
                      <FinalPrice options={options}>{product}</FinalPrice>
                    </Text>
                    <Text className="text-xs ">
                      <DisplaySelectedOptions options={options}>
                        {product}
                      </DisplaySelectedOptions>
                    </Text>
                  </Box>
                  <Box className="flex-1 text-right pr-2">
                    <Icon
                      icon="zi-close"
                      onClick={() => {
                        setVisible(false);
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className="space-y-5 overflow-y-auto h-[420px]">
                {!isEmpty(variants) &&
                  Object.keys(variants).map((key) => {
                    return (
                      <ProductVariant
                        variant={key}
                        value={options[key] as string[]}
                        values={variants[key]}
                        onChange={(selectedOption) => {
                          console.log("options[key] ", options[key]);
                          // if (key === "Món thêm") {
                          //   console.log("first");
                          //   setOptions((prevOptions) => ({
                          //     ...prevOptions,
                          //     [key]: includes(prevOptions[key], selectedOption)
                          //       ? prevOptions[key].filter(
                          //           (item) => item.id !== selectedOption.id
                          //         )
                          //       : [...(prevOptions[key] ?? []), selectedOption],
                          //   }));
                          // } else {
                          setOptions((prevOptions) => ({
                            ...prevOptions,
                            [key]: [selectedOption],
                          }));
                          // }
                        }}
                      />
                    );
                  })}
              </Box>

              {/* {product.variants &&
               product.variants.map((variant) =>
               <ProductVariant variant={variant}/>
                 // variant.type === "single" ? (
                 //   <SingleOptionPicker
                 //     key={variant.key}
                 //     variant={variant}
                 //     value={options[variant.key] as string}
                 //     onChange={(selectedOption) =>
                 //       setOptions((prevOptions) => ({
                 //         ...prevOptions,
                 //         [variant.key]: selectedOption,
                 //       }))
                 //     }
                 //   />
                 // ) : (
                 //   <MultipleOptionPicker
                 //     key={variant.key}
                 //     product={product}
                 //     variant={variant}
                 //     value={options[variant.key] as string[]}
                 //     onChange={(selectedOption) =>
                 //       setOptions((prevOptions) => ({
                 //         ...prevOptions,
                 //         [variant.key]: selectedOption,
                 //       }))
                 //     }
                 //   />
                 // )
               )} */}
              <QuantityPicker value={quantity} onChange={setQuantity} />
              {selected ? (
                <Button
                  variant={quantity > 0 ? "primary" : "secondary"}
                  type={quantity > 0 ? "highlight" : "neutral"}
                  fullWidth
                  onClick={addToCart}
                >
                  {quantity > 0
                    ? selected
                      ? "Cập nhật giỏ hàng"
                      : "Thêm vào giỏ hàng"
                    : "Xoá"}
                </Button>
              ) : (
                <Button
                  disabled={!quantity}
                  variant="primary"
                  type="highlight"
                  fullWidth
                  onClick={addToCart}
                >
                  {isRedirect ? "Mua ngay" : "Thêm vào giỏ hàng"}
                </Button>
              )}
            </Box>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};
