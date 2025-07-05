import styles from "./App.module.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { FooterContextProvider } from "./context/FooterContext";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
}

function App({ children }: Props) {
  const footerRef = useRef<HTMLElement>(null);
  return (
    <FooterContextProvider
      value={footerRef as React.RefObject<HTMLElement | null>}
    >
      <div className={styles.container}>
        <Navbar />
        <main className={styles.main}>{children}</main>
        <Footer ref={footerRef} />
      </div>
    </FooterContextProvider>
  );
}

export default App;
