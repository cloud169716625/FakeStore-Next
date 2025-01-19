"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/utils/types";
import { initial_products } from "@/utils/config";
import dynamic from "next/dynamic";

const ProductGrid = dynamic(() => import("@/_components/product/ProductGrid"), {
  loading: () => <p className="text-center text-sm text-gray-500">Loading products...</p>,
});

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]); // All products
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]); // Displayed products
  const [categories, setCategories] = useState<string[]>([]); // List of categories
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // Selected category
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(false); // Check if more products are available

  // Load all products and categories
  useEffect(() => {
    const loadAllProducts = async () => {
      const allProducts = await fetchProducts();
      setProducts(allProducts);

      // Initialize visible products with all products
      setVisibleProducts(allProducts.slice(0, initial_products));
      setHasMore(allProducts.length > initial_products);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(allProducts.map((product) => product.category))
      );
      setCategories(["all", ...uniqueCategories]); // Add 'all' option
    };
    loadAllProducts();
  }, []);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    const filtered = category === "all"
      ? products
      : products.filter((product) => product.category === category);

    setVisibleProducts(filtered.slice(0, initial_products));
    setHasMore(filtered.length > initial_products);
  };

  // Handle scroll event
  const handleScroll = () => {
    if (loading || !hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setLoading(true);

      setTimeout(() => {
        setVisibleProducts((prev) => {
          const currentProducts =
            selectedCategory === "all"
              ? products
              : products.filter((product) => product.category === selectedCategory);

          const nextBatch = currentProducts.slice(
            prev.length,
            prev.length + 4
          );

          // Check if there are more products to load
          if (nextBatch.length === 0) {
            setHasMore(false);
          }

          return [...prev, ...nextBatch];
        });

        setLoading(false);
      }, 500); // Simulated delay
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [products, selectedCategory, loading, hasMore]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Product List</h1>

      {/* Category Filter */}
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <ProductGrid products={visibleProducts} />

      {loading && <p className="text-center text-gray-500">Loading more products...</p>}
      {!hasMore && <p className="text-center text-gray-500">No more products available</p>}
    </main>
  );
}