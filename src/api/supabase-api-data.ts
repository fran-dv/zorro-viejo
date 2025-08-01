import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

export const Tables = {
  Categories: "categories",
  Products: "products",
  Orders: "orders",
  OrderItems: "order_items",
} as const;
