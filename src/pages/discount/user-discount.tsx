import React from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { Box, Header, Page, Text } from "zmp-ui";

import { useNavigate, useSearchParams } from "react-router-dom";
import { publicDiscountSelector, userVouchersState } from "../../state/discount-state";
import { discountState, preTotalPriceState, voucherSelectedState } from "../../state/cart-state";
import DiscountItem from "../../components/discount-item";
import { ROUTES } from "../../routes";
import { EUserVoucherStatus } from "../../constants";
import supabase from "../../client/client";
import { TDiscount } from "../../types/discount";
import useCustomSnackbar from "../../hook/useCustomSnackbar";
import { userState } from "../../state";
import { Formatter } from "../../utils/formatter";

type Props = {};

function UserDiscount({}: Props) {
  const { openSnackbar } = useCustomSnackbar();
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const userVoucherList = useRecoilValue(userVouchersState);
  const publicVoucher = useRecoilValue(publicDiscountSelector);
  const preTotal = useRecoilValue(preTotalPriceState);
  const [voucherSelected, setVoucherSelected] =
    useRecoilState(voucherSelectedState);
  let [searchParams, setSearchParams] = useSearchParams();
  const routeFrom = searchParams.get("routeFrom");
  const isRouteFromCart = searchParams.get("routeFrom") === "cart";
  const [discount, setDiscount] = useRecoilState(discountState);

  const onChoose = async(item) => {
    if (isRouteFromCart) {
      if (item.public) {
        const { data: existingVoucher } = await supabase
          .from("user_vouchers")
          .select()
          .eq("userId", user.id)
          .eq("discountId", item.id)
          .maybeSingle<TDiscount>();
        if (
          existingVoucher &&
          existingVoucher.status === EUserVoucherStatus.USED
        ) {
          console.info("User has already used this voucher!");
          return openSnackbar({
            text: "Bạn đã đổi voucher này rồi!",
            type: "warning",
            icon: true,
            duration: 2000,
          });
        } else if (item && item.maxPrice !== 0 && preTotal > item.maxPrice) {
          return openSnackbar({
            text: `Giá trị Đơn hàng phải nhỏ hơn hoặc bằng ${Formatter.currency(
              item.maxPrice
            )}!`,
            type: "warning",
            icon: true,
            duration: 2000,
          });
        } else if (item && item.minPrice !== 0 && preTotal < item.minPrice) {
          return openSnackbar({
            text: `Giá trị Đơn hàng phải lớn hơn ${Formatter.currency(
              item.minPrice
            )}!`,
            type: "warning",
            icon: true,
            duration: 2000,
          });
        } else if (
          item &&
          item.discountBy == "price" &&
          item.discount > preTotal
        ) {
          return openSnackbar({
            text: `Voucher chỉ áp dụng cho đơn hàng trên ${Formatter.currency(
              item.discount
            )}`,
            type: "warning",
            icon: true,
            duration: 2000,
          });
        } else {
          const { data } = await supabase
            .from("user_vouchers")
            .insert({
              userId: user.id,
              discountId: item.id,
              status: EUserVoucherStatus.UNUSED,
              thumbnail: item.thumbnail,
              discountBy: item.discountBy,
              discount: item.discount,
            })
            .select("*, discounts(*)");

          setDiscount(item);
          setVoucherSelected(item);
          navigate(ROUTES.CART);
        }
      } else {
        setDiscount(item);
        setVoucherSelected(item);
        navigate(ROUTES.CART);
      }
    }
  };
  const onBack = () => {
    if (isRouteFromCart) {
      navigate(ROUTES.CART);
    } else {
      navigate(-1);
    }
  };

  return (
    <Page>
      <Header title="Ưu đãi của tôi" showBackIcon={true} onBackClick={onBack} />
      <Box className="p-2 mt-4">
        {userVoucherList?.map((item) => (
          <DiscountItem
            key={item.id}
            item={item.discounts}
            onChoose={isRouteFromCart ? onChoose : undefined}
            onUpdateItem={() => {
              setVoucherSelected(item);
            }}
          />
        ))}
      </Box>
      {isRouteFromCart && publicVoucher.length > 0 && (
        <Box className="p-2 mt-4">
          <Text className="font-bold mb-3">Mã khuyến mãi của cửa hàng</Text>
          {publicVoucher.map((item) => (
            <DiscountItem key={item.id} item={item} onChoose={onChoose} />
          ))}
        </Box>
      )}
    </Page>
  );
}

export default UserDiscount;
