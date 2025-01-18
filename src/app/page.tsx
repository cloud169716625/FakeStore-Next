"use client"

import { useState, useEffect, useRef } from "react";
import { fetchProducts } from "@/lib/api";
import ProductGrid from "@/_components/product/ProductGrid";
import { Product } from "@/utils/types";
import { initial_products } from "@/utils/config";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [batchSize, setBatchSize] = useState(initial_products);
    const [loading, setLoading] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // Load products (the number of FakeStore products is 20)
    useEffect(()=>{
      const loadAllProducts = async () => {
        const allProducts = await fetchProducts();
        setProducts(allProducts);
        setVisibleProducts(allProducts.slice(0, initial_products)); // Set initial visible products
      }
      loadAllProducts();
    }, []);

    useEffect(() => {
      // Observes a loadMoreRef to detect when it enters or exits the viewport.
      const observer = new IntersectionObserver(
        async([entry]) => {
          if (entry.isIntersecting && !loading && products.length > visibleProducts.length) {
            setLoading(true);
            setTimeout(() => {
              setVisibleProducts((prev) =>
                products.slice(0, prev.length + 4)
              ); // Increment visible products
              setBatchSize((prev) => prev + 4);
              setLoading(false);
            }, 500); // Simulate delay
          }
        },
        { threshold:0.5 }
      );

      if(loadMoreRef.current){
        observer.observe(loadMoreRef.current);
      }

      return () => {
        if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
      };
    }, [visibleProducts, loading]);

    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Product List</h1>
        <ProductGrid products={visibleProducts} />
        {/* Invisible element */}
        <div ref = {loadMoreRef } className="h-1"></div>
        {loading && <p className="text-center text-gray-500">Loading more products...</p>}
      </main>
    );
}
