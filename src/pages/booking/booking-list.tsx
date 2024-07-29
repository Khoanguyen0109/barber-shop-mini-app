import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Header, Page, Tabs } from "zmp-ui";
import {
  cancelBookingSelector,
  doneBookingSelector,
  notDoneBookingSelector,
} from "../../state/booking-state";
import BookingItem from "../../components/booking-item";

type Props = {};

function BookingList({}: Props) {
  const doneBooking = useRecoilValue(doneBookingSelector);
  const notDoneBooking = useRecoilValue(notDoneBookingSelector);
  const cancelBooking = useRecoilValue(cancelBookingSelector);

  const [activeKey, setActiveKey] = useState("notBooking");
  return (
    <Page className="bg-white">
      <Header title="Danh sách hoạt động" showBackIcon />
      <Box className="w-screen overflow-hidden">
        <Tabs
          scrollable
          className="w-full  overflow-y-hidden h-[calc(100vh-100px)]"
          activeKey={activeKey}
          onTabClick={(key) => setActiveKey(key)}
        >
          <Tabs.Tab key="notBooking" label="Sắp diễn ra">
            <Box className="mt-4 px-4 overflow-y-auto h-[calc(100vh-150px)]">
              {notDoneBooking.map((item) => (
                <BookingItem item={item} />
              ))}
            </Box>
          </Tabs.Tab>
          <Tabs.Tab key="doneBooking" label="Đã xong">
            <Box className="mt-4 px-4 overflow-y-auto h-[calc(100vh-150px)]">
              {doneBooking.map((item) => (
                <BookingItem key={item.id} item={item} />
              ))}
            </Box>
          </Tabs.Tab>

          <Tabs.Tab key="cancelBooking" label="Đã huỷ">
            <Box className="mt-4 px-4 overflow-y-auto h-[calc(100vh-150px)]">
              {cancelBooking.map((item) => (
                <BookingItem key={item.id} item={item} />
              ))}
            </Box>
          </Tabs.Tab>
        </Tabs>
      </Box>
    </Page>
  );
}

export default BookingList;
