import React from "react";
import { useRecoilValue } from "recoil";
import { Grid, Header, Page } from "zmp-ui";
import { packageProductState } from "../../state/product-state";
import { ProductItem } from "../../components/product/item";

type Props = {};

function AllPackage({}: Props) {
  const product = useRecoilValue(packageProductState);

  return (
    <Page className="bg-white">
      <Header title="Mua gói" showBackIcon />
      <Grid columnCount={2} columnSpace="8px" rowSpace="8px" className="p-4">
        {product.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </Grid>
    </Page>
  );
}

export default AllPackage;
