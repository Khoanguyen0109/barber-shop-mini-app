import React from "react";
import { useRecoilValue } from "recoil";
import { selectedStoreState, storeServicesSelector } from "../../state/store";
import StoreItem from "../../components/store-item";
import { Header, Page } from "zmp-ui";
import NotFound from "../error/not-found";

type Props = {};

function StoreDetail({}: Props) {
  const selectedStore = useRecoilValue(selectedStoreState);
  const storeServices = useRecoilValue(storeServicesSelector);

  if (!selectedStore) {
    return <NotFound />;
  }

  return (
    <Page>
      <Header title={selectedStore.name} showBackIcon={true} />
      <StoreItem store={selectedStore} clickAble={false} />
    </Page>
  );
}

export default StoreDetail;
