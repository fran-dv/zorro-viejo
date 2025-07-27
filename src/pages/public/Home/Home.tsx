import styles from "./Home.module.css";
import heroBackground from "@/assets/hero-bg.webp";
import { Paths } from "@/routing";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/zorro-viejo.webp";
import { useGlobalContext } from "@/context";
import { CategoryThumbnail } from "./components";
import { LoadingView } from "@/components";
import { ErrorFetching } from "@/components/Errors";
import { useState } from "react";

export const Home = () => {
  const navigate = useNavigate();
  const { categories, errorFetchingCategories, refetchCategories } =
    useGlobalContext();
  const [refetchingCategories, setRefetchingCategories] = useState(false);

  const handleRefetch = async () => {
    setRefetchingCategories(true);
    await refetchCategories();
    setRefetchingCategories(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className={styles.heroContent}>
          <img className={styles.logo} src={logo} alt="Logo Zorro viejo" />
          <h1 className={styles.title}>Zorro Viejo</h1>

          <p className={styles.subtitle}>
            Bebidas que hacen memorable cada encuentro.
          </p>
          <button
            onClick={() => navigate(Paths.Products)}
            className={styles.heroButton}
          >
            <p>Explorar bebidas</p>
          </button>
        </div>
      </div>

      <div className={styles.categoriesSectionContainer}>
        <h2>Encontrá tus bebidas favoritas</h2>

        {(!errorFetchingCategories && categories.length < 1) ||
        refetchingCategories ? (
          <LoadingView message="Cargando categorías" />
        ) : (
          <ul className={styles.categoriesList}>
            {categories.map((c) => {
              if (c.slug === "ofertas") return null;
              return (
                <li key={c.id}>
                  <CategoryThumbnail
                    category={c}
                    onClick={() => navigate(Paths.getCategoryPath(c.slug))}
                  />
                </li>
              );
            })}
          </ul>
        )}

        {errorFetchingCategories && (
          <ErrorFetching
            message="Error al cargar las categorías. Revisa tu conexión y vuelve a intentar"
            onRetry={handleRefetch}
          />
        )}
      </div>
    </div>
  );
};
