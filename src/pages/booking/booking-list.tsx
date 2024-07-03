import React from "react";
import { useRecoilValue } from "recoil";
import { Box, Header, Page, Tabs } from "zmp-ui";
import {
  doneBookingSelector,
  notDoneBookingSelector,
} from "../../state/booking-state";
import BookingItem from "../../components/booking-item";

type Props = {};

function BookingList({}: Props) {
  const doneBooking = useRecoilValue(doneBookingSelector);
  const notDoneBooking = useRecoilValue(notDoneBookingSelector);

  return (
    <Page className="bg-white">
      <Header title="Danh sách hoạt động" showBackIcon />
      <Box className="w-full overflow-hidden">
        <Tabs
          id="contact-list"
          className="w-full [&_zaui-tabs-tabbar]: justify-center overflow-hidden"
        >
          <Tabs.Tab key="tab2" label="Sắp diễn ra">
            <Box className="mt-4 px-4 overflow-y-auto">
              {notDoneBooking.map((item) => (
                <BookingItem item={item} />
              ))}
            </Box>
          </Tabs.Tab>
          <Tabs.Tab key="tab3" label="Đã xong">
            <Box className="mt-4 px-4 overflow-y-auto">
              {doneBooking.map((item) => (
                <BookingItem item={item} />
              ))}
            </Box>
          </Tabs.Tab>
        </Tabs>
      </Box>
    </Page>
  );
}

export default BookingList;
