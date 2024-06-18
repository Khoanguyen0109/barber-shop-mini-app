import React from "react";
import { Text } from "zmp-ui";
import { PRIMARY_COLOR } from "../constants";

function PrimaryText({ children, ...rest }) {
  return (
    <Text
      {...rest}
      style={{
        color: PRIMARY_COLOR,
      }}
    >
      {children}
    </Text>
  );
}

export default PrimaryText;
