import React from "react";
import { TOrder } from "types/order";
import { Box, Button, Text } from "zmp-ui";
import OrderStatus from "./order-status";
import { DisplayPrice } from "components/display/price";
import { useNavigate } from "react-router-dom";
import { Divider } from "components/divider";
import { formatDate } from "../../utils/date";
import { EOrderStatus } from "../../constants";
import { ROUTES } from "../../routes";
type Props = {
  item: TOrder;
  onOpenRating: (id: string) => void;
};

function OrderItem({ item, onOpenRating }: Props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(ROUTES.ORDER_DETAIL(item.id));
  };
  return (
    <Box
      className="rounded-lg bg-background m-3 cursor-pointer"
      onClick={onClick}
    >
      <Box className="flex justify-between py-3 pr-3 items-center">
        <OrderStatus status={item.status} />
        <Text className="text-slate-600">
          {formatDate(item.createdAt) || ""}
        </Text>
      </Box>

      <Box className="px-3 pb-4 mt-2 flex ">
        <img
          className="w-12 h-12 object-cover rounded-2xl mr-3"
          src={
            item?.orderDetails?.[0]?.product?.image ||
            "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8"
          }
        />
        <Box className="flex-1">
          <Text className="font-bold text-md mb-1">
            {item?.orderDetails[0]?.product.name || ""}
          </Text>
          <Box className="flex justify-between mt-2">
            <Text className=" text-md">
              <DisplayPrice>{item?.total || "0"}</DisplayPrice>
            </Text>
            <Text className="text-gray">
              {item.orderDetails.length} sản phẩm
            </Text>
          </Box>

          {/* <Divider size={32} className="border-b" /> */}
          {item.status === EOrderStatus.DELIVERED && (
            <Button
              className="float-right -m-2 mt-2"
              size="small"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onOpenRating(item.id);
              }}
            >
              Đánh giá sản phẩm
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default OrderItem;
