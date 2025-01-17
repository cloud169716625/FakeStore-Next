"use client"

import { useState, useEffect, useRef } from "react";
import { fetchProducts } from "@/lib/api";
import ProductGrid from "@/_components/product/ProductGrid";
import { Product } from "@/utils/types";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // Load initial products 
    useEffect(()=>{
      const loadInitialProducts = async () => {
        const data = await fetchProducts(1,4);
        setProducts(data);
      }
      loadInitialProducts();
    }, []);

    useEffect(() => {
      // Observes a loadMoreRef to detect when it enters or exits the viewport.
      const observer = new IntersectionObserver(
        async([entry]) => {
          if(entry.isIntersecting && !loading) {
            setLoading(true);
            const data = await fetchProducts(page + 1, 4);
            setProducts((prev)=> [...prev, ...data]);
            setPage((prev) => prev + 1);
            setLoading(false);
          }
        },
        { threshold:1.0 }
      );

      if(loadMoreRef.current){
        observer.observe(loadMoreRef.current);
      }

      return () => {
        if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
      };
    }, [page, loading]);

    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Product List</h1>
        <ProductGrid products={products}/>
        {/* Invisible element */}
        <div ref = {loadMoreRef }></div>
        {loading && <p className="text-center text-gray-500">Loading more products...</p>}
      </main>
    );
}
