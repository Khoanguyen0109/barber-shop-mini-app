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
import {
  userState,
  userTotalOrderState,
  userTotalPointState,
} from "../../state";
export const Banner: FC = () => {
  const user = useRecoilValue(userState);
  const userTotalPoint = useRecoilValue(userTotalPointState);
  const userTotalOrder = useRecoilValue(userTotalOrderState);

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
        {banners
          .map((banner, i) => (
            <SwiperSlide key={i} className="px-4">
              <Box
                className="w-full rounded-lg h-64 bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${banner.value})` }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Box className="absolute w-full  z-20 -bottom-2 ">
        <Box className="rounded-xl p-4 mx-8 flex bg-white shadow-md  justify-between ">
          <Box className="flex">
            <img src={Badge}></img>
            <Box className="ml-2">
              <PrimaryText className=" text-[10px] font-bold">
                Thành viên {user.memberClass}
              </PrimaryText>
              <Text className="text-xs">{userTotalPoint}</Text>
            </Box>
          </Box>
          <Box className="flex">
            <Box className="text-center border-r-[1px] border-solid border-neutral-300 pr-2  ">
              <PrimaryText className="font-bold">
                {userTotalOrder || 0}
              </PrimaryText>
              <Text className="text-xs">Đơn hàng</Text>
            </Box>
            <Box className="text-center ml-2 ">
              <PrimaryText className="font-bold">
                <DisplayPrice>{user?.totalSpent || 0}</DisplayPrice>
              </PrimaryText>
              <Text className="text-xs">Chi tiêu</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
