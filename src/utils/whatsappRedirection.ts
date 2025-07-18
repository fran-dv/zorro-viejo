import type { Order, OrderItem } from "@/models";
import { formatPrice } from "@/utils";
import { getWhatsappLink, type UserAgent } from "./whatsappLink";

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

export const getOrderWhatsappLink = async (
  order: Order,
  userAgent: UserAgent,
  shorten = true,
) => {
  const message = buildOrderMessage(order);

  return getWhatsappLink({
    shorten: shorten || order.items.length > 3,
    userAgent: userAgent,
    message,
  });
};
