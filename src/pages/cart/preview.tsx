import { DisplayPrice } from "components/display/price";
import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import pay, { calcFinalPrice } from "utils/product";
import { Box, Button, Text, useSnackbar } from "zmp-ui";
import Loading from "components/loading";

import supabase from "../../client/client";
import { formatDate } from "../../utils/date";
import { userVouchersState } from "../../state/discount-state";
import {
  addressSelectedState,
  cartState,
  dateSelectedState,
  discountState,
  noteState,
  preTotalPriceState,
  timeSelectedState,
  totalPriceState,
  totalQuantityState,
  voucherSelectedState,
} from "../../state/cart-state";
import { userState } from "../../state";
import { calDiscount } from "../../utils/price";
import { EOrderStatus, EUserVoucherStatus } from "../../constants";
import { ROUTES } from "../../routes";

export const CartPreview: FC = () => {
  const cart = useRecoilValue(cartState);
  const navigate = useNavigate();
  const [userVoucher, setUserVoucher] = useRecoilState(userVouchersState);

  const [loading, setLoading] = useState(false);
  const quantity = useRecoilValue(totalQuantityState);
  const totalPrice = useRecoilValue(totalPriceState);
  const user = useRecoilValue(userState);
  const preTotal = useRecoilValue(preTotalPriceState);
  const [note, setNote] = useRecoilState(noteState);
  const resetCart = useResetRecoilState(cartState);
  // const [date, setDate] = useRecoilState(dateSelectedState);
  // const [time, setTime] = useRecoilState(timeSelectedState);
  const [discount, setDiscount] = useRecoilState(discountState);
  const [voucherSelected, setVoucherSelected] =
    useRecoilState(voucherSelectedState);
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();

  const [address, setAddressSelected] = useRecoilState(addressSelectedState);
  const timmerId = useRef();

  useEffect(
    () => () => {
      closeSnackbar();
      clearInterval(timmerId.current);
    },
    []
  );

  // const calPointUser = useRecoilValue(calPointUserSelector)

  const callBackPayment = async (data) => {
    try {
      const orderCreated = await supabase
        .from("orders")
        .insert({
          userId: user.id,
          ctvId: user.idCTVShared,
          addressId: address?.id,
          total: totalPrice,
          discount: discount ? calDiscount(discount, totalPrice) : 0,
          voucher: discount?.voucher || "",
          preTotal,
          quantity,
          note,
          status: EOrderStatus.WAITING,
          zaloOrderId: data?.orderId,
          // userPoint: calPointUser,
          // ctvPoint: user.idCTVShared ? ctvCommissionPoint : 0,
        })
        .select();
      if (discount && !discount?.public && voucherSelected) {
        const newUserVoucher = userVoucher.filter(
          (item) => item.id !== voucherSelected?.id
        );
        setUserVoucher(newUserVoucher);
        await supabase
          .from("user_vouchers")
          .update({
            status: EUserVoucherStatus.USED,
          })
          .eq("id", voucherSelected?.id);
      }
      const details = cart.reduce((acc, value) => {
        acc.push({
          orderId: orderCreated.data[0].id,
          productId: value.product.id,
          total: calcFinalPrice(value.product, value.options),
          quantity: value.quantity,
          inventoryIds: Object.keys(value.options)
            .reduce((acc, key) => {
              value.options[key].forEach((item) => acc.push(item.id));
              return acc;
            }, [])
            .join(","),
        });
        return acc;
      }, []);
      await Promise.all([supabase.from("order_details").insert(details)]);
      navigate(ROUTES.PAYMENT_SUCCESS);
    } catch (error) {
      openSnackbar({
        text: "Hệ thống có trục trặc, xin liên hệ Admin",
        type: "error",
        icon: true,
        duration: 1000,
      });
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async () => {
    try {
      if (!address?.id) {
        return openSnackbar({
          text: "Vui lòng chọn địa chỉ giao hàng",
          type: "error",
          icon: true,
          duration: 1000,
        });
      }
      setLoading(true);
      const data = await pay(totalPrice, callBackPayment);
      // callBackPayment(null);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box flex className="sticky bottom-0 bg-background p-2">
      <Box
        flex
        flexDirection="column"
        justifyContent="space-between"
        className="min-w-[120px] flex-none"
      >
        <Text className="text-gray" size="xSmall">
          {quantity} sản phẩm
        </Text>
        <Text.Title size="large">
          <DisplayPrice>{totalPrice}</DisplayPrice>
        </Text.Title>
      </Box>
      <Button
        type="highlight"
        disabled={!quantity || loading || !address}
        fullWidth
        onClick={() => makePayment()}
      >
        {loading ? <Loading /> : "Đặt hàng"}
      </Button>
    </Box>
  );
};
