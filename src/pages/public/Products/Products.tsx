import {
  CategoryFilter,
  LoadingView,
  SearchInterface,
  StickyFooterBar,
} from "@/components";
import { useProducts } from "@/hooks/useProducts";
import type { Category, ProductsByCategory } from "@/models";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "@/context";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProductsList, Pagination } from "@/components";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { AllCategory } from "@/models";
import styles from "./Products.module.css";
import { useMediaQuery } from "usehooks-ts";
import { useHideOnFooter } from "@/hooks";
import { ErrorFetching } from "@/components/Errors";

export const Products = () => {
  const isDesktop = useMediaQuery("(min-width: 850px)");
  const PRODUCTS_LIMIT = isDesktop ? 12 : 8;
  const {
    categories,
    isFetchingCategories,
    refetchCategories,
    errorFetchingCategories,
  } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const currentSlug = searchParams.get("category") ?? AllCategory.slug;
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { isFooterVisible } = useHideOnFooter();

  useEffect(() => {
    setPage(1);
  }, [currentSlug]);

  const topOfPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topOfPageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

  const { data, isFetching, isLoading, isError, refetch } = useProducts({
    limitPerCategory: PRODUCTS_LIMIT,
    categoriesIds: categoriesIdsToFetch,
    page: page,
  });

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
    <div className={styles.container} ref={topOfPageRef}>
      <div className={styles.header}>
        {isDesktop && <SearchInterface />}
        {categories.length < 2 && errorFetchingCategories ? (
          <ErrorFetching
            isFetching={isFetchingCategories}
            onRetry={refetchCategories}
            message="Error al cargar las categorías. Revisa tu conexión y vuelve a intentar"
          />
        ) : (
          <CategoryFilter
            categories={categories}
            onChange={handleCategoryChange}
            currentCategorySlug={currentSlug}
            className={styles.categoryFilter}
            isLoading={isFetchingCategories}
          />
        )}
      </div>

      {currentCategory !== AllCategory.slug && !isError && (
        <Pagination
          className={styles.pagination}
          selectedPage={page}
          onPageChange={handlePageChange}
          pagesAmount={pagesAmount}
        />
      )}
      {prodsByCategory && !isError && (
        <ProductsList
          productsByCategory={prodsByCategory ?? []}
          areProductsLoading={isFetching}
        />
      )}

      {isLoading && <LoadingView message="Cargando productos..." />}

      {isError && (
        <div className={styles.errorFetchingWrapper}>
          <ErrorFetching
            onRetry={refetch}
            message="Error al cargar las bebidas. Revisa tu conexión y vuelve a intentarlo"
            isFetching={isFetching}
          />
        </div>
      )}

      {currentCategory !== AllCategory.slug && !isError && (
        <Pagination
          className={styles.pagination}
          selectedPage={page}
          onPageChange={handlePageChange}
          pagesAmount={pagesAmount}
        />
      )}

      {!isDesktop && (
        <StickyFooterBar isHidden={isFooterVisible}>
          <SearchInterface />
        </StickyFooterBar>
      )}
    </div>
  );
};
