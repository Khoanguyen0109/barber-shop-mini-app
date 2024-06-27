import React from "react";
import { Page } from "zmp-ui";
import prize from "assets/prize.svg";
import backgroundBackup from "assets/background2.png";

import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import {
  backGroundReceivedSelector,
  receivedPrizeState,
} from "../../state/spin-state";
import CustomButton from "../../components/button/button";
import PrizeBottom from "../../components/prize-bottom";

type Props = {};

function PrizePage({}: Props) {
  const navigate = useNavigate();
  const receivedPrize = useRecoilValue(receivedPrizeState);
  const background = useRecoilValue(backGroundReceivedSelector);
  return (
    <Page
      className="  bg-no-repeat bg-cover flex flex-col items-center !overflow-hidden bg-center"
      style={{ backgroundImage: `url(${background ?? backgroundBackup})` }}
    >
      <img className="w-56 h-56 mt-56" src={prize} />
      {/* <p className="text-white text-3xl mt-10">Phần thưởng của bạn là</p> */}

      <p className="text-white text-2xl text-center font-bold mt-6 mb-12">
        {receivedPrize?.name}
      </p>
      <CustomButton label="Quay tiếp" onClick={() => navigate("/")} />
      <div className="flex-1"> </div>

      <PrizeBottom />
    </Page>
  );
}

export default PrizePage;
