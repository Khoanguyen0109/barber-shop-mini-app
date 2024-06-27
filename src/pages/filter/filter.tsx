import React from "react";
import { useRecoilValue } from "recoil";
import { servicesSelector } from "../../state/product-state";
import { useNavigate } from "react-router-dom";
import { Box, Header, Page, Text } from "zmp-ui";
import ServiceFilterItem from "../../components/service-filter-item";

type Props = {};

function Filter({}: Props) {
  const navigate = useNavigate();
  const services = useRecoilValue(servicesSelector);
  return (
    <Page className="bg-white">
      <Header title="Bộ lọc" showBackIcon={true} />
      <Box className="p-4">
        <Text className="mb-4 text-lg font-bold">Chọn dịch vụ</Text>
        <Box className="flex flex-wrap">
          <ServiceFilterItem
            item={{
              id: 0,
              name: "Tất cả",
              image: "",
            }}
          />
          {services.map((item) => (
            <ServiceFilterItem item={item} />
          ))}
        </Box>
      </Box>
    </Page>
  );
}

export default Filter;
