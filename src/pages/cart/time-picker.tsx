import React, { FC, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { displayDate, displayHalfAnHourTimeRange } from "utils/date";
import { matchStatusBarColor } from "utils/device";
import { Picker } from "zmp-ui";
import { selectTimeBookingState } from "../../state/booking-state";

export const TimePicker: FC = () => {
  const [date, setDate] = useState(+new Date());
  const [time, setTime] = useState(+new Date());
  const [deliveryTime, setDeliveryTime] = useRecoilState(
    selectTimeBookingState
  );

  const availableDates = useMemo(() => {
    const days: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      days.push(nextDay);
    }
    return days;
  }, []);

  const availableTimes = useMemo(() => {
    const times: Date[] = [];
    const now = new Date();
    let time = new Date();
    if (now.getDate() === new Date(date).getDate()) {
      // Starting time is the current time rounded up to the nearest 30 minutes
      const minutes = Math.ceil(now.getMinutes() / 30) * 30;
      time.setHours(now.getHours());
      time.setMinutes(minutes);
    } else {
      // Starting time is 7:00
      time.setHours(0);
      time.setMinutes(0);
    }
    time.setSeconds(0);
    time.setMilliseconds(0);
    const endTime = new Date();
    endTime.setHours(23);
    endTime.setMinutes(59);
    endTime.setSeconds(0);
    endTime.setMilliseconds(0);
    while (time <= endTime) {
      times.push(new Date(time));
      time.setMinutes(time.getMinutes() + 30);
    }
    return times;
  }, [date]);
  return (
    <Picker
      mask
      maskClosable
      onVisibilityChange={(visbile) => {
        matchStatusBarColor(visbile);
        if (!visbile) {
          const newDate = new Date(date);
          const hours = new Date(time).getHours();
          const minutes = new Date(time).getMinutes();
          newDate.setHours(hours);
          newDate.setMinutes(minutes);
          setDeliveryTime(newDate.getTime());
        }
      }}
      placeholder="Chọn thời gian đặt lịch"
      title="Thời gian đặt lịch"
      value={{
        date,
        time: availableTimes.find((t) => +t === time)
          ? time
          : +availableTimes[0],
      }}
      formatPickedValueDisplay={({ date, time }) =>
        date && time
          ? `${displayHalfAnHourTimeRange(new Date(time.value))}, ${displayDate(
              new Date(date.value)
            )}`
          : `Chọn thời gian`
      }
      onChange={({ date, time }) => {
        if (date) {
          setDate(+date.value);
        }
        if (time) {
          setTime(+time.value);
        }
      }}
      data={[
        {
          options: availableDates.map((date, i) => ({
            displayName: displayDate(date, true),
            value: +date,
          })),
          name: "date",
        },
        {
          options: availableTimes.map((time, i) => ({
            displayName: displayHalfAnHourTimeRange(time),
            value: +time,
          })),
          name: "time",
        },
      ]}
    />
  );
};
