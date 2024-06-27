import React from "react";
import { TDiscount } from "../types/discount";
import { Box, Button, Text } from "zmp-ui";
import PrimaryText from "./primaryText";
import { useNavigate } from "react-router-dom";

type Props = {
  item: TDiscount;
  onClickRedeem: (item: TDiscount) => void;
};

function VoucherItem({ item, onClickRedeem }: Props) {
  const navigate = useNavigate();
  return (
    <Box className="shadow-lg rounded-md overflow-hidden">
      <img src={item.thumbnail} className=" w-full h-52  " />
      <Text className="text-lg font-bold mt-2">{item.title}</Text>
      <Box className="flex justify-between">
        <PrimaryText>{item.point} Điểm</PrimaryText>
        <Button
          className="rounded-md "
          size="small"
          onClick={() => onClickRedeem(item)}
        >
          Đổi
        </Button>
      </Box>
    </Box>
  );
}

export default VoucherItem;
