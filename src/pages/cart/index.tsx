import React, { FC } from "react";
import { Divider } from "components/divider";
import { Header, Page } from "zmp-ui";
import { CartItems } from "./cart-items";
import { CartPreview } from "./preview";
import { TermsAndPolicies } from "./term-and-policies";
import { Delivery } from "./delivery";
import { useVirtualKeyboardVisible } from "hooks";
import { useRecoilValue } from "recoil";
import { cartState } from "../../state/cart-state";

const CartPage: FC = () => {
  const cart = useRecoilValue(cartState);

  const keyboardVisible = useVirtualKeyboardVisible();
  // const calPointUser = useRecoilValue(calPointUserSelector);

  return (
    <Page className="flex flex-col">
      <Header title="Giỏ hàng" showBackIcon={false} />
      <CartItems disableClick={false} />

      {cart.length > 0 && (
        <>
          <Delivery />
          <Divider size={12} />
        </>
      )}

      {/* {calPointUser && (
            <Box>
              <Text className="m-2 text-sm font-bold text-green">
                {`Bạn  nhận dc ${
                  calPointUser * quantity
                } xu tích lũy cho đơn hàng này`}
              </Text>
            </Box>
          )} */}

      {/* <TermsAndPolicies /> */}
      <Divider size={32} className="flex-1" />
      {!keyboardVisible && <CartPreview />}
    </Page>
  );
};

export default CartPage;
