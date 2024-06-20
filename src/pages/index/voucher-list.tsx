import React from "react";
import { Box, Text } from "zmp-ui";
import PrimaryText from "../../components/primaryText";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecoilValue } from "recoil";
import { payableDiscountSelector } from "../../state/discount-state";
import VoucherItem from "../../components/voucher-item";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

type Props = {};

function VoucherList({}: Props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(ROUTES.BUY_VOUCHER);
  };
  const discounts = useRecoilValue(payableDiscountSelector);
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
              <VoucherItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}

export default VoucherList;
