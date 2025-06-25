import { CategoryFilter, LoadingView } from "@/components";
import { useProducts } from "@/hooks/useProducts";
import type { Category } from "@/models";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "@/context";
import { useMemo } from "react";
import { ProductsList } from "@/components";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { AllCategory } from "@/models";
import styles from "./Products.module.css";

const PRODUCTS_LIMIT = 10;

export const Products = () => {
  const { categories } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const currentSlug = searchParams.get("category") ?? AllCategory.slug;

  const navigate = useNavigate();

  const currentCategory: Category | string =
    categories.find((cat) => cat.slug === currentSlug) ?? AllCategory.slug;

  const categoriesIdsToFetch: number[] = useMemo(
    () =>
      currentCategory === AllCategory.slug
        ? categories.map((cat) => cat.id)
        : [(currentCategory as Category).id],
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

  const handleCategoryChange = (catSlug: string) => {
    navigate(`${Paths.Products}?category=${catSlug}`);
  };

  return (
    <div className={styles.container}>
      <CategoryFilter
        categories={categories}
        onChange={handleCategoryChange}
        currentCategorySlug={currentSlug}
      />
      <ProductsList productsByCategory={prodsByCategory ?? []} />
    </div>
  );
};
