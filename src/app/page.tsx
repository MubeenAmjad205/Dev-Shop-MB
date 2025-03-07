'use client'


import { useEffect, useState } from "react";
import { getProducts } from "@/lib/shopify";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const productData = await getProducts();
      // console.log('Product Data : ' ,productData)
      setProducts(productData);
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopify Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-md">
            <img src={product.images[0]?.edges[0]?.node.url} alt={product.title} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="font-bold">${product.variants[0]?.edges[0]?.node.price.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
