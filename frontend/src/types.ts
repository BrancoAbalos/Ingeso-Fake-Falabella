export type Product = {
  id: string
  name: string;
  price: number // en CLP centavos
  image?: string
  title?: string; // Para compatibilidad con tu JSON
  description?: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}