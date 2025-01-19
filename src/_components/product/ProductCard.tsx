import Link from "next/link";
import { ProductCardProps } from "@/utils/types";
import Image from "next/image";

export default function ProductCard( {product} : ProductCardProps ){
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-md p-4 hover:shadow-lg transition flex flex-col justify-between h-[250px] md:h-[300px] lg:h-[400px] ">
        <Image 
          src={product.image} 
          alt={product.title} 
          width={300} 
          height={300} 
          className="object-cover mx-auto mb-2 h-5/6 w-auto" 
          priority  
        />
        <h2 className="font-semibold text-center line-clamp-2 overflow-hidden text-xs md:text-sm ">{product.title}</h2>
      </div>
    </Link>
  );
}