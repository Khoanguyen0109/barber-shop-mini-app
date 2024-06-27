import React from "react";
import { TStore } from "../types/store";
import { Box, Icon, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedStoreState } from "../state/store";
import { ROUTES } from "../routes";

type Props = {
  store: TStore;
  clickAble: boolean;
};

function StoreItem({ store, clickAble = false }: Props) {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useRecoilState(selectedStoreState);

  const onItemClick = () => {
    if (clickAble) {
      setSelectedStore(store);
      setTimeout(() => {
        navigate(ROUTES.STORE_DETAIL(store.id));
      }, 300);
    }
  };
  return (
    <Box
      className="p-2 rounded-lg flex overflow-hidden shadow-lg items-center"
      onClick={onItemClick}
    >
      <img className="w-20 h-20 rounded-md mr-2" src={store.image} />
      <Box>
        <Text className="font-bold text-lg mb-2">{store.name}</Text>
        <Box className="flex">
          <Icon size={18} icon="zi-location" className="mr-1 text-orange-500" />
          <Text>{store.fullAddress}</Text>
        </Box>
      </Box>
    </Box>
  );
}

export default StoreItem;
