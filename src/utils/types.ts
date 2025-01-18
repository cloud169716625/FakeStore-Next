export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type ProductCardProps = {
  product: Product;
}

export type ProductGridProps = {
  products: Product[];
}

export type ProductDetailProps = {
  params: {id: string};
}