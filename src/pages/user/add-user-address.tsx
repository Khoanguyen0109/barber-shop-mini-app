import { Divider } from "components/divider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Box, Button, Header, Icon, Input, Page, Select } from "zmp-ui";

import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { addressesState, userState } from "state";
import supabase from "../../client/client";
import {
  districtState,
  provinceState,
  selectedDistrictId,
  selectedProvinceId,
  selectedWardId,
  wardState,
} from "../../state/address-state";
import { addressSelectedState } from "../../state/cart-state";
import ErrorText from "../../components/customize/ErrorText";
import { ROUTES } from "../../routes";
import AppInput from "../../components/input";
const { Option } = Select;

type Props = {};

const defaultValue = {
  name: "",
  phone: "",
  address: "",
  type: "home",
  province: "",
  district: "",
  ward: "",
};

function AddUserAddress({}: Props) {
  const navigate = useNavigate();
  useRecoilValue(provinceState);
  let [searchParams, setSearchParams] = useSearchParams();
  const routeFrom = searchParams.get("routeFrom");
  const provinces = useRecoilValue(provinceState);
  const setProvinceId = useSetRecoilState(selectedProvinceId);
  const districts = useRecoilValue(districtState);
  const setDistrictId = useSetRecoilState(selectedDistrictId);
  const wards = useRecoilValue(wardState);
  const setWardId = useSetRecoilState(selectedWardId);
  const refresh = useRecoilRefresher_UNSTABLE(addressesState);
  const user = useRecoilValue(userState);
  const [addressSelected, setAddressSelected] =
    useRecoilState(addressSelectedState);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: addressSelected || defaultValue,
  });
  const name = watch("name");
  const phone = watch("phone");
  const address = watch("address");
  const province = watch("province");
  const district = watch("district");
  const ward = watch("ward");
  const type = watch("type");

  useEffect(() => {
    if (addressSelected) {
      setProvinceId(addressSelected.province);
      setDistrictId(addressSelected.district);
      setWardId(addressSelected.ward);
      setTimeout(() => {
        reset(addressSelected);
      }, 500);
    }
  }, [addressSelected]);

  const navigateBack = () => {
    navigate({
      pathname: ROUTES.USER_ADDRESS,
      search: createSearchParams({
        routeFrom: routeFrom ?? "",
      }).toString(),
    });
  };
  const onSubmit = async (value) => {
    try {
      setLoading(true);

      if (addressSelected) {
        await supabase
          .from("user_addresses")
          .update(value)
          .eq("id", addressSelected.id);
      } else {
        const { error } = await supabase
          .from("user_addresses")
          .insert({ userId: user.id, ...value });
      }
      refresh();
      setProvinceId(null);
      setWardId(null);
      setDistrictId(null);

      navigateBack();
    } catch (error) {}
  };

  const getFieldName = (field: string) => {
    switch (field) {
      case "address":
        return "Địa chỉ";
      case "province":
        return "Tỉnh/Thành phố";
      case "district":
        return "Quận/Huyện";
      case "ward":
        return "Phường/Xã";
      case "phone":
        return "Số điện thoại";
      case "name":
        return "Tên người nhận";
      case "type":
        return "Loại";
      default:
        return "";
    }
  };

  const getErrorMessage = (field: string) => {
    if (errors[field]) {
      const name = getFieldName(field);
      if (errors[field]?.type === "required")
        return `${name} không được để trống`;
      return `${name} không hợp lệ`;
    }
    return "";
  };
  const label = addressSelected ? "Cập nhật địa chỉ" : " Thêm địa chỉ";

  return (
    <Page>
      <Header
        title={label}
        showBackIcon={true}
        onBackClick={() => {
          navigate(-1);
          setAddressSelected(null);
          reset(defaultValue);
        }}
      />

      <form className="p-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <AppInput
            placeholder={`Nhập ${getFieldName("phone")} `}
            label={getFieldName("phone")}
            type="number"
            value={phone}
            errorText={getErrorMessage("phone")}
            {...register("phone", { required: true })}
            status={errors?.phone ? "error" : "default"}
          />
        </Box>
        <Box mt={4}>
          <AppInput
            placeholder={`Nhập ${getFieldName("name")} `}
            label={getFieldName("name")}
            value={name}
            errorText={getErrorMessage("name")}
            {...register("name", { required: true })}
            status={errors?.name ? "error" : "default"}
          />
        </Box>
        <Box mt={4}>
          <AppInput
            label={getFieldName("address")}
            placeholder={`Nhập ${getFieldName("address")} `}
            errorText={getErrorMessage("address")}
            value={address}
            {...register("address", { required: true })}
            status={errors?.address ? "error" : "default"}
          />
        </Box>
        <Box mt={4}>
          <Select
            value={type}
            label={getFieldName("type")}
            defaultValue="home"
            {...register("type", { required: true })}
            onChange={(value) => {
              setValue("type", value, { shouldValidate: true });
            }}
            closeOnSelect={true}
          >
            <Option value="home" title="Nhà" />
            <Option value="work" title="Văn phòng" />
          </Select>
          <ErrorText
            show={Boolean(errors?.type)}
            errorText={getErrorMessage("type")}
          />
        </Box>
        <Box mt={4}>
          <Select
            value={province}
            label={getFieldName("province")}
            placeholder={`Nhập ${getFieldName("province")} `}
            defaultValue=""
            {...register("province", { required: "Tỉnh không hợp lệ" })}
            onChange={(value) => {
              setProvinceId(value);
              setDistrictId(null);
              setWardId(null);
              setValue("province", value, { shouldValidate: true });
              setValue("district", "", { shouldValidate: true });
              setValue("ward", "", { shouldValidate: true });
            }}
            closeOnSelect={true}
          >
            {addressSelected && provinces.length === 0 && (
              <Option
                value={addressSelected.province}
                title={addressSelected.province}
              />
            )}
            <Option value="" title="" disabled />
            {provinces.map((item) => (
              <Option key={item.name} value={item.name} title={item.name} />
            ))}
          </Select>
          <ErrorText
            show={Boolean(errors?.province)}
            errorText={getErrorMessage("province")}
          />
        </Box>
        <Box mt={4}>
          <Select
            {...register("district", { required: "Quận/Huyện không hợp lệ" })}
            value={district}
            label={getFieldName("district")}
            placeholder={`Nhập ${getFieldName("district")} `}
            defaultValue=""
            closeOnSelect={true}
            onChange={(value) => {
              setDistrictId(value);
              setWardId(null);
              setValue("district", value, { shouldValidate: true });
              setValue("ward", "", { shouldValidate: true });
            }}
          >
            <Option value="" title="" disabled />
            {districts.map((item) => (
              <Option key={item.name} value={item.name} title={item.name} />
            ))}
          </Select>
          <ErrorText
            show={Boolean(errors?.district)}
            errorText={getErrorMessage("district")}
          />
        </Box>
        <Box mt={4}>
          <Select
            {...register("ward", { required: "Phường/Xã không hợp lệ" })}
            value={ward}
            label={getFieldName("ward")}
            placeholder={`Nhập ${getFieldName("ward")} `}
            closeOnSelect={true}
            onChange={(value) => {
              setWardId(value);
              setValue("ward", value, { shouldValidate: true });
            }}
          >
            <Option value="" title="" disabled />
            {wards.map((item) => (
              <Option key={item.name} value={item.name} title={item.name} />
            ))}
          </Select>
          <ErrorText
            show={Boolean(errors?.ward)}
            errorText={getErrorMessage("ward")}
          />
        </Box>

        <Box className="m-8">
          <Divider />
        </Box>

        <Button
          loading={loading}
          htmlType="submit"
          suffixIcon={<Icon icon="zi-add-user" />}
        >
          {label}
        </Button>
      </form>
    </Page>
  );
}

export default AddUserAddress;
