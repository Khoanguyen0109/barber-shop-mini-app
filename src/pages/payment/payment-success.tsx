import React, { FC, useEffect, useMemo } from "react";
import { Button, Header, Icon, Page, Text } from "zmp-ui";

import { followOA, getUserInfo, Payment } from "zmp-sdk";
import { OA_ID } from "enviroment";
import { useLocation, useNavigate } from "react-router-dom";
import Success from "assets/success.png";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import paymentSuccessIcon from "assets/payment-success-icon.svg";
import supabase from "../../client/client";
import logo from "assets/logo.png";
import { orderNoteState, userState } from "../../state";
import {
  addressSelectedState,
  cartState,
  totalPriceState,
} from "../../state/cart-state";
import { ROUTES } from "../../routes";
import { isUndefined } from "lodash";
const PaymentSuccess: FC = () => {
  const { state } = useLocation();
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
    const zaloUser = await getUserInfo().then((res) => res.userInfo);
    const { error } = await supabase
      .from("users")
      .update({ followed: true, idUserToNotification: zaloUser.idByOA })
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

  useEffect(() => {
    let data = state;
    if (data) {
      if ("path" in data) {
        data = data.path;
      } else if ("data" in data) {
        data = data.data;
      }
    } else {
      data = new URL(window.location.href).searchParams.toString();
    }
    // gọi api checkTransaction để lấy thông tin giao dịch
    Payment.checkTransaction({
      data,
      success: (rs) => {
        // Kết quả giao dịch khi gọi api thành công
        // const { id, resultCode, msg, transTime, createdAt } = rs;
        console.log("rs", rs);
        // // if(rs =)
        console.log("", rs.resultCode);
        if (isUndefined(rs?.resultCode) || rs.resultCode === -1) {
          if(state.from === 'booking'){
            return navigate(ROUTES.VERIFY_BOOKING);

          }else{
            return navigate(ROUTES.CART);

          }
        }
      },
      fail: (err) => {
        // Kết quả giao dịch khi gọi api thất bại
        console.log(err);
      },
    });
  }, []);


  return (
    <Page className="flex flex-col  bg-orange-500 text-white">
      <div className="flex flex-1 flex-col items-center justify-start align-middle p-10">
        <img className="w-40 h-40 mt-20" src={paymentSuccessIcon} />
        <Text.Header className="mb-2 text-center mt-4 font-bold text-xl">
          Đặt thành công
        </Text.Header>
        <Text className="mb-4 text-center mt-4  text-lg">
          Cám ơn bạn đã quan tâm đến dịch vụ của Đông Tây Barbershop.
        </Text>
        <Button className="!bg-white text-orange-500 mt-7" onClick={onClick}>
          Quay về trang chủ
        </Button>
      </div>
    </Page>
  );
};

export default PaymentSuccess;
