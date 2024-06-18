import { getConfig } from "../utils/config";

export enum ERoles {
  SHIPPER = "shipper",
  CTV = "ctv",
}

export enum ECommissionRequest {
  WAITING = "waiting",
  DONE = "done",
  CANCEL = "cancel",
}

export enum EDiscountType {
  PERCENT = "percent",
  PRICE = "price",
}

export enum EPrizeStatus {
  Waiting = "waiting",
  Request = "request",
  Received = "received",
  Cancel = "cancel",
}

export enum EUserVoucherStatus {
  UNUSED = "unused",
  USED = "used",
}

export const PRIMARY_COLOR = getConfig((c) => c.template.primaryColor);
