import React from "react";
import { Text, useNavigate } from "zmp-ui";
import Prize from "../assets/prize.svg";
import Next from "../assets/next_button.svg";
import prizeBackground from "../assets/prize_background.png";

type Props = {};

function PrizeBottom({}: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full p-4 h-20 flex justify-between items-center bg-no-repeat bg-cover  "
      style={{
        backgroundImage: `url(${prizeBackground})`,
      }}
      onClick={() => {
        navigate("/prize-list");
      }}
    >
      <div className="flex items-center">
        <img src={Prize} alt="Prize" />
        <p className="ml-5 text-lg font-bold">Phần thưởng của bạn</p>
      </div>
      <img src={Next} alt="Prize" />
    </div>
  );
}

export default PrizeBottom;
