'use client';

import { TProduct } from '@/models/products';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function ListProductsPage() {
  const [products, setProducts] = React.useState<TProduct[]>([]);
  const [retryFetchingProducts, setRetryFetchingProducts] = React.useState(false);
  const router = useRouter()
  async function fetchProducts() {
    setRetryFetchingProducts(false)
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.data)
    } catch (error) {
      console.log("error fetching products: ",  error)
      setRetryFetchingProducts(true)
    }
  }
  async function handleEditProduct(product: TProduct) {
    localStorage.setItem("editProduct", JSON.stringify(product))
    router.push(`/products/edit/${product.id}`);
  }

  React.useEffect(() => {   
      fetchProducts();
  }, [])
  if (retryFetchingProducts) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-center">
        <p className="mb-4">Failed to fetch products</p>
        <button onClick={fetchProducts} className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-4 rounded">Retry</button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-[80%]">
              <p className="font-semibold">{product.name}</p>
            </div>
            <div className="w-[20%] flex justify-center">
                <button onClick={() => handleEditProduct(product)} className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-800">
                  <img src="/pencil.svg" alt="Edit" className="w-6 h-6" />
                </button>
              {/* <Link href={`/products/edit/${product.id}`} passHref>
                
              </Link> */}
            </div>
          </div>
        ))}
      </div>
      <Link href="/products/new" passHref>
        <button className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
          Add new product
        </button>
      </Link>
    </div>
  );
}
