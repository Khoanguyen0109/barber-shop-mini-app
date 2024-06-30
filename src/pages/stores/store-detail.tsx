import React, { useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedStoreState, storeServicesSelector } from "../../state/store";
import StoreItem from "../../components/store-item";
import { Box, Grid, Header, Page } from "zmp-ui";
import NotFound from "../error/not-found";
import ServiceFilterItem from "../../components/service-filter-item";
import ServiceItem from "../../components/service-item";
import { selectServiceBookingState } from "../../state/booking-state";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

function StoreDetail() {
  const navigate = useNavigate();
  const selectedStore = useRecoilValue(selectedStoreState);
  const [selectServiceBooking, setSelectServiceBooking] = useRecoilState(
    selectServiceBookingState
  );

  const storeServices = useRecoilValue(storeServicesSelector);
  const [serviceSelected, setServiceSelected] = useState([]);
  if (!selectedStore) {
    return <NotFound />;
  }
  const services = storeServices?.storeServices || [];
  const filterServices = useMemo(() => {
    if (serviceSelected.length === 0) {
      return services;
    } else {
      const filters = services.filter((item) =>
        serviceSelected.find((selected) => selected.id === item.serviceId)
      );
      return filters;
    }
  }, [services, serviceSelected]);
  const onItemClick = (item, isActive) => {
    if (isActive) {
      setServiceSelected(serviceSelected.filter((ser) => ser.id !== item.id));
    } else {
      setServiceSelected([...serviceSelected, item]);
    }
  };

  const onSelectAll = () => {
    setServiceSelected([]);
  };

  const onServiceItemClick = (item) => {
    setSelectServiceBooking(item);
    setTimeout(() => {
      navigate(ROUTES.BOOKING);
    });
  };

  return (
    <Page className="bg-white">
      <Header title={selectedStore.name} showBackIcon={true} />
      <Box className="p-4">
        <StoreItem store={selectedStore} clickAble={false} />
        <Box className="flex flex-wrap mt-4 mb-4">
          <ServiceFilterItem
            item={{
              id: 0,
              name: "Tất cả",
              thumbnail: "",
              price: 0,
            }}
            isActive={serviceSelected.length === 0}
            onItemClick={onSelectAll}
          />
          {services.map((item) => {
            const isActive = Boolean(
              serviceSelected.find((ser) => ser.id === item.serviceId)
            );
            return (
              <ServiceFilterItem
                isActive={isActive}
                item={item.services}
                onItemClick={onItemClick}
              />
            );
          })}
        </Box>

        <Grid columnCount={2} columnSpace="8px" rowSpace="8px">
          {filterServices.map((item) => (
            <ServiceItem
              key={item.id}
              item={{ ...item.services, price: item.price }}
              onClick={onServiceItemClick}
            />
          ))}
        </Grid>
      </Box>
    </Page>
  );
}

export default StoreDetail;
