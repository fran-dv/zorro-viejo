import type { RawProductResponse } from "@/models";
import { ProductSchema, RawProductResponseSchema } from "@/models";

export const parseProduct = (prod: RawProductResponse, index: number) => {
  try {
    const result = RawProductResponseSchema.safeParse(prod);
    if (!result.success) {
      console.error(`Error parsing product at index ${index}: ${result.error}`);
      return null;
    }
    return ProductSchema.parse(result.data);
  } catch (err) {
    console.error(`Error parsing product at index ${index}: ${err}`);
    return null;
  }
};
