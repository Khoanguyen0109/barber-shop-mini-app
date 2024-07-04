import React, { useState } from "react";
import { Box, Modal, Text } from "zmp-ui";
import PrimaryText from "../../components/primaryText";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  payableDiscountSelector,
  userVouchersState,
} from "../../state/discount-state";
import VoucherItem from "../../components/voucher-item";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { userState, userCurrentPointState } from "../../state";
import useCustomSnackbar from "../../hook/useCustomSnackbar";
import { TDiscount } from "../../types/discount";
import supabase from "../../client/client";
import { EUserVoucherStatus } from "../../constants";
import logo from "assets/logo.png";
type Props = {};

function VoucherList({}: Props) {
  const user = useRecoilValue(userState);
  const { openSnackbar } = useCustomSnackbar();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectDiscount, setSelectDiscount] = useState<null | TDiscount>(null);
  const [userVouchers, setUserVouchers] = useRecoilState(userVouchersState);

  const navigate = useNavigate();
  const onClick = () => {
    navigate(ROUTES.BUY_VOUCHER);
  };

  const [userTotalPoint, setUserTotalPoint] =
    useRecoilState(userCurrentPointState);
  const discounts = useRecoilValue(payableDiscountSelector);

  const onClickRedeem = (item) => {
    if (userTotalPoint < item.point) {
      return openSnackbar({
        text: "Bạn không đủ điểm cho voucher này!",
        type: "error",
        icon: true,
        duration: 2000,
      });
    }
    setSelectDiscount(item);
    setConfirmModalVisible(true);
  };

  const handleRedeem = async () => {
    if (selectDiscount) {
      try {
        const pointLess = userTotalPoint - selectDiscount.point;
        setUserTotalPoint(pointLess);

        const { data } = await supabase
          .from("user_vouchers")
          .insert({
            userId: user.id,
            discountId: selectDiscount.id,
            status: EUserVoucherStatus.UNUSED,
          })
          .select("*, discounts(*)");
        if (data?.length) {
          setUserVouchers([...userVouchers, data[0]]);
        }
        await supabase
          .from("users")
          .update({ point: pointLess })
          .eq("id", user.id);
        setConfirmModalVisible(false);
        setSelectDiscount(null);
        return openSnackbar({
          text: "Bạn đã thu thập cho voucher này!",
          type: "success",
          icon: true,
          duration: 2000,
        });
      } catch (error) {
        return openSnackbar({
          text: "Voucher không thu thập được, vui lòng thử lại!",
          type: "error",
          icon: true,
          duration: 2000,
        });
      }
    }
  };
  return (
    <Box className="min-h-96 p-4">
      <Box className={"flex flex-row items-center justify-between mt-4 mb-4"}>
        <Text className="font-bold text-lg">Ưu đãi nổi bật</Text>
        <PrimaryText className={"mr-3 cursor-pointer color"} onClick={onClick}>
          Xem Tất cả
        </PrimaryText>
      </Box>
      <Swiper
        slidesPerView={1.1}
        centeredSlides={false}
        freeMode={true}
        spaceBetween={12}
      >
        {discounts.length !== 0 &&
          discounts.map((item, index: number) => (
            <SwiperSlide key={item.id}>
              <VoucherItem
                key={item.id}
                item={item}
                onClickRedeem={onClickRedeem}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <Modal
        visible={confirmModalVisible}
        title="Đổi voucher"
        coverSrc={logo}
        description={`Bạn xác nhận đổi voucher ${selectDiscount?.title}`}
        actions={[
          {
            text: "Huỷ",
            onClick: () => {
              setConfirmModalVisible(false);
              setSelectDiscount(null);
            },
          },
          {
            highLight: true,
            text: "Đồng ý",
            onClick: () => {
              handleRedeem();
            },
          },
        ]}
      ></Modal>
    </Box>
  );
}

export default VoucherList;
