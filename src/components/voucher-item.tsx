import React from "react";
import { TDiscount } from "../types/discount";
import { Box, Button, Text } from "zmp-ui";
import PrimaryText from "./primaryText";

type Props = {
  item: TDiscount;
};

function VoucherItem({ item }: Props) {
  return (
    <Box className="shadow-lg rounded-md overflow-hidden">
      <img src={item.thumbnail} className=" w-full h-52  " />
      <Text className="text-lg font-bold mt-2">{item.title}</Text>
      <Box className="flex justify-between">
        <PrimaryText>{item.point} Điểm</PrimaryText>
        <Button className="rounded-md " size="small">
          Đổi
        </Button>
      </Box>
    </Box>
  );
}

export default VoucherItem;
