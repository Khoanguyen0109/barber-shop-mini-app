import React from "react";
import "./styles.css";
type Props = {
  label: string;
  onClick: () => void;
};

function CustomButton({ label, onClick }: Props) {
  return (
    <button className="pushable" onClick={onClick}>
      <span className="front">{label}</span>
    </button>
  );
}

export default CustomButton;
