import type { ProductResponse } from "@/models";
import { ProductResponseSchema, productResponseToProduct } from "@/models";

export const parseProduct = (prod: ProductResponse, index: number) => {
  try {
    const result = ProductResponseSchema.safeParse(prod);
    if (!result.success) {
      console.error(`Error parsing product at index ${index}: ${result.error}`);
      return null;
    }
    return productResponseToProduct(result.data);
  } catch (err) {
    console.error(`Error parsing product at index ${index}: ${err}`);
    return null;
  }
};
