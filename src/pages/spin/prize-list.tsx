import React, { Suspense } from "react";
import { Page, Text, useNavigate } from "zmp-ui";
import backgroundBackup from "../assest/background3.png";
import backBtn from "../assest/back-btn.svg";

import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { openChat } from "zmp-sdk";
import LoadingScreenOverLay from "../../components/loading-screen";
import {
  backGroundPrizeSelector,
  userPrizeListState,
} from "../../state/spin-state";
import { OA_ID } from "../../enviroment";
import CustomButton from "../../components/button/button";
import PrizeItem from "../../components/prize-item/prize-item";
type Props = {};

const List = () => {
  const data = useRecoilValueLoadable(userPrizeListState);
  if (data.state === "loading") {
    return <LoadingScreenOverLay />;
  }
  return (
    <div
      className="mt-8 overflow-y-auto"
      style={{
        maxHeight: "100vh - 100px",
        scrollbarWidth: "none",
      }}
    >
      {data.contents.map((item) => (
        <PrizeItem key={item.id} item={item} />
      ))}
    </div>
  );
};

function PrizeList({}: Props) {
  const navigate = useNavigate();
  const background = useRecoilValue(backGroundPrizeSelector);

  const onGoBack = () => {
    navigate(-1);
  };
  const openChatScreen = async () => {
    try {
      await openChat({
        type: "oa",
        id: OA_ID,
        message: "Cần hổ trợ",
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  return (
    <Page
      className=" relative pt-12 p-4   bg-no-repeat bg-cover flex flex-col overflow-x-hidden"
      style={{ backgroundImage: `url(${background ?? backgroundBackup})` }}
    >
      <div className="flex items-center">
        <img src={backBtn} className=" cursor-pointer" onClick={onGoBack} />
        <Text.Title size="xLarge" className="text-white !font-bold ml-10">
          Danh sách phần thưởng
        </Text.Title>
      </div>
      <Suspense fallback={<LoadingScreenOverLay />}>
        <List />
      </Suspense>
      <div className="mb-24"></div>
      <div className="flex-1 "></div>
      <div className="absolute bottom-0 py-3 right-0 w-full flex justify-center items-center bg-white">
        <CustomButton
          label="Liên hệ OA"
          onClick={openChatScreen}
        ></CustomButton>
      </div>
    </Page>
  );
}

export default PrizeList;
