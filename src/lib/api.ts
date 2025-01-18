import { Product } from "@/utils/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// There is no "offset" in fakestoreAPI.com
// From this reason, I upload all the products at once
export const fetchProducts = async(): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}`);
  if(!res.ok) throw new Error('Faied to fetch projects');
  return res.json();
} 

export const fetchProductById = async( id: number): Promise<Product> => {
  const res = await fetch( `${BASE_URL}/${id}` );
  return res.json();
}