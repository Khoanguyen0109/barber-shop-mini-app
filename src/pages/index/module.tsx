import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";
import buy from "assets/buy-module.svg";
import buyPackage from "assets/buy-package.svg";
import spin from "assets/spin-module.svg";
import chat from "assets/chat-module.svg";
import { ROUTES } from "../../routes";
const Modules: FC = () => {
  const navigate = useNavigate();

  const modules = [
    {
      icon: buy,
      path: ROUTES.ALL_PRODUCT,
      name: "Mua hàng",
    },
    {
      icon: buyPackage,
      path: ROUTES.ALL_PACKAGE,
      name: "Mua gói",
    },
    {
      icon: spin,
      path: ROUTES.SPIN,
      name: "Vòng quay",
    },
    {
      icon: chat,
      path: ROUTES.CHAT_OA,
      name: "Zalo OA",
    },
  ];

  const onClickItem = (item) => {
    navigate(item.path);
  };

  return (
    <Box className="bg-white grid grid-cols-4 gap-4 p-4 mt-4">
      {modules.map((item, i) => (
        <div
          key={i}
          onClick={() => onClickItem(item)}
          className="flex flex-col space-y-2 items-center"
        >
          <img className="w-12 h-12" src={item.icon} />
          <Text size="xxSmall" className="text-gray">
            {item.name}
          </Text>
        </div>
      ))}
    </Box>
  );
};

export default Modules;
