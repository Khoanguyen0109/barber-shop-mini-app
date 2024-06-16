import React from "react";
import { Page, Text, Avatar } from "zmp-ui";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";

import backgroundBackup from "../assest/background1.png";
import isEmpty from "lodash/isEmpty";
import PrizeBottom from "../../components/prize-bottom";
import LoadingScreenOverLay from "../../components/loading-screen";
import { userState } from "../../state";
import { backGroundSelector, campaignSelector } from "../../state/spin-state";
import Spin from "./spin";
const SpinPage: React.FunctionComponent = () => {
  const background = useRecoilValueLoadable(backGroundSelector);
  const campaign = useRecoilValueLoadable(campaignSelector);
  const user = useRecoilValue(userState);

  if (campaign.state === "loading" || background.state === "loading") {
    return <LoadingScreenOverLay />;
  }
  if (
    campaign.state === "hasError" ||
    isEmpty(campaign) ||
    campaign?.contents?.prizes?.length === 0
  ) {
    return (
      <Page
        className="  bg-no-repeat bg-cover flex flex-col !overflow-hidden bg-center"
        style={{
          backgroundImage: `url(${background.contents || backgroundBackup})`,
        }}
      >
        <div className=" mt-80 p-4 pt-0 flex justify-between items-end w-full ">
          <p className=" text-3xl text-center font-bold ">
            Hiện tại không có vòng quay
          </p>
        </div>
      </Page>
    );
  }
  return (
    <Page
      className="  bg-no-repeat bg-cover flex flex-col !overflow-hidden bg-center"
      style={{
        backgroundImage: `url(${background.contents || backgroundBackup})`,
      }}
    >
      <div className=" p-4 pt-0 flex justify-between items-end w-full ">
        <div>
          {user ? (
            <div className="flex items-center flex-1 justify-end ">
              <Avatar
                size={32}
                src={user.avatar.startsWith("http") ? user.avatar : undefined}
              />
              <p className="text-white font-bold text-xs ml-2">{user.name}</p>
            </div>
          ) : (
            <Text>...</Text>
          )}
        </div>
      </div>
      <Spin />
      <div className="flex-1 "></div>

      {user && <PrizeBottom />}
    </Page>
  );
};

export default SpinPage;
