import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Box, Button, Input, Text } from "zmp-ui";
import supabase from "../../client/client";
import { discountState } from "../../state/cart-state";
import useCustomSnackbar from "../../hook/useCustomSnackbar";

type Props = {};

function Discount({}: Props) {
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useRecoilState(discountState);
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    const { value } = e.target;
    if (!value) {
      setDiscount(null);
      1;
    }
    setVoucher(value);
  };
  const { openSnackbar } = useCustomSnackbar();

  const onSubmitVoucher = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from("discounts")
        .select()
        .eq("voucher", voucher);
      if (data?.length > 0) {
        setDiscount(data[0]);
        openSnackbar({
          text: "Mã giảm giá đã áp dụng",
          type: "success",
          icon: true,
          duration: 2000,
        });
        return data[0];
      } else {
        setDiscount(null);
        openSnackbar({
          text: "Mã giảm giá không hợp lệ",
          type: "error",
          icon: true,
          duration: 2000,
        });
      }
    } catch (error) {
      setDiscount(null);

      return openSnackbar({
        text: "Mã giảm giá sai hoặc hết hạn",
        type: "error",
        icon: true,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box className="px-2 ">
      <Text className="text-md font-bold mb-1">Mã khuyến mãi</Text>
      <Box className="flex items-center justify-between mt-2">
        <Input
          placeholder="Nhập voucher giảm giá"
          className=" w-52 mr-2"
          value={voucher}
          onChange={onChange}
        ></Input>
        <Button
          loading={loading}
          disabled={!voucher}
          size="small"
          className="w-24"
          onClick={onSubmitVoucher}
        >
          Áp dụng
        </Button>
      </Box>
    </Box>
  );
}

export default Discount;
