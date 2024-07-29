import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Box, Header, Page, Text } from "zmp-ui";
import ServiceFilterItem from "../../components/service-filter-item";
import { selectedServiceState, servicesSelector } from "../../state/services-state";

type Props = {};

function Filter({}: Props) {
  const navigate = useNavigate();
  const services = useRecoilValue(servicesSelector);

  const [selectedServices, setSelectedServices] =
    useRecoilState(selectedServiceState);
  const onItemClick = (item, isActive) => {
    if (isActive) {
      setSelectedServices(selectedServices.filter((ser) => ser.id !== item.id));
    } else {
      setSelectedServices([...selectedServices, item]);
    }
  };

  const onSelectAll = () => {
    setSelectedServices([]);
  };
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
              thumbnail: "",
              price: 0,
            }}
            isActive={selectedServices.length === 0}
            onItemClick={onSelectAll}
          />
          {services.map((item) => {
            const isActive = Boolean(
              selectedServices.find((ser) => ser.id === item.id)
            );

            return (
              <ServiceFilterItem
                isActive={isActive}
                key={item.id}
                item={item}
                onItemClick={onItemClick}
              />
            );
          })}
        </Box>
      </Box>
    </Page>
  );
}

export default Filter;
