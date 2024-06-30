import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import { Navigation } from "./navigation";
import HomePage from "pages/index";
import CategoryPage from "pages/category";
import CartPage from "pages/cart";
import NotificationPage from "pages/notification";
import ProfilePage from "pages/profile";
import SearchPage from "pages/search";
import CheckoutResultPage from "pages/result";
import { getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";
import { useHandlePayment } from "hooks";
import { ROUTES } from "../routes";
import UserAddress from "../pages/user/user-address";
import AddUserAddress from "../pages/user/add-user-address";
import OpenChat from "../pages/chat";
import ProductDetail from "../pages/product/product-detail";
import OrderDetail from "../pages/order/order-detail";
import Order from "../pages/order/order";
import UserDiscount from "../pages/discount/user-discount";
import NotFound from "../pages/error/not-found";
import DiscountList from "../pages/discount/discount-list";
import AllProduct from "../pages/product/all-product";
import AllPackage from "../pages/product/all-package";
import PaymentSuccess from "../pages/payment/payment-success";
import Stores from "../pages/stores/stores";
import SpinPage from "../pages/spin/spin-page";
import PrizePage from "../pages/spin/prize";
import PrizeList from "../pages/spin/prize-list";
import Filter from "../pages/filter/filter";
import StoreDetail from "../pages/stores/store-detail";
import Booking from "../pages/booking/booking";
import VerifyBooking from "../pages/booking/verify-booking";

if (getSystemInfo().platform === "android") {
  const androidSafeTop = Math.round(
    (window as any).ZaloJavaScriptInterface.getStatusBarHeight() /
      window.devicePixelRatio
  );
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  useHandlePayment();

  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />}></Route>

          <Route path={ROUTES.CART} element={<CartPage />}></Route>
          <Route path={ROUTES.PROFILE} element={<ProfilePage />}></Route>
          <Route path={ROUTES.USER_ADDRESS} element={<UserAddress />}></Route>
          <Route path={ROUTES.ALL_PRODUCT} element={<AllProduct />}></Route>
          <Route path={ROUTES.ALL_PACKAGE} element={<AllPackage />}></Route>

          <Route
            path={ROUTES.USER_ADDRESS_ADD}
            element={<AddUserAddress />}
          ></Route>
          <Route path={ROUTES.CHAT_OA} element={<OpenChat />}></Route>
          <Route
            path={ROUTES.PRODUCT_DETAIL(":id")}
            element={<ProductDetail />}
          ></Route>
          <Route path={ROUTES.ORDER} element={<Order />}></Route>
          <Route
            path={ROUTES.ORDER_DETAIL(":id")}
            element={<OrderDetail />}
          ></Route>
          <Route path={ROUTES.BUY_VOUCHER} element={<DiscountList />}></Route>
          <Route path={ROUTES.USER_VOUCHER} element={<UserDiscount />}></Route>
          <Route
            path={ROUTES.PAYMENT_SUCCESS}
            element={<PaymentSuccess />}
          ></Route>
          <Route path={ROUTES.SPIN} element={<SpinPage />}></Route>
          <Route path={ROUTES.PRIZE} element={<PrizePage></PrizePage>}></Route>

          <Route
            path={ROUTES.PRIZE_LIST}
            element={<PrizeList></PrizeList>}
          ></Route>
          <Route path={ROUTES.FILTER_SERVICES} element={<Filter />}></Route>
          <Route path={ROUTES.BOOKING} element={<Booking />}></Route>
          <Route
            path={ROUTES.VERIFY_BOOKING}
            element={<VerifyBooking />}
          ></Route>

          <Route path={ROUTES.STORE_LIST} element={<Stores />}></Route>
          <Route
            path={ROUTES.STORE_DETAIL(":id")}
            element={<StoreDetail />}
          ></Route>

          <Route path={ROUTES.NOT_FOUND} element={<NotFound />}></Route>
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};
