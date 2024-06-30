import React, { useMemo } from "react";
import { Box, Text } from "zmp-ui";
import { TService } from "../types/services";
import { useRecoilState } from "recoil";
import { selectedServiceState } from "../state/services-state";
import PrimaryText from "./primaryText";

type Props = {
  item: TService;
  onItemClick: (item: TService, isActive: boolean) => void;
  isActive: boolean;
};

function ServiceFilterItem({ item, onItemClick, isActive }: Props) {
  const style = !isActive
    ? "border-[1px] border-solid border-orange-500  bg-white  text-orange-500 "
    : "text-white  bg-orange-500";
  return (
    <Box
      className={`${style} rounded-md  mr-2 px-4 py-2 mb-2  `}
      onClick={() => onItemClick(item, isActive)}
    >
      <Text>{item.name}</Text>
    </Box>
  );
}

export default ServiceFilterItem;
