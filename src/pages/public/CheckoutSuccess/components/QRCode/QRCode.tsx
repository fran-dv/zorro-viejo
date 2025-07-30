import { QRCodeSVG } from "qrcode.react";
import styles from "./QRCode.module.css";
import WhatsappLogo from "@/assets/whatsapp-logo.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  link: string;
  onClick: () => void;
  isLoading: boolean;
}

const QR_SIZE = 300;

export const QRCode = ({ link, onClick, isLoading }: Props) => {
  if (isLoading) {
    return <Skeleton className={styles.qr} width={QR_SIZE} height={QR_SIZE} />;
  }

  return (
    <>
      <QRCodeSVG
        value={link}
        className={styles.qr}
        size={QR_SIZE}
        title="QR para WhatsApp"
        level="M"
        onClick={onClick}
      />
      <img
        className={styles.qrWhatsappLogo}
        src={WhatsappLogo}
        alt="Logo de WhatsApp"
        onClick={onClick}
      />
    </>
  );
};
