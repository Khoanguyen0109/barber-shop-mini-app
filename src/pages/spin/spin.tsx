import React, { Suspense, useEffect, useState } from "react";

import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { useNavigate } from "react-router-dom";
import { authorize, getUserInfo } from "zmp-sdk";
import { userState } from "../../state";
import {
  campaignSelector,
  canSpinSelector,
  receivedPrizeState,
  userPrizeState,
  wheelDataState,
} from "../../state/spin-state";
import { TPrize } from "../../types/spint";
import { EPrizeStatus } from "../../constants";
import supabase from "../../client/client";
import Spin1 from "../../components/spin1/spin1";
import CustomButton from "../../components/button/button";

function Spin() {
  const canSpin = useRecoilValueLoadable(canSpinSelector);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const data = useRecoilValue(wheelDataState);
  const [mustSpin, setMustSpin] = useState(false);
  const campaign = useRecoilValueLoadable(campaignSelector);
  const setUserPrize = useSetRecoilState(userPrizeState);
  const [receivedPrize, setReceivedPrize] = useRecoilState<TPrize | null>(
    receivedPrizeState
  );

  const [prizeNumber, setPrizeNumber] = useState(0);
  const handleSpinClick = async () => {
    if (user) {
      onSpin(user);
    } else {
      try {
        await authorize({
          scopes: ["scope.userInfo"],
        });
        const { userInfo } = await getUserInfo();
        // // const currentUser = { ...userInfo };
        onSpin(user);
      } catch (error) {}
    }
  };

  const onSpin = async (userInfo) => {
    const currentUser = userInfo;
    if (!mustSpin) {
      setMustSpin(true);

      const totalProbability = campaign.contents.prizes.reduce(
        (acc, option) => acc + option.percent / 100,
        0
      );
      const random = Math.random() * totalProbability;
      let cumulativeProbability = 0;
      let payload = {};
      for (let i = 0; i < campaign.contents.prizes.length; i++) {
        const option = campaign.contents.prizes[i];
        cumulativeProbability += campaign.contents.prizes[i].percent / 100;
        if (random <= cumulativeProbability) {
          setReceivedPrize(option);
          setPrizeNumber(i);
          payload = {
            OAId: currentUser.id,
            prizeId: option.id,
            prizeName: option.name,
            campaignId: campaign.contents.id,
            campaignName: campaign.contents.name,
          };
          break;
        }
      }

      await supabase.from("user_prizes").insert({
        prizeId: payload.prizeId,
        prizeName: payload.prizeName,
        userId: user.id,
        campaignId: payload.campaignId,
        campaignName: payload.campaignName,
        status: EPrizeStatus.Waiting,
      });
    }
  };

  const onStopSpinning = () => {
    setMustSpin(false);
    if (receivedPrize) {
      const newPayload = {
        id: user.id,
        prizeId: receivedPrize.id,
        prizeName: receivedPrize.name,
        campaignId: campaign.contents.id,
        campaignName: campaign.contents.name,
      };
      setUserPrize(newPayload);

      navigate("/prize");
    }
  };

  return canSpin.contents ? (
    <div className="h-full flex flex-col  items-center">
      <div className="mt-40"></div>
      {
        <Spin1
          mustSpin={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={onStopSpinning}
        />
      }

      <div className="m-12 mb-0 mt-16">
        <CustomButton label="Quay" onClick={handleSpinClick} />
      </div>
    </div>
  ) : (
    !mustSpin && (
      <div className="h-3/5 flex justify-center items-center ">
        <p className="text-white text-3xl font-bold ">Bạn đã hết lượt xoay</p>
      </div>
    )
  );
}

export default Spin;
