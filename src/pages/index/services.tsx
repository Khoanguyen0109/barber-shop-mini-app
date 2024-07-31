import React from "react";
import { Box, Text } from "zmp-ui";
import PrimaryText from "../../components/primaryText";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecoilState, useRecoilValue } from "recoil";
import ServiceItem from "../../components/service-item";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import {
  selectServiceState,
  servicesSelector,
} from "../../state/services-state";

type Props = {};

function ServicesList({}: Props) {
  const navigate = useNavigate();
  const services = useRecoilValue(servicesSelector);
  const [serviceSelected, setServiceSelected] =
    useRecoilState(selectServiceState);
  const onClick = (item) => {
    setServiceSelected(item);
    setTimeout(() => navigate(ROUTES.STORE_LIST), 300);
  };
  return (
    <Box className="p-4 h-80 ">
      <Box className={"flex flex-row items-center justify-between mt-4 mb-4"}>
        <Text className="font-bold text-lg">Dịch vụ nổi bật</Text>
        <PrimaryText
          className={"mr-3 cursor-pointer color"}
          onClick={() => navigate(ROUTES.STORE_LIST)}
        >
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
              <ServiceItem item={item} onClick={onClick} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}

export default ServicesList;
