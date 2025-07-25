import { ActionButton } from "@/components/ActionButton/ActionButton";
import styles from "./ErrorView.module.css";
import wppLogo from "@/assets/whatsapp-logo.svg";
import { getWhatsappLink } from "@/utils";

interface Props {
  onReset: () => void;
  message?: string;
}
export const ErrorView = ({ message, onReset }: Props) => {
  const handleWppClick = async () => {
    const message =
      "Hola! estoy experimentando errores frecuentes en el sitio web de Zorro viejo";
    const link = await getWhatsappLink({ userAgent: "auto", message });
    window.open(link, "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>¡Ups! Parece que hubo un error 😕</h1>
        <div className={styles.advise}>
          <h4>Revisa tu conexión a internet y pulsa "Reintentar".</h4>
          <p>
            Si ya verificaste tu conexión y los problemas persisten, puedes
            comunicarte por whatsapp apretando el botón.
          </p>
          <button
            className={styles.wppButton}
            title="Contáctanos por whatsapp"
            onClick={handleWppClick}
          >
            <img className={styles.wppImage} src={wppLogo} />
          </button>
        </div>

        <ActionButton onClick={onReset} content="Reintentar" />

        <p className={styles.detail}>
          <strong>Detalles del error:</strong>
          <br />
          {message ? message : "No pudimos completar tu petición."}
        </p>
      </div>
    </div>
  );
};
