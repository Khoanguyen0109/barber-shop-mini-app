import React, { useMemo } from "react";
import prize from "assets/prize-item.svg";
import copy from "assets/copy-btn.svg";
import cloneDeep from "lodash/cloneDeep";

import supabase from "../../client/client";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../../state";
import { userPrizeListState } from "../../state/spin-state";
import useCustomSnackbar from "../../hook/useCustomSnackbar";
import { EPrizeStatus } from "../../constants";
import { TUserPrize } from "../../types/spint";
type Props = {
  item: TUserPrize;
};

function PrizeItem({ item }: Props) {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [prizeList, setPrizeList] = useRecoilState(userPrizeListState);

  const { status } = item;
  const { openSnackbar } = useCustomSnackbar();
  const label = useMemo(() => {
    switch (status) {
      case EPrizeStatus.Waiting:
        return "Chờ nhận quà";
      case EPrizeStatus.Request:
        return "Đang yêu cầu";
      case EPrizeStatus.Received:
        return "Đã nhận";
      case EPrizeStatus.Cancel:
        return "Huỷ";
      default:
        return "";
    }
  }, [status]);

  const color = useMemo(() => {
    switch (status) {
      case EPrizeStatus.Waiting:
        return "bg-yellow-400	";
      case EPrizeStatus.Request:
        return "bg-violet-400";
      case EPrizeStatus.Received:
        return "bg-green-500";
      case EPrizeStatus.Cancel:
        return "bg-red-400";
      default:
        return "";
    }
  }, [status]);

  const onItemClick = async () => {
    if (status === EPrizeStatus.Waiting || !status) {
      const res = await supabase
        .from("user_prizes")
        .update({ status: EPrizeStatus.Request })
        .eq("id", item.id)
        .select();
      const index = prizeList.findIndex((prize) => prize.id === item.id);
      const cloneList = cloneDeep(prizeList);

      cloneList[index].status = EPrizeStatus.Request;
      setPrizeList(cloneList);
      openSnackbar({
        text: "Yêu cầu đã được gửi ",
        type: "success",
        icon: true,
        duration: 2000,
      });
    }
  };
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl mb-6 shadow-lg">
      <div className="flex items-center">
        <img className="w-12 h-12" src={prize} />
        <div className="ml-2">
          <p className="text-lg font-bold">{item?.prizeName}</p>
          {label && (
            <div className={`mt-2  p-2 rounded-lg ${color}`}>
              <p className="text-sm text-white font-bold text-center ">
                {label ?? ""}
              </p>
            </div>
          )}
        </div>
      </div>

      {status === EPrizeStatus.Waiting && (
        <div onClick={onItemClick}>
          <img src={copy} className="cursor-pointer" />
        </div>
      )}
    </div>
  );
}

export default PrizeItem;
