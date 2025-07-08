import styles from "./App.module.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { FooterContextProvider } from "./context/FooterContext";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Paths } from "@/routing";
import { ScrollToTop } from "@/components/ScrollToTop/ScrollToTop";

interface Props {
  children: React.ReactNode;
}

const hideFooterOn = [Paths.Cart];

function App({ children }: Props) {
  const footerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const shouldHideFooter = hideFooterOn.includes(pathname);

  return (
    <FooterContextProvider
      value={footerRef as React.RefObject<HTMLElement | null>}
    >
      <ScrollToTop />
      <div className={styles.container}>
        <Navbar />
        <main className={styles.main}>{children}</main>
        {!shouldHideFooter && <Footer ref={footerRef} />}
      </div>
    </FooterContextProvider>
  );
}

export default App;
