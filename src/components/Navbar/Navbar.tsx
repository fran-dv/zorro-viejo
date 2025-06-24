import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ShoppingBag } from "lucide-react";
import { Paths } from "@/routing";
import { CategoriesDropdown, MobileNavMenu } from "@/components";
import { useMediaQuery } from "usehooks-ts";
export const Navbar = () => {
  const isSmallDevice = useMediaQuery("(max-width: 850px)");

  return (
    <nav className={styles.container}>
      <ul className={styles.linksContainer}>
        <li className={`${styles.title} ${styles.link}`}>
          <Link to={Paths.Home}>
            <h2>Zorro Viejo</h2>
          </Link>
        </li>
        {!isSmallDevice ? (
          <>
            <li className={styles.link}>
              <CategoriesDropdown />
            </li>
            <li>
              <Link className={styles.link} to={Paths.Cart}>
                <ShoppingBag />
              </Link>
            </li>
          </>
        ) : (
          <>
            <MobileNavMenu />
          </>
        )}
      </ul>
    </nav>
  );
};
