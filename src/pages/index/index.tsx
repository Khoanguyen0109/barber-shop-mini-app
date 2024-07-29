import React, { Suspense } from "react";
import { Box, Button, Page, Text } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { Welcome } from "./welcome";
import { Banner } from "./banner";
import { Categories } from "./categories";
import { Recommend } from "./recommend";
import { ProductList } from "./product-list";
import { Divider } from "components/divider";
import Modules from "./module";
import NewProductList from "./new-product-list";
import ServicesList from "./services";
import VoucherList from "./voucher-list";
import logo from "static/logo.png";
import { followOA } from "zmp-sdk";
import { OA_ID } from "../../enviroment";
import { useRecoilValue } from "recoil";
import { userState } from "../../state";

const HomePage: React.FunctionComponent = () => {
  const user = useRecoilValue(userState);
  const follow = async () => {
    try {
      await followOA({
        id: OA_ID,
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  console.log('user', user)
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <Banner />
        <Modules />

        {!user.followed && (
          <div className="py-2 mx-4 px-4 mt-2 border-[1px] border-orange-500 border-solid rounded-lg bg-[#ffeadc] ">
            <Text className="text-xs mb-3 font-semibold">
              Quan tâm OA để nhận thông tin về ưu đãi
            </Text>
            <Box className="flex justify-between items-center">
              <Box className="flex items-center">
                <img
                  src={logo}
                  className="bg-blue-800 h-8 w-8"
                  style={{
                    borderRadius: "100%",
                  }}
                />
                <Text className="text-sm font-semibold ml-1">
                  Đông tây Barbershop
                </Text>
              </Box>
              <Button size="small" onClick={follow}>
                Quan tâm
              </Button>
            </Box>
          </div>
        )}
        <Inquiry />
        <NewProductList />
        <ServicesList />
        <VoucherList />
      </Box>
    </Page>
  );
};

export default HomePage;
