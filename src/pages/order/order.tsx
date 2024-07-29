import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Header, Page, Tabs } from "zmp-ui";
import "./index.css";
import OrderList from "./order-list";
import { forceOrderUpdate, orderState } from "../../state/order-state";
import { EOrderStatus } from "../../constants";
import { ROUTES } from "../../routes";
type Props = {};

function Order({}: Props) {
  const navigate = useNavigate();
  const orderUpdate = useSetRecoilState(forceOrderUpdate);
  const [activeKey, setActiveKey] = useState("waiting");

  const orders = useRecoilValue(orderState);
  const orderWaiting = orders.filter(
    (item) => item.status === EOrderStatus.WAITING
  );
  const orderDelivering = orders.filter(
    (item) => item.status === EOrderStatus.DELIVERING
  );
  const orderDelivered = orders.filter(
    (item) => item.status === EOrderStatus.DELIVERED
  );
  const orderCancel = orders.filter(
    (item) => item.status === EOrderStatus.CANCEL
  );

  const forceUpdate = () => orderUpdate((n) => n + 1);

  const navigateToDetail = (id) => {
    navigate(ROUTES.ORDER_DETAIL(id));
  };
  useEffect(() => {
    forceUpdate();
  }, []);

  return (
    <Page className="bg-background w-full">
      <Header title="Lịch sử đặt hàng" showBackIcon={true} />
      <Tabs
        scrollable
        className="w-full  overflow-y-hidden h-[calc(100vh-100px)]"
        activeKey={activeKey}
        onTabClick={(key) => setActiveKey(key)}
      >
        <Tabs.Tab key="waiting" label="Chờ xác nhận">
          <OrderList orders={orderWaiting} />
        </Tabs.Tab>
        <Tabs.Tab key="delivering" label="Đang vận chuyển">
          <OrderList orders={orderDelivering} />
        </Tabs.Tab>
        <Tabs.Tab key="delivered" label="Đã giao hàng">
          <OrderList orders={orderDelivered} />
        </Tabs.Tab>
        <Tabs.Tab key="cancel" label="Đã huỷ">
          <OrderList orders={orderCancel} />
        </Tabs.Tab>
      </Tabs>
    </Page>
  );
}

export default Order;
