import { useParams } from "react-router-dom";
import styles from "./CheckoutSuccess.module.css";
import {
  ActionButton,
  GenericAlertDialog,
  LoadingView,
  NavigateButton,
  Snackbar,
} from "@/components";
import { getOrderWhatsappLink } from "@/utils";
import { useEffect, useState } from "react";
import { Paths } from "@/routing";
import { useNavigate } from "react-router-dom";
import { useExistingOrder, useOrderById, useSnackbar } from "@/hooks";
import { QRCode } from "./components";
import { Trash2 } from "lucide-react";

export const CheckoutSuccess = () => {
  const { orderId } = useParams();
  const [wasRedirected, setWasRedirected] = useState(false);
  const [delayPassed, setDelayPassed] = useState(false);
  const navigate = useNavigate();
  const { data: order, isFetching } = useOrderById({ id: orderId ?? "" });
  const [wppLink, setWppLink] = useState("");
  const [qrWppLink, setQrWppLink] = useState("");
  const [isLinkLoading, setIsLinkLoading] = useState(true);
  const { isOpened, closeSnackbar, openSnackbar } = useSnackbar();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const { deleteOrder, checkExistingOrderValidity } = useExistingOrder();

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
    deleteOrder();
    checkExistingOrderValidity();
    navigate(Paths.Home, { replace: true });
  };

  const qrClick = () => {
    navigator.clipboard.writeText(qrWppLink);
    openSnackbar("Enlace copiado!", false);
  };

  const handleDeleteOrder = () => {
    setOpenCancelDialog(true);
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
          <div className={styles.titleContainer}>
            <h2>Orden creada </h2>
            <button onClick={handleDeleteOrder} className={styles.cancelButton}>
              <Trash2 className={styles.icon} />
            </button>
          </div>
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
      <GenericAlertDialog
        hasTriggerButton={false}
        cancelButtonContent="Cancelar orden"
        continueButtonContent="Continuar con mi orden"
        titleContent="Estás por cancelar tu orden"
        descriptionContent="Si cancelás, se eliminarán todos los productos seleccionados. Si no querés perder tu pedido, simplemente seguí con la compra."
        open={openCancelDialog}
        onContinue={() => setOpenCancelDialog(false)}
        onCancel={handleFinish}
      />
    </div>
  );
};
