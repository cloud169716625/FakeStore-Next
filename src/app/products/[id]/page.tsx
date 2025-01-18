import Link from "next/link";
import { Product } from "@/utils/types";
import { ProductDetailProps } from "@/utils/types";
import { fetchProductById } from "@/lib/api";

export default async function ProductDetail({params}: ProductDetailProps) {
  const {id} = await params;
  const id_num = parseInt(id);
  const product:Product = await fetchProductById(id_num);
  return (
    <main className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full max-w-md mx-auto my-4" />
      <p className="text-gray-700">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>
    </main>
  );
}