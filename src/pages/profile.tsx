import React, { FC, useState } from "react";
import {
  Avatar,
  Box,
  Header,
  Icon,
  Input,
  Modal,
  Page,
  Progress,
  Select,
  Text,
} from "zmp-ui";
import { ListRenderer } from "components/list-renderer";
import { useToBeImplemented } from "hooks";
import { ROUTES } from "../routes";
import { useNavigate } from "react-router-dom";
import useCustomSnackbar from "../hook/useCustomSnackbar";
import { useRecoilValue } from "recoil";
import { userState, userTotalPointState } from "../state";
import supabase from "../client/client";
const { Option } = Select;
import Badge from "assets/badge.svg";
import PrimaryText from "../components/primaryText";
import bg from "assets/profile-bg.png";
import { nextPointSelector } from "../state/setting-state";

const Personal: FC = () => {
  const navigate = useNavigate();
  const navigateToOrder = () => {
    navigate(ROUTES.ORDER);
  };

  const navigateToUserAddress = () => {
    navigate(ROUTES.USER_ADDRESS);
  };
  return (
    <Box className="m-4">
      <ListRenderer
        title="Cá nhân"
        items={[
          {
            left: <Icon icon="zi-clock-2" />,
            right: (
              <Box flex onClick={navigateToOrder}>
                <Text.Header className="flex-1 items-center font-normal">
                  Lịch sử đơn hàng
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            left: <Icon icon="zi-check-circle" />,
            right: (
              <Box flex onClick={() => navigate(ROUTES.USER_VOUCHER)}>
                <Text.Header className="flex-1 items-center font-normal">
                  Ưu đãi của tôi
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
          {
            onClick: () => navigateToUserAddress(),
            left: <Icon icon="zi-home" />,
            right: (
              <Box flex onClick={navigateToUserAddress}>
                <Text.Header className="flex-1 items-center font-normal">
                  Địa chỉ
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};

const Other: FC = () => {
  const onClick = useToBeImplemented();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [issue, setIssue] = useState("Vấn đề về đơn hàng");
  const [note, setNote] = useState("");
  const { openSnackbar, setDownloadProgress, closeSnackbar } =
    useCustomSnackbar();
  const user = useRecoilValue(userState);
  const onChange = (e) => {
    setNote(e.target.value);
  };

  const submit = async () => {
    try {
      if (note === "") {
        return openSnackbar({
          text: "Vui lòng nhập ghi chú",
          type: "error",
          icon: true,
          duration: 1000,
        });
      }

      await supabase.from("feedbacks").insert({
        feedback: issue,
        note,
        userId: user.id,
      });
      setNote("");
      setDialogVisible(false);
      return openSnackbar({
        text: "Góp ý của bạn đã được gửi đi",
        type: "success",
        icon: true,
        duration: 2000,
      });
      // }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box className="m-4">
      <ListRenderer
        title="Khác"
        items={[
          {
            left: <Icon icon="zi-call" />,
            right: (
              <Box flex onClick={() => setDialogVisible(true)}>
                <Text.Header className="flex-1 items-center font-normal">
                  Liên hệ và góp ý
                </Text.Header>
                <Icon icon="zi-chevron-right" />
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
      <Modal
        visible={dialogVisible}
        title="Liện hệ & góp ý"
        actions={[
          {
            text: "Huỷ",
            onClick: () => {
              setNote("");
              setDialogVisible(false);
            },
          },
          {
            text: "Gửi",
            onClick: () => submit(),
            highLight: true,
          },
        ]}
      >
        <Select
          value={issue}
          placeholder="Vấn đề cần góp ý"
          onChange={(value) => setIssue(value)}
          closeOnSelect
        >
          <Option value="Vấn đề về đơn hàng" title="Vấn đề về đơn hàng" />
          <Option value="Vấn đề về sản phẩm" title="Vấn đề về sản phẩm" />
          <Option value="Vấn đề về dịch vụ" title="Vấn đề về dịch vụ" />
          <Option value="Khác" title="Khác" />
        </Select>
        <Box className="mb-3" />
        <Input.TextArea value={note} onChange={onChange} />
      </Modal>
    </Box>
  );
};

const ProfilePage: FC = () => {
  const user = useRecoilValue(userState);
  const userTotalPoint = useRecoilValue(userTotalPointState);
  const nextPoint = useRecoilValue(nextPointSelector);
  return (
    <Page className="relative bg-orange-500 text-white flex flex-col">
      <Header className="bg-orange-500 [&_*]:text-white " title="Thông tin" />
      <Box className="text-white p-4">
        <Box className="flex">
          <Avatar
            className="mr-4"
            size={18}
            src={user.avatar.startsWith("http") ? user.avatar : undefined}
          />
          <Box>
            <Text className="font-bold ml-2 mt-1">{user.name}</Text>
          </Box>
        </Box>
      </Box>
      <Box
        className="absolute text-black  top-36 w-3/4 border-2 border-solid border-orange-500 rounded-2xl left-14 p-4"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "contain",
        }}
      >
        <Box className="flex mb-6">
          <img src={Badge}></img>
          <Box className="ml-2">
            <PrimaryText className="font-bold">
              Thành viên {user?.memberClass || "Chưa có hạng"}
            </PrimaryText>
            <PrimaryText className="text-xs font-bold ">
              {userTotalPoint || 0}
            </PrimaryText>{" "}
          </Box>
        </Box>
        <Box>
          <Text className="text-xs mb-2">Để nâng lên thứ hạng tiếp theo</Text>
          <Box className="w-full flex text-center">
            <Box className="flex-1">
              <Text className="text-xs mb-1">Điểm tích luỹ</Text>
              <Text className="text-xs">
                {userTotalPoint}/{nextPoint}
              </Text>
              <Progress
                strokeColor="#FF6602"
                completed={userTotalPoint}
                maxCompleted={nextPoint}
                trailColor="#ECEFF2"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Subscription /> */}
      <Box className="bg-white text-black mt-40 pt-14 p-4 rounded-t-[60px] h-3/4">
        <Personal />
        <Other />
      </Box>
    </Page>
  );
};

export default ProfilePage;
