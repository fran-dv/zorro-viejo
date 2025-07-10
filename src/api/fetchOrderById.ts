import { supabase, Tables } from "@/api";
import { OrderSchema, type Order } from "@/models";

interface FetchOpts {
  id: string;
}

export const fetchOrderById = async ({ id }: FetchOpts): Promise<Order> => {
  const { data, error } = await supabase
    .from(Tables.Orders)
    .select(
      `
      id,
      customer_name,
      created_at,
      order_items:order_items (
        amount,
        product:products (*)
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error de red: ${error?.message}`);
  }

  if (!data) {
    throw new Error("Hubo un error buscando la orden");
  }

  const localOrder: Order = OrderSchema.parse(data);

  return localOrder;
};
