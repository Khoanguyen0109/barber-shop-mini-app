import { ElasticTextarea } from "components/elastic-textarea";
import { ListRenderer } from "components/list-renderer";
import React, { FC, Suspense } from "react";
import { Box, Icon, Text } from "zmp-ui";

import { createSearchParams, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { ListItem } from "components/list-item";
import { getAddress } from "utils";

import { CiDiscount1 } from "react-icons/ci";
import { userState } from "../../state";
import {
  addressSelectedState,
  discountState,
  noteState,
} from "../../state/cart-state";
import { ROUTES } from "../../routes";

export const Delivery: FC = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [note, setNote] = useRecoilState(noteState);
  const [address, setAddressSelected] = useRecoilState(addressSelectedState);
  const discount = useRecoilValue(discountState);
  // const [customer, setCustomerSelected] = useRecoilState(customerSelectedState);

  const navigateFromCart = (route) => {
    navigate({
      pathname: route,
      search: createSearchParams({
        routeFrom: "cart",
      }).toString(),
    });
  };

  const navigateCTVUserAddress = () => {
    navigate({
      pathname: ROUTES.CTV_USER_LIST,
      search: createSearchParams({
        routeFrom: "cart",
      }).toString(),
    });
  };

  return (
    <Box className="space-y-1 mb-3 px-4 mt-2">
      <Text className="text-md font-bold mb-2 ">Hình thức nhận hàng</Text>

      <ListRenderer
        padding={2}
        items={[
          {
            left: <Icon icon="zi-location" className="my-auto" />,
            right: (
              <Suspense>
                <ListItem
                  onClick={() => navigateFromCart(ROUTES.USER_ADDRESS)}
                  title={address?.name ?? "Địa chỉ giao hàng"}
                  subtitle={
                    getAddress(address) ?? "Vui lòng chọn địa chỉ giao hàng"
                  }
                />
              </Suspense>
            ),
          },

          {
            left: <Icon icon="zi-check-circle" className="my-auto" />,
            right: (
              <ListItem
                onClick={() => navigateFromCart(ROUTES.USER_VOUCHER)}
                title={"Voucher"}
                subtitle={discount?.title || "Sử dụng voucher giảm giá"}
              />
            ),
          },
          {
            left: <Icon icon="zi-note" className="my-auto" />,
            right: (
              <Box flex>
                <ElasticTextarea
                  placeholder="Nhập ghi chú..."
                  className="border-none px-0 w-full focus:outline-none"
                  maxRows={4}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Box>
            ),
          },
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};
