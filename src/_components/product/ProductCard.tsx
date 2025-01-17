import Link from "next/link";
import { ProductCardProps } from "@/utils/types";
import Image from "next/image";

export default function ProductCard( {product} : ProductCardProps ){
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-md p-4 hover:shadow-lg transition">
        <Image src={product.image} alt={product.title} layout="responsive" width={300} height={500} className="object-cover mb-2 max-w-[300px] max-h-[300px]" />
        <h2 className="text-sm font-semibold">{product.title}</h2>
      </div>
    </Link>
  );
}