import React, { useState } from "react";
import { TBooking } from "../types/booking";
import { Box, Button, Icon, Modal, Text } from "zmp-ui";
import { useRecoilState } from "recoil";
import { bookingListState } from "../state/booking-state";
import { cloneDeep } from "lodash";
import { EBookingStatus } from "../constants";
import supabase from "../client/client";

type Props = {
  item: TBooking;
};

function BookingItem({ item }: Props) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [bookings, setBooking] = useRecoilState(bookingListState);
  const cancelBooking = async () => {
    const index = bookings.findIndex((booking) => item.id === booking.id);
    const cloneBooking = cloneDeep(bookings);
    cloneBooking[index].status = EBookingStatus.CANCEL;
    setBooking(cloneBooking);
    await supabase
      .from("schedules")
      .update({ status: EBookingStatus.CANCEL })
      .eq("id", item.id);
  };
  return (
    <Box
      className="p-2 rounded-lg flex w-full shadow-md mb-4"
      onClick={(e) => {
        e.stopPropagation();
        if (cancelModal) {
          return;
        }
        setPopupVisible(true);
      }}
    >
      <img
        className="rounded-md w-20 h-20 mr-4"
        src={item.storeService.service.thumbnail}
      ></img>
      <Box className="flex flex-col justify-center ">
        <Box className="flex items-start justify-between">
          <Text className="  font-bold">{item.storeService.service.name}</Text>
          {item.status === EBookingStatus.NOT_DONE && (
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                if (popupVisible) {
                  return;
                }
                setCancelModal(true);
              }}
            >
              Huỷ
            </Button>
          )}
        </Box>
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
      <Modal
        maskClosable={false}
        visible={popupVisible}
        title={`QR code đặt lịch #${item.id} `}
        onClose={(e) => {
          e.stopPropagation();
          setPopupVisible(false);
        }}
        verticalActions
      >
        <Box className="flex flex-col items-center">
          <img
            className="h-48 w-48 mb-2"
            src={`https://quickchart.io/qr?text=${item.id}`}
          />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setPopupVisible(false);
            }}
            fullWidth
          >
            Đóng
          </Button>
        </Box>
      </Modal>

      <Modal
        mask={true}
        maskClosable={false}
        visible={cancelModal}
        title={`Huỷ đặt lịch #${item.id} `}
        onClose={() => {
          setPopupVisible(false);
        }}
        description="Bạn đồng ý huỷ đặt lịch"
        actions={[
          {
            text: "Huỷ",
            onClick: (e) => {
              e.stopPropagation();
              setCancelModal(false);
            },
          },
          {
            highLight: true,
            text: "Đồng ý",
            onClick: (e) => {
              e.stopPropagation();
              cancelBooking();
              setCancelModal(false);
            },
          },
        ]}
      >
        <Box className="flex flex-col justify-center mt-2 ">
          <Text className="  font-bold">
            Dịch vụ {item.storeService.service.name}
          </Text>
          <Text className="mt-2 font-light">
            {item.storeService.store.name}
          </Text>
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
      </Modal>
    </Box>
  );
}

export default BookingItem;
