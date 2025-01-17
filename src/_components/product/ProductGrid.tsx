import ProductCard from "./ProductCard";
import { ProductGridProps } from "@/utils/types";

export default function ProductGrid({products} : ProductGridProps){
  return(
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}