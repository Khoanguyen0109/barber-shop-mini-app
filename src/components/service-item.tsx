import React from "react";
import { TService } from "../types/product";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { Box, Button, Text } from "zmp-ui";
import PrimaryText from "./primaryText";
import { FinalPrice } from "./display/final-price";

type Props = {
  item: TService;
};

function ServiceItem({ item }: Props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(ROUTES.STORE_LIST);
  };
  return (
    <div
      className="space-y-2  w-48   border-solid border-neutral-200 shadow-md rounded-lg  "
      onClick={onClick}
    >
      <Box className="w-full h-32 relative border-b-[1px] border-solid border-neutral-200 ">
        <img
          loading="lazy"
          src={item.thumbnail}
          className="w-full h-full object-cover object-center rounded-lg bg-skeleton"
        />
      </Box>
      <Box className="p-2 m-0">
        <Text className=" font-bold">{item.name}</Text>
        <PrimaryText className="text-gray pb-2 font-bold">
          <FinalPrice>{item}</FinalPrice>
        </PrimaryText>
        <Button
          size="small"
          className="mt-2 h-10 w-full rounded-md font-bold py-2"
        >
          Đặt lịch
        </Button>
      </Box>
    </div>
  );
}

export default ServiceItem;
