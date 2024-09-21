import React from "react";
import { FC } from "react";
import { Box, Input, useNavigate } from "zmp-ui";
import { VscSettings } from "react-icons/vsc";
import { ROUTES } from "../../routes";

export const Inquiry: FC = () => {
  const navigate = useNavigate();
  return (
    <Box p={4} className="bg-white flex ">
      <Input.Search
        className="flex-1"
        onFocus={() => navigate(ROUTES.STORE_LIST)}
        placeholder="Tìm kiếm chi nhánh, dịch vụ"
      />
      {/* <Box
        className="p-2 ml-2 w-12 h-12 text-lg flex items-center justify-center bg-[#FF6602] text-white rounded-lg"
        onClick={() => navigate(ROUTES.FILTER_SERVICES)}
      >
        <VscSettings size={28} />
      </Box> */}
    </Box>
  );
};
