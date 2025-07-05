import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ShoppingBag } from "lucide-react";
import { Paths } from "@/routing";
import { CategoriesDropdown, MobileNavMenu } from "@/components";
import { useMediaQuery } from "usehooks-ts";
import { CounterBadge } from "../CounterBadge/CounterBadge";
export const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width: 850px)");

  const title: React.ReactNode = (
    <li
      className={`${styles.title} ${styles.link} ${!isDesktop ? styles.mobileTitle : ""}`}
    >
      <Link to={Paths.Home}>
        <h2>Zorro Viejo</h2>
      </Link>
    </li>
  );

  const cartButton: React.ReactNode = (
    <li>
      <Link className={styles.link} to={Paths.Cart}>
        <CounterBadge count={10}>
          <ShoppingBag className={styles.shoppingBag} />
        </CounterBadge>
      </Link>
    </li>
  );

  return (
    <nav className={styles.container}>
      <ul className={styles.linksContainer}>
        {isDesktop ? (
          <>
            {title}
            <li className={styles.link}>
              <CategoriesDropdown />
            </li>
            {cartButton}
          </>
        ) : (
          <>
            <MobileNavMenu />
            {title}
            {cartButton}
          </>
        )}
      </ul>
    </nav>
  );
};
