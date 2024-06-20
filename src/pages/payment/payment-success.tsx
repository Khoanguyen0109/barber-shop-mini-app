import React, { FC, useMemo } from "react";
import { Button, Header, Icon, Page, Text } from "zmp-ui";

import { followOA } from "zmp-sdk";
import { OA_ID } from "enviroment";
import { useNavigate } from "react-router-dom";
import Success from "assets/success.png";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import supabase from "../../client/client";
import logo from "assets/logo.png";
import { orderNoteState, userState } from "../../state";
import {
  addressSelectedState,
  cartState,
  totalPriceState,
} from "../../state/cart-state";
import { ROUTES } from "../../routes";
const PaymentSuccess: FC = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [note, setNote] = useRecoilState(orderNoteState);
  const [address, setAddressSelected] = useRecoilState(addressSelectedState);
  const totalPrice = useRecoilValue(totalPriceState);
  const resetCart = useResetRecoilState(cartState);

  const backHome = () => {
    setAddressSelected(null);
    setNote("");
    resetCart();
    navigate(ROUTES.HOME);
  };
  const updateFollowed = async () => {
    const { error } = await supabase
      .from("users")
      .update({ followed: true })
      .eq("id", user.id);
  };

  const onClick = async () => {
    if (!user?.followed) {
      return await followOA({
        id: OA_ID,
        success: () => {
          updateFollowed();
          backHome();
        },
        fail: () => {
          backHome();
        },
      });
    }
    return backHome();
  };

  return (
    <Page className="flex flex-col bg-white">
      <div className="flex flex-1 flex-col justify-center align-middle p-10">
        <Text.Header className="mb-4 text-center mt-4 font-bold text-lg">
          Đặt hàng thành công
        </Text.Header>

        <Button variant="primary" onClick={onClick}>
          Tiếp tục
        </Button>
      </div>
    </Page>
  );
};

export default PaymentSuccess;
