import React from "react";
import { Box, Text } from "zmp-ui";
import PrimaryText from "../../components/primaryText";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecoilValue } from "recoil";
import { servicesSelector } from "../../state/product-state";
import ServiceItem from "../../components/service-item";

type Props = {};

function ServicesList({}: Props) {
  const services = useRecoilValue(servicesSelector);
  const onClick = () => {};
  return (
    <Box className="p-4 h-80 ">
      <Box className={"flex flex-row items-center justify-between mt-4 mb-4"}>
        <Text className="font-bold text-lg">Dịch vụ nổi bật</Text>
        <PrimaryText className={"mr-3 cursor-pointer color"} onClick={onClick}>
          Xem Tất cả
        </PrimaryText>
      </Box>
      <Swiper
        id="service-slider"
        slidesPerView={2.1}
        centeredSlides={false}
        freeMode={true}
        spaceBetween={12}
      >
        {services.length !== 0 &&
          services.map((item, index: number) => (
            <SwiperSlide key={item.id}>
              <ServiceItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}

export default ServicesList;
