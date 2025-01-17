import { Product } from "@/utils/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchProducts = async( page: number, limit: number ): Promise<Product[]> => {
  const offset = (page-1) *limit; //Calculate the starting point ofr 
  const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  if(!res.ok) throw new Error('Faied to fetch projects');
  return res.json();
} 

export const fetchProductById = async( id: number): Promise<Product> => {
  const res = await fetch( `${BASE_URL}/${id}` );
  return res.json();
}