import React, { FC } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { Box, Text } from "zmp-ui";
import Badge from "assets/badge.svg";
import { DisplayPrice } from "../../components/display/price";
import { bannerState } from "../../state/setting-state";
import { useRecoilValue } from "recoil";
import { PRIMARY_COLOR } from "../../constants";
import PrimaryText from "../../components/primaryText";
export const Banner: FC = () => {
  const banners = useRecoilValue(bannerState);

  return (
    <Box className="bg-white w-full relative" pb={4}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        autoplay
        loop
        cssMode
      >
        {[1, 2, 3, 4, 5]
          .map((i) => getDummyImage(`banner-${i}.webp`))
          .map((banner, i) => (
            <SwiperSlide key={i} className="px-4">
              <Box
                className="w-full rounded-lg h-64 bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${banner})` }}
              />
            </SwiperSlide>
          ))}
        {/* {banners.map((banner, i) => (
          <SwiperSlide key={i} className="px-4">
            <Box
              className="w-full rounded-lg h-64 bg-cover bg-center bg-skeleton"
              style={{ backgroundImage: `url(${banner.value})` }}
            />
          </SwiperSlide>
        ))} */}
      </Swiper>
      <Box className="absolute w-full  z-20 -bottom-2 ">
        <Box className="rounded-xl p-4 mx-8 flex bg-white shadow-md  justify-between ">
          <Box className="flex">
            <img src={Badge}></img>
            <Box className="ml-2">
              <PrimaryText className="font-bold">Hạng vàng</PrimaryText>
              <Text className="text-xs">Hạng vàng</Text>
            </Box>
          </Box>
          <Box className="flex">
            <Box className="text-center border-r-[1px] border-solid border-neutral-300 pr-2  ">
              <PrimaryText className="font-bold">26</PrimaryText>
              <Text className="text-xs">Đơn hàng</Text>
            </Box>
            <Box className="text-center ml-2 ">
              <PrimaryText className="font-bold">
                <DisplayPrice>{700000}</DisplayPrice>
              </PrimaryText>
              <Text className="text-xs">Chi tiêu</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
