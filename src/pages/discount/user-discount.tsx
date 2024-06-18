import React from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { Box, Header, Page, Text } from "zmp-ui";

import { useNavigate, useSearchParams } from "react-router-dom";
import { publicDiscountSelector, userVouchersState } from "../../state/discount-state";
import { discountState, voucherSelectedState } from "../../state/cart-state";
import DiscountItem from "../../components/discount-item";
import { ROUTES } from "../../routes";

type Props = {};

function UserDiscount({}: Props) {
  const navigate = useNavigate();
  const userVoucherList = useRecoilValue(userVouchersState);
  const publicVoucher = useRecoilValue(publicDiscountSelector);
  const [voucherSelected, setVoucherSelected] =
    useRecoilState(voucherSelectedState);
  let [searchParams, setSearchParams] = useSearchParams();
  const routeFrom = searchParams.get("routeFrom");
  const isRouteFromCart = searchParams.get("routeFrom") === "cart";
  const [discount, setDiscount] = useRecoilState(discountState);

  const onChoose = (item) => {
    if (isRouteFromCart) {
      setDiscount(item);
      navigate(ROUTES.CART);
    }
  };
  const onBack = () => {
    if (isRouteFromCart) {
      navigate(ROUTES.CART);
    } else {
      navigate(-1);
    }
  };

  return (
    <Page>
      <Header title="Ưu đãi của tôi" showBackIcon={true} onBackClick={onBack} />
      <Box className="p-2 mt-4">
        {userVoucherList?.map((item) => (
          <DiscountItem
            key={item.id}
            item={item.discounts}
            onChoose={isRouteFromCart ? onChoose : undefined}
            onUpdateItem={() => {
              setVoucherSelected(item);
            }}
          />
        ))}
      </Box>
      {isRouteFromCart && publicVoucher.length > 0 && (
        <Box className="p-2 mt-4">
          <Text className="font-bold mb-3">Mã khuyến mãi của cửa hàng</Text>
          {publicVoucher.map((item) => (
            <DiscountItem key={item.id} item={item} onChoose={onChoose} />
          ))}
        </Box>
      )}
    </Page>
  );
}

export default UserDiscount;
