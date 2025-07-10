import { useParams } from "react-router-dom";
import styles from "./CheckoutSuccess.module.css";
import {
  ActionButton,
  LoadingView,
  NavigateButton,
  Snackbar,
} from "@/components";
import { existingOrderIdKey, getWhatsappLink } from "@/utils";
import { useEffect, useState } from "react";
import { Paths } from "@/routing";
import { QRCodeSVG } from "qrcode.react";
import WhatsappLogo from "@/assets/whatsapp-logo.svg";
import { useCartStore } from "@/stores";
import { useNavigate } from "react-router-dom";
import { useOrderById, useSnackbar } from "@/hooks";

export const CheckoutSuccess = () => {
  const { orderId } = useParams();
  const [wasRedirected, setWasRedirected] = useState(false);
  const [delayPassed, setDelayPassed] = useState(false);
  const { clearCart } = useCartStore();
  const navigate = useNavigate();
  const { data: order, isFetching } = useOrderById({ id: orderId ?? "" });
  const [wppLink, setWppLink] = useState("");
  const [qrWppLink, setQrWppLink] = useState("");
  const { isOpened, closeSnackbar, openSnackbar } = useSnackbar();

  useEffect(() => {
    if (order) {
      setWppLink(getWhatsappLink(order));
      setQrWppLink(getWhatsappLink(order, "mobile"));
    }
  }, [order]);

  useEffect(() => {
    const setTime = setTimeout(() => {
      setDelayPassed(true);
    }, 5000);

    return () => clearTimeout(setTime);
  }, []);

  if (!order && isFetching) {
    return <LoadingView message="Cargando orden..." />;
  }

  const handleSend = () => {
    window.open(wppLink, "_blank");
    setWasRedirected(true);
  };

  const handleFinish = () => {
    clearCart();
    localStorage.removeItem(existingOrderIdKey);
    navigate(Paths.Home, { replace: true });
  };

  const qrClick = () => {
    navigator.clipboard.writeText(qrWppLink);
    openSnackbar("Enlace copiado!", false);
  };

  return (
    <div className={styles.container}>
      {wasRedirected && (
        <NavigateButton arrow arrowSide="left" onClick={handleFinish}>
          Volver al inicio
        </NavigateButton>
      )}
      {!wasRedirected ? (
        <>
          <h2>Orden creada</h2>
          <p>
            ✅ Pedido registrado. Ahora pulsa “Finalizar pedido en WhatsApp” y
            envía el mensaje.
          </p>
        </>
      ) : (
        <>
          <p>¿Ya enviaste el mensaje? Pulsa “Volver al inicio” ☝️</p>
          <p>❗ Si WhatsApp no se abrió, inténtalo de nuevo 👇</p>
        </>
      )}
      <ActionButton
        onClick={handleSend}
        content={"Finalizar pedido en WhatsApp"}
        className={styles.actionButton}
      />
      <p className={styles.qrLabel}>📱 También puedes escanear el QR.</p>

      <div className={styles.qrWrapper}>
        {qrWppLink !== "" && (
          <>
            <QRCodeSVG
              value={qrWppLink}
              className={styles.qr}
              size={300}
              title="QR para WhatsApp"
              level="M"
              onClick={qrClick}
            />
            <img
              className={styles.qrWhatsappLogo}
              src={WhatsappLogo}
              alt="Logo de WhatsApp"
            />
          </>
        )}
        <img
          className={styles.qrWhatsappLogo}
          src={WhatsappLogo}
          alt="Logo de WhatsApp"
        />
      </div>
      {!wasRedirected && delayPassed && (
        <>
          <p>¿Ya enviaste el mensaje? Pulsa “Volver al inicio” 👇</p>
          <NavigateButton arrow arrowSide="left" onClick={handleFinish}>
            Volver al inicio
          </NavigateButton>
        </>
      )}
      {isOpened && (
        <div className={styles.snackbarContainer}>
          <Snackbar
            content="Enlace copiado!"
            seconds={2}
            showUndoBtn={false}
            onClose={() => closeSnackbar()}
          />
        </div>
      )}
    </div>
  );
};
