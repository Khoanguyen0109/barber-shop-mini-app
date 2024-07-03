import React from "react";
import { TBooking } from "../types/booking";
import { Box, Icon, Text } from "zmp-ui";

type Props = {
  item: TBooking;
};

function BookingItem({ item }: Props) {
  return (
    <Box className="p-2 rounded-lg flex w-full shadow-md mb-4">
      <img
        className="rounded-md w-20 h-20 mr-4"
        src={item.storeService.service.thumbnail}
      ></img>
      <Box className="flex flex-col justify-center ">
        <Text className="  font-bold">{item.storeService.service.name}</Text>
        <Text className="mt-2 font-light">{item.storeService.store.name}</Text>
        <Box className="flex space-x-2 items-start mt-2">
          <Icon icon="zi-location-solid" />
          <Text className="ml-2 font-extralight">
            {item.storeService.store.fullAddress}
          </Text>
        </Box>
        <Box className="flex space-x-2 items-center mt-2 font-extralight">
          <Icon icon="zi-calendar-solid" />
          <Text className="font-extralight">{item.date}</Text>
          <Text className="font-extralight">{item.time}</Text>
        </Box>
      </Box>
    </Box>
  );
}

export default BookingItem;
