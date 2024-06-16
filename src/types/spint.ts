export type TCampaign = {
  id: string;
  name: string;
  spinTimes: number;
  typeOfSpin: string;
  prizes: TPrize[];
};

export type TUserPrize = {
  id: number;
  OAId: string;
  prizeId: string;
  prizeName: string;
  campaignId: string;
  campaignName: string;
  status: string;
};

export type TPrize = {
  campaignId: string;
  campaignName: string;
  id: string;
  name: string;
  image: string;
  percent: number;
};
