import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { hotProductsState } from "../../state/product-state";
import { ProductItem } from "components/product/item";
import PrimaryText from "../../components/primaryText";

type Props = {};

function NewProductList({}: Props) {
  const navigate = useNavigate();
  const hotProduct = useRecoilValue(hotProductsState);
  console.log("hotProduct", hotProduct);
  const onClick = () => {};
  return (
    <Box className="p-4 h-80 ">
      <Box className={"flex flex-row items-center justify-between mt-2 mb-4"}>
        <Text className="font-bold text-lg">Sản phẩm nổi bật</Text>
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
        {hotProduct.length !== 0 &&
          hotProduct.map((item, index: number) => (
            <SwiperSlide key={item.id}>
              <ProductItem product={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}

export default NewProductList;
