import React from "react";
import { useRecoilValue } from "recoil";
import { Box, Grid, Header, Page } from "zmp-ui";
import { normalProductState, productsState } from "../../state/product-state";
import { ProductItem } from "../../components/product/item";

type Props = {};

function AllProduct({}: Props) {
  const product = useRecoilValue(normalProductState);
  return (
    <Page className="bg-white">
      <Header title="Mua hàng" showBackIcon />
      <Grid columnCount={2} columnSpace="8px" rowSpace="8px" className="p-4">
        {product.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </Grid>
    </Page>
  );
}

export default AllProduct;
