import React from "react";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import { selectServiceBookingState } from "../../state/booking-state";
import { useRecoilValue } from "recoil";
import NotFound from "../error/not-found";
import PrimaryText from "../../components/primaryText";
import { DisplayPrice } from "../../components/display/price";
import { selectedStoreState } from "../../state/store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

type Props = {};

function VerifyBooking({}: Props) {
  const navigate = useNavigate();
  const selectServiceBooking = useRecoilValue(selectServiceBookingState);
  const selectedStore = useRecoilValue(selectedStoreState);

  if (!selectServiceBooking) {
    return <NotFound />;
  }
  const onClick = () => {
    navigate(ROUTES.PAYMENT_SUCCESS);
  };

  return (
    <Page className="bg-orange-500 text-whiteservicesSelector flex flex-col">
      <Header
        className="bg-orange-500 [&_*]:text-white "
        title="Xác nhận đặt lịch"
      />
      <Box className="p-4 h-32">
        <Box className="p-2 rounded-lg flex bg-white w-full">
          <img
            className="rounded-md w-20 h-20 mr-4"
            src={selectServiceBooking.thumbnail}
          ></img>
          <Box className="flex flex-col justify-center ">
            <Text className=" font-bold">{selectServiceBooking.name}</Text>
            <PrimaryText className=" text-sm font-semibold mt-2">
              <DisplayPrice>{selectServiceBooking.price}</DisplayPrice>
            </PrimaryText>
          </Box>
        </Box>
      </Box>
      <Box className="mt-8 p-4 rounded-t-3xl bg-white flex-1 text-black flex flex-col">
        <Box className="mb-6">
          <Text className="font-bold text-lg mb-1">Ngày giờ</Text>
          <Text>10/07/2024 9:00</Text>
        </Box>

        <Box className="mb-6">
          <Text className="font-bold text-lg mb-1">Dịch vụ</Text>

          <Box className="flex justify-between">
            <Text>{selectServiceBooking.name}</Text>
            <DisplayPrice>{selectServiceBooking.price}</DisplayPrice>
          </Box>
        </Box>

        <Box className="mb-6">
          <Text className="font-bold text-lg mb-1">Địa chỉ</Text>
          <Text className="font-medium">{selectedStore?.name}</Text>
          <Text className="font-light">{selectedStore?.fullAddress}</Text>
        </Box>

        <Box className="flex-1"></Box>
        <Button className="rounded-lg" onClick={onClick}>
          Xác nhận đặt lịch
        </Button>
      </Box>
    </Page>
  );
}

export default VerifyBooking;
