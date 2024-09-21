export type TDiscount = {
  id: number;
  voucher: string;
  createdAt: Date;
  discount: number;
  discountBy: string;
  public: boolean;
  active: boolean;
  thumbnail: string;
  desc: string;
  point: number;
  title: string;
  minPrice: number;
  maxPrice: number;
};
