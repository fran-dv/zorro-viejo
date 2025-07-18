import { shortenLink } from "@/utils";

export const whatsappRedirectNumber = import.meta.env
  .VITE_WHATSAPP_REDIRECT_NUMBER;

export type UserAgent = "auto" | "desktop" | "mobile";

interface Opts {
  shorten?: boolean;
  userAgent: UserAgent;
  message: string;
}

export const getWhatsappLink = async ({
  shorten,
  userAgent,
  message,
}: Opts) => {
  const encodedText = encodeURIComponent(message);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  const baseAPi = "https://api.whatsapp.com/send";
  const baseWeb = "https://web.whatsapp.com/send";
  let prefix: string;
  if (userAgent === "auto") {
    prefix = isMobile ? baseAPi : baseWeb;
  } else if (userAgent === "mobile") {
    prefix = baseAPi;
  } else {
    prefix = baseWeb;
  }

  const longLink = `${prefix}?phone=${whatsappRedirectNumber}&text=${encodedText}`;

  if (!shorten) {
    return longLink;
  }

  const shortLink = await shortenLink(longLink);

  if (!shortLink) {
    return longLink;
  }

  return shortLink;
};
