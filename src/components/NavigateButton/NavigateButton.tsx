import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./NavigateButton.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  to?: string;
  arrow?: boolean;
  arrowSide?: "left" | "right";
  className?: string;
  onClick?: () => void;
  replace?: boolean;
}

export const NavigateButton = ({
  children,
  to = undefined,
  arrow = false,
  arrowSide = "right",
  className,
  onClick,
  replace = false,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.();

    if (to) {
      navigate(to, { replace });
    }
  };

  return (
    <button
      type="button"
      className={`${className} ${styles.button}`}
      onClick={handleClick}
    >
      {arrow && arrowSide === "left" && <ArrowLeft className={styles.arrow} />}
      <p className={styles.buttonText}>{children}</p>
      {arrow && arrowSide === "right" && (
        <ArrowRight className={styles.arrow} />
      )}
    </button>
  );
};
