import { MessageCircleWarning, X } from "lucide-react";
import styles from "./WarnMessage.module.css";
import { useState } from "react";

interface Props {
  message: string;
  closable?: boolean;
}

export const WarnMessage = ({ message, closable = true }: Props) => {
  const [active, setActive] = useState(true);
  const handleClick = () => {
    setActive(false);
  };

  if (!active) return null;

  return (
    <div className={styles.warn}>
      {closable && (
        <button className={styles.closeButton} onClick={handleClick}>
          <X className={styles.closeIcon} />
        </button>
      )}
      <MessageCircleWarning className={styles.warnIcon} />
      <p>{message}</p>
    </div>
  );
};
