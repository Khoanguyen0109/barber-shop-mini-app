import React, { useMemo } from "react";
import { Box, Text } from "zmp-ui";
import { TService } from "../types/services";
import { useRecoilState } from "recoil";
import { selectedServiceState } from "../state/services-state";
import PrimaryText from "./primaryText";

type Props = {
  item: TService;
};

function ServiceFilterItem({ item }: Props) {
  const [selectedServices, setSelectedServices] =
    useRecoilState(selectedServiceState);
  const isActive = useMemo(
    () => selectedServices.find((ser) => ser.id === item.id),
    [selectedServices]
  );

  const onItemClick = () => {
    if (isActive) {
      setSelectedServices(selectedServices.filter((ser) => ser.id !== item.id));
    } else {
      setSelectedServices([...selectedServices, item]);
    }
  };
  const style = !isActive
    ? "border-[1px] border-solid border-orange-500  bg-white  text-orange-500 "
    : "text-white  bg-orange-500";
  return (
    <Box
      className={`${style} rounded-md  mr-2 px-4 py-2 mb-2  `}
      onClick={onItemClick}
    >
      <Text>{item.name}</Text>
    </Box>
  );
}

export default ServiceFilterItem;
