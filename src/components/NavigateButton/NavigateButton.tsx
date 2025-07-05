import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./NavigateButton.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  to: string;
  arrow?: boolean;
  arrowSide?: "left" | "right";
  className?: string;
}

export const NavigateButton = ({
  children,
  to,
  arrow = false,
  arrowSide = "right",
  className,
}: Props) => {
  const navigate = useNavigate();
  return (
    <button
      className={`${className} ${styles.button}`}
      onClick={() => navigate(to)}
    >
      {arrow && arrowSide === "left" && <ArrowLeft className={styles.arrow} />}
      <p className={styles.buttonText}>{children}</p>
      {arrow && arrowSide === "right" && (
        <ArrowRight className={styles.arrow} />
      )}
    </button>
  );
};
