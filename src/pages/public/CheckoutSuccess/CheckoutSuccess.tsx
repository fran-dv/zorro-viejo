import { useParams } from "react-router-dom";
import styles from "./CheckoutSuccess.module.css";
import {
  ActionButton,
  LoadingView,
  NavigateButton,
  Snackbar,
} from "@/components";
import { getOrderWhatsappLink, removeOrderFromLocalStorage } from "@/utils";
import { useEffect, useState } from "react";
import { Paths } from "@/routing";
import { useCartStore } from "@/stores";
import { useNavigate } from "react-router-dom";
import { useOrderById, useSnackbar } from "@/hooks";
import { QRCode } from "./components";

export const CheckoutSuccess = () => {
  const { orderId } = useParams();
  const [wasRedirected, setWasRedirected] = useState(false);
  const [delayPassed, setDelayPassed] = useState(false);
  const { clearCart } = useCartStore();
  const navigate = useNavigate();
  const { data: order, isFetching } = useOrderById({ id: orderId ?? "" });
  const [wppLink, setWppLink] = useState("");
  const [qrWppLink, setQrWppLink] = useState("");
  const [isLinkLoading, setIsLinkLoading] = useState(true);
  const { isOpened, closeSnackbar, openSnackbar } = useSnackbar();

  useEffect(() => {
    const setLinks = async () => {
      setWppLink(await getOrderWhatsappLink(order!, "auto", false));
      setQrWppLink(await getOrderWhatsappLink(order!, "mobile"));
    };

    if (order) {
      setLinks();
    }
  }, [order]);

  useEffect(() => {
    if (qrWppLink !== "") {
      setIsLinkLoading(false);
    }
  }, [qrWppLink]);

  useEffect(() => {
    const setTime = setTimeout(() => {
      setDelayPassed(true);
    }, 7000);

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
    removeOrderFromLocalStorage();
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
            <QRCode
              link={qrWppLink}
              onClick={qrClick}
              isLoading={isLinkLoading}
            />
          </>
        )}
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
