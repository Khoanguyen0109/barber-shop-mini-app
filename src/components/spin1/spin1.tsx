import React from "react";
import { Wheel, WheelDataType } from "react-custom-roulette";

type Props = {
  mustSpin: boolean;
  prizeNumber: number;
  onStopSpinning: () => void;
  data: WheelDataType[];
};

function Spin1({ mustSpin, prizeNumber, onStopSpinning, data }: Props) {
  const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#f9dd50"];
  const textColors = ["#FFFFFF"];
  const outerBorderColor = "#eeeeee";
  const outerBorderWidth = 10;
  const innerBorderColor = "white";
  const innerBorderWidth = 10;
  const innerRadius = 0;
  const radiusLineColor = "#eeeeee";
  const radiusLineWidth = 8;
  const fontFamily = "Nunito";
  const fontWeight = "bold";
  const fontSize = 20;
  const fontStyle = "normal";
  const textDistance = 60;
  const spinDuration = 1.0;
  return (
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={prizeNumber}
      data={data}
      backgroundColors={backgroundColors}
      textColors={textColors}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontStyle={fontStyle}
      outerBorderColor={outerBorderColor}
      outerBorderWidth={outerBorderWidth}
      innerRadius={innerRadius}
      innerBorderColor={innerBorderColor}
      innerBorderWidth={innerBorderWidth}
      radiusLineColor={radiusLineColor}
      radiusLineWidth={radiusLineWidth}
      spinDuration={spinDuration}
      startingOptionIndex={2}
      // perpendicularText
      textDistance={textDistance}
      onStopSpinning={onStopSpinning}
    />
  );
}

export default Spin1;
