'use client';

import { useEffect, useState } from "react";  
import { getProducts } from "@/lib/shopify";  

export default function Home() {  
  const [products, setProducts] = useState<any[]>([]);  
  const [loading, setLoading] = useState(true); // Add loading state  

  useEffect(() => {  
    async function fetchProducts() {  
      setLoading(true); // Set loading to true before fetching  
      const productData = await getProducts();  
      
      // Log the entire response to understand its structure
      console.log('Product Data : ', productData);

      // Format the product data and extract the relevant information
      const formattedProducts = productData?.edges.map((edge: any) => {
        return {
          id: edge.node.id,
          title: edge.node.title,
          handle: edge.node.handle,
          description: edge.node.description,
          images: edge.node.images?.edges[0]?.node.url, // Taking the first image
          price: edge.node.variants?.edges[0]?.node.price.amount
        };
      });

      setProducts(formattedProducts); // Set formatted data
      setLoading(false); // Set loading to false after fetching  
    }  
    fetchProducts();  
  }, []);

  return (  
    <div className="container mx-auto p-4">  
      <h1 className="text-2xl font-bold mb-4">Shopify Products</h1>  
      {loading ? ( // Show loader if loading is true  
        <div className="flex justify-center items-center">  
          <div className="loader">Loading...</div> {/* You can replace this with a spinner component */}  
        </div>  
      ) : (  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">  
          {products.map((product) => (  
            <div key={product.id} className="border p-4 rounded shadow-md">  
              {/* Display image, title, description, and price */}
              <img src={product.images} alt={product.title} className="w-full h-40 object-cover" />  
              <h2 className="text-lg font-semibold">{product.title}</h2>  
              <p>{product.description}</p>  
              <p className="font-bold">${product.price}</p>  
            </div>  
          ))}  
        </div>  
      )}  
    </div>  
  );  
}
