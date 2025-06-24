import {
  ProductResponseSchema,
  productResponseToProduct,
  type Product,
  type ProductResponse,
} from "@/models";
import { supabase, Tables } from "@/api";

interface FetchOpts {
  limitPerCategory: number;
  categoriesIds: number[];
}

interface CategoryProducts {
  categoryId: number;
  products: Product[];
}

type ProductsByCategory = CategoryProducts[];

const parseProduct = (prod: ProductResponse, index: number) => {
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

export const fetchProducts = async ({
  limitPerCategory,
  categoriesIds,
}: FetchOpts): Promise<ProductsByCategory> => {
  const promises = categoriesIds.map(async (id) => {
    const { data, error } = await supabase
      .from(Tables.Products)
      .select()
      .eq("category_id", id)
      .limit(limitPerCategory);

    if (error) {
      throw new Error(`Network error: ${error.message}`);
    }

    const products = Array.isArray(data) ? data : [data];
    const localProducts = products
      .map((prod, i) => parseProduct(prod, i))
      .filter(Boolean) as Product[];

    return { categoryId: id, products: localProducts };
  });

  return await Promise.all(promises);
};
