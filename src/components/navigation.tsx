import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";
import { CartIcon } from "./cart-icon";
import { RiHome3Fill } from "react-icons/ri";
import { RiHome3Line } from "react-icons/ri";
import { RiShoppingCart2Line } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { PRIMARY_COLOR } from "../constants";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import useCustomSnackbar from "../hook/useCustomSnackbar";
import { useRecoilValue } from "recoil";
import { cartState } from "../state/cart-state";
import { ROUTES } from "../routes";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <RiHome3Line />,
    activeIcon: <RiHome3Fill color={PRIMARY_COLOR} />,
  },
  "/cart": {
    label: "Giỏ hàng",
    icon: <CartIcon />,
    activeIcon: <CartIcon active />,
  },
  "/booking-list": {
    label: "Lịch hẹn",
    icon: <RiCalendarScheduleLine />,
    activeIcon: <RiCalendarScheduleFill color={PRIMARY_COLOR} />,
  },
  "/profile": {
    label: "Tài khoản",
    icon: <MdOutlineAccountCircle />,
    activeIcon: <MdAccountCircle color={PRIMARY_COLOR} />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = [
  "/search",
  "/category",
  "/result",
  "/payment-success",
  "/verify-booking",
];

export const Navigation: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKeys>("/");
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();
  const { openSnackbar } = useCustomSnackbar();
  const cart = useRecoilValue(cartState);

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (noBottomNav || keyboardVisible) {
    return <></>;
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={activeTab}
      onChange={(key: TabKeys) => setActiveTab(key)}
      className="z-50"
    >
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
          onClick={() => {
            if (path === ROUTES.CART && cart.length < 1) {
              return openSnackbar({
                text: "Chưa có sản phẩm trong giỏ hàng",
                duration: 1000,
              });
            }
            return navigate(path);
          }}
        />
      ))}
    </BottomNavigation>
  );
};
