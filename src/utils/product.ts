import { createOrder } from "zmp-sdk";
import { Option, Product, TProduct } from "types/product";
import { getConfig } from "./config";
import { SelectedOptions } from "types/cart";
import { capitalize, isEqual } from "lodash";
import { TService } from "../types/services";

// export function calcFinalPrice(product: Product, options?: SelectedOptions) {
//   let finalPrice = product.price;
//   if (product.sale) {
//     if (product.sale.type === "fixed") {
//       finalPrice = product.price - product.sale.amount;
//     } else {
//       finalPrice = product.price * (1 - product.sale.percent);
//     }
//   }

//   if (options && product.variants) {
//     const selectedOptions: Option[] = [];
//     for (const variantKey in options) {
//       const variant = product.variants.find((v) => v.id === variantKey);
//       if (variant) {
//         const currentOption = options[variantKey];
//         if (typeof currentOption === "string") {
//           const selected = variant.options.find((o) => o.id === currentOption);
//           if (selected) {
//             selectedOptions.push(selected);
//           }
//         } else {
//           const selecteds = variant.options.filter((o) =>
//             currentOption.includes(o.id)
//           );
//           selectedOptions.push(...selecteds);
//         }
//       }
//     }
//     finalPrice = selectedOptions.reduce((price, option) => {
//       if (option.priceChange) {
//         if (option.priceChange.type == "fixed") {
//           return price + option.priceChange.amount;
//         } else {
//           return price + product.price * option.priceChange.percent;
//         }
//       }
//       return price;
//     }, finalPrice);
//   }
//   return finalPrice;
// }
export function calcFinalPrice(
  product: TProduct | TService,
  options?: SelectedOptions
) {
  let finalPrice = product.price;
  // const variant = findVariant(product, options);
  // if (variant) {
  //   return variant.price;
  // }
  // const totalOptionPrice = options
  //   ? Object.keys(options).reduce((acc, key) => acc + options[key].price, 0)
  //   : 0;
  const totalOptionPrice = options
    ? Object.keys(options).reduce((acc, key) => {
        const totalOption = options[key].reduce(
          (child, item) => child + item.price,
          0
        );
        return acc + totalOption;
      }, 0)
    : 0;
  return finalPrice + totalOptionPrice;
}

export function getDummyImage(filename: string) {
  return `https://stc-zmp.zadn.vn/templates/zaui-coffee/dummy/${filename}`;
}

export const isIdenticalV2 = (
  option1: SelectedOptions,
  option2: SelectedOptions
) => {
  return isEqual(JSON.stringify(option1), JSON.stringify(option2));
};

export function isIdentical(
  option1: SelectedOptions,
  option2: SelectedOptions
) {
  const option1Keys = Object.keys(option1);
  const option2Keys = Object.keys(option2);

  if (option1Keys.length !== option2Keys.length) {
    return false;
  }

  for (const key of option1Keys) {
    const option1Value = option1[key];
    const option2Value = option2[key];

    const areEqual =
      Array.isArray(option1Value) &&
      Array.isArray(option2Value) &&
      [...option1Value].sort().toString() ===
        [...option2Value].sort().toString();

    if (option1Value !== option2Value && !areEqual) {
      return false;
    }
  }

  return true;
}

const pay = (amount: number, callback: (data: any) => void) => {
  return createOrder({
    desc: `Thanh toán cho ${getConfig((config) => config.app.title)}`,
    item: [],
    amount: amount,
    success: (data) => {
      callback(data);
    },
    fail: (err) => {
      console.log("Payment error: ", err);
    },
  });
};
export default pay;

export const getOptionString = (options) => {
  if (!options) {
    return "";
  }
  let variants: string[] = [];
  for (const [key, value] of Object.entries(options)) {
    variants.push(
      `${capitalize(key.replace("_", ""))}: ${options[key]
        .map((item) => item.name)
        .join(",")}`
    );
  }
  return variants.join(". ");
};
