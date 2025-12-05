export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  title?: string;
  description?: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}