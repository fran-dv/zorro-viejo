import { CategoryFilter, LoadingView, SearchInterface } from "@/components";
import { useProducts } from "@/hooks/useProducts";
import type { Category, ProductsByCategory } from "@/models";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "@/context";
import { useEffect, useMemo, useState } from "react";
import { ProductsList, Pagination } from "@/components";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { AllCategory } from "@/models";
import styles from "./Products.module.css";
import { useMediaQuery } from "usehooks-ts";

export const Products = () => {
  const isDesktop = useMediaQuery("(min-width: 850px)");
  const PRODUCTS_LIMIT = isDesktop ? 12 : 8;
  const { categories } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const currentSlug = searchParams.get("category") ?? AllCategory.slug;
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
  }, [currentSlug]);

  useEffect(() => {
    const top = document.getElementById("products-top");
    top?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [page]);

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
    page: page,
  });

  if (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }

  if (!data && isFetching) {
    return <LoadingView message="Cargando productos..." />;
  }

  const prodsByCategory: ProductsByCategory[] | undefined = data?.map(
    (item) => {
      return {
        category: categories.find((cat) => cat.id === item.categoryId)!,
        products: item.products,
        count: item.count,
      };
    },
  );

  let pagesAmount = 0;
  if (
    currentCategory !== "all" &&
    prodsByCategory &&
    prodsByCategory.length > 0
  ) {
    const count = prodsByCategory[0].count;
    pagesAmount = Math.ceil(count / PRODUCTS_LIMIT);
  }

  const handleCategoryChange = (catSlug: string) => {
    navigate(`${Paths.Products}?category=${catSlug}`);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SearchInterface />
        <CategoryFilter
          categories={categories}
          onChange={handleCategoryChange}
          currentCategorySlug={currentSlug}
          className={styles.categoryFilter}
        />
      </div>

      <h1 id="products-top" className={styles.title}>
        {currentCategory === AllCategory.slug
          ? "Todos los productos"
          : (currentCategory as Category).name}
      </h1>
      {currentCategory !== AllCategory.slug && (
        <Pagination
          className={styles.pagination}
          selectedPage={page}
          onPageChange={handlePageChange}
          pagesAmount={pagesAmount}
        />
      )}
      <ProductsList
        productsByCategory={prodsByCategory ?? []}
        areProductsLoading={isFetching}
      />
      {currentCategory !== AllCategory.slug && (
        <Pagination
          className={styles.pagination}
          selectedPage={page}
          onPageChange={handlePageChange}
          pagesAmount={pagesAmount}
        />
      )}
    </div>
  );
};
