import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import {
  selectServiceBookingState,
  selectTimeBookingState,
} from "../../state/booking-state";
import NotFound from "../error/not-found";
import PrimaryText from "../../components/primaryText";
import StoreItem from "../../components/store-item";
import { selectedStoreState } from "../../state/store";
import { TimePicker } from "../cart/time-picker";
import { useNavigate } from "react-router-dom";
import { DisplayPrice } from "../../components/display/price";
import { ROUTES } from "../../routes";
import { selectServiceState } from "../../state/services-state";

type Props = {};

function Booking({}: Props) {
  const navigate = useNavigate();
  const selectServiceBooking = useRecoilValue(selectServiceBookingState);
  const [autoSelectService, setAutoSelectService] =
    useRecoilState(selectServiceState);

  const selectedStore = useRecoilValue(selectedStoreState);
  console.log('selectedStore', selectedStore)
  const timeSelected = useRecoilValue(selectTimeBookingState);
  if (!selectServiceBooking || !selectedStore) {
    return <NotFound />;
  }

  const onClick = () => {
    navigate(ROUTES.VERIFY_BOOKING);
  };
  const onClickBack = () => {
    if (autoSelectService) {
      setAutoSelectService(null);
      navigate(ROUTES.HOME);
      return;
    } else {
      return navigate(ROUTES.STORE_DETAIL(selectedStore.id));
    }
  };
  return (
    <Page className="bg-white">
      <Header
        title={"Thông tin dịch vụ"}
        showBackIcon
        onBackClick={onClickBack}
      />
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
        <Text className="text-lg font-bold mt-8">Chi nhánh</Text>
        {/* <Text className="mt-2">{selectServiceBooking.desc}</Text> */}
        <Box className="mt-4">
          <StoreItem store={selectedStore} clickAble={false} />
        </Box>
        <Text className="text-lg font-bold mt-8">Chọn lịch hẹn</Text>
        <Box className="mt-4 mb-8">
          <TimePicker></TimePicker>
        </Box>
        <Button
          className="rounded-lg"
          disabled={!timeSelected}
          onClick={onClick}
        >
          Đặt lịch
        </Button>
      </Box>
    </Page>
  );
}

export default Booking;
