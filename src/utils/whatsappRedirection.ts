import type { Order, OrderItem } from "@/models";
import { formatPrice, shortenLink } from "@/utils";

export const whatsappRedirectNumber = import.meta.env
  .VITE_WHATSAPP_REDIRECT_NUMBER;

const buildOrderMessage = (order: Order): string => {
  const orderUrl = `https://example.com/orders?id=${order.id}`; // ajusta a tu dominio

  const divider = `*-----${"-".repeat(order.id.length * 2)}*`;

  const header = [
    `*Orden #${order.id}*`,
    `De *${order.customerName}*`,
    `-`,
    `📋 link (Gestión interna) • ${orderUrl}`,
    divider,
    `Detalle:`,
  ];

  const generateItemBullet = (item: OrderItem): string => {
    return [
      `- ${item.amount} x ${item.product.name}`,
      `    _(${item.product.unitsInPackage} x ${item.product.unitVolumeMl}ml c/u)_`,
      `    precio unitario: *${formatPrice(item.product.offerPrice ?? item.product.price)}*`,
    ].join("\n");
  };

  const items = order.items.map(generateItemBullet);

  const footer = [
    divider,
    `*Total: ${formatPrice(order.totalPrice)}*`,
    ` `,
    `> _Mensaje generado automáticamente. Por favor, no lo modifiques; te responderemos pronto. ¡Gracias!_`,
  ];

  return [...header, ...items, ...footer].join("\n");
};

export const getWhatsappLink = async (
  order: Order,
  userAgent: "auto" | "desktop" | "mobile" = "auto",
  shorten = true,
) => {
  const text = buildOrderMessage(order);
  const encodedText = encodeURIComponent(text);

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

  if (!shorten || order.items.length < 4) {
    return longLink;
  }

  const shortLink = await shortenLink(longLink);

  if (!shortLink) {
    return longLink;
  }

  return shortLink;
};
