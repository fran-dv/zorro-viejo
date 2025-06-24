import { LoadingView } from "@/components";
import { useProducts } from "@/hooks/useProducts";
import type { Category } from "@/models";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "@/context";
import { useMemo } from "react";
import { ProductsList } from "@/components";

const PRODUCTS_LIMIT = 10;

export const Products = () => {
  const { categories } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const currentSlug = searchParams.get("category");
  const currentCategory: Category | "all" =
    categories.find((cat) => cat.slug === currentSlug) ?? "all";

  const categoriesIdsToFetch: number[] = useMemo(
    () =>
      currentCategory === "all"
        ? categories.map((cat) => cat.id)
        : [currentCategory.id],
    [currentCategory, categories],
  );

  const { data, error, isFetching } = useProducts({
    limitPerCategory: PRODUCTS_LIMIT,
    categoriesIds: categoriesIdsToFetch,
  });

  if (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }

  if (!data && isFetching) {
    return <LoadingView message="Cargando productos..." />;
  }

  const prodsByCategory = data?.map((item) => {
    return {
      category: categories.find((cat) => cat.id === item.categoryId)!,
      products: item.products,
    };
  });

  return (
    <div>
      <ProductsList productsByCategory={prodsByCategory ?? []} />
    </div>
  );
};
