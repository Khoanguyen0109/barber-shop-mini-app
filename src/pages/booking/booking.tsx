import React from "react";
import { useRecoilValue } from "recoil";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import { selectServiceBookingState } from "../../state/booking-state";
import NotFound from "../error/not-found";
import PrimaryText from "../../components/primaryText";
import StoreItem from "../../components/store-item";
import { selectedStoreState } from "../../state/store";
import { TimePicker } from "../cart/time-picker";
import { Divider } from "../../components/divider";
import { useNavigate } from "react-router-dom";
import { DisplayPrice } from "../../components/display/price";
import { ROUTES } from "../../routes";

type Props = {};

function Booking({}: Props) {
  const navigate = useNavigate();
  const selectServiceBooking = useRecoilValue(selectServiceBookingState);
  const selectedStore = useRecoilValue(selectedStoreState);
  if (!selectServiceBooking || !selectedStore) {
    return <NotFound />;
  }

  const onClick = ()=>{
    navigate(ROUTES.VERIFY_BOOKING)
  }
  return (
    <Page className="bg-white">
      <Header title={selectServiceBooking.name} />
      <Box className="p-4 flex flex-col h-full">
        <img
          className="w-full h-56 object-fill rounded-md"
          src={selectServiceBooking.thumbnail}
        />
        <Text className="font-bold text-lg mt-2">
          {selectServiceBooking.name}
        </Text>
        <PrimaryText className="text-md mt-1 font-semibold">
          <DisplayPrice>{selectServiceBooking.price}</DisplayPrice>{" "}
        </PrimaryText>
        <Text className="text-lg font-bold mt-8">Mô tả dịch vụ</Text>
        <Text className="mt-2">{selectServiceBooking.desc}</Text>
        <Box className="mt-4">
          <StoreItem store={selectedStore} clickAble={false} />
        </Box>

        <Box className="my-8">
          <TimePicker></TimePicker>
        </Box>
        <Button className="rounded-lg" onClick={onClick}>Đặt lịch</Button>
      </Box>
    </Page>
  );
}

export default Booking;
