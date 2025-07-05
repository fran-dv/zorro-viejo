import type { Product } from "@/models";

export interface CartItem {
  id: number;
  amount: number;
  product: Product;
}
