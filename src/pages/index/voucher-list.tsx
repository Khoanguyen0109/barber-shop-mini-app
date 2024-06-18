import React from "react";
import { Box, Text } from "zmp-ui";
import PrimaryText from "../../components/primaryText";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecoilValue } from "recoil";
import { payableDiscountSelector } from "../../state/discount-state";
import VoucherItem from "../../components/voucher-item";

type Props = {};

function VoucherList({}: Props) {
  const onClick = () => {};
  const discounts = useRecoilValue(payableDiscountSelector);
  return (
    <Box className="min-h-96 p-4">
      <Box className={"flex flex-row items-center justify-between mt-8"}>
        <Text className="font-bold text-lg">Dịch vụ nổi bật</Text>
        <PrimaryText className={"mr-3 cursor-pointer color"} onClick={onClick}>
          Xem Tất cả
        </PrimaryText>
      </Box>
      <Swiper
        slidesPerView={2.1}
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
