'use client';

import { TProduct } from '@/models/products';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import EyeIcon from '@/public/eye.svg'
import Button from '@/components/Button'

export default function InventoryReportEditPage() {
  const [products, setProducts] = React.useState<TProduct[]>([]);
  const [needs, setNeeds] = React.useState<string[]>([]);
  const [available, setAvailable] = React.useState<{id: string, qty: string}[]>([]);
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
    router.push(`/inventory/reports/edit/${product.id}`);
  }

  async function onSave() {
    const confirmed = confirm("Are you sure you want to save report")
    console.log("Confirmed:", confirmed)
    if (!confirmed) {
      return
    }
  }

  async function handleMarkAsNeeded(product: TProduct) {
    // TODO: Implement logic to mark product as needed
    console.log("Mark as needed:", product.name);
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

  async function onUpdateQty(productId: string, qty: string) {
    // todo: implement
  }

  async function onCancelQty(productId: string) {
    // todo: implement
  }

  async function editProductForm(productId: string) {
    return (
        <div>
            <div className="flex flex-col mb-4">
            <label htmlFor="productName" className="mb-2">
                Qty:
            </label>
            <input
                type="text"
                id="qty"
                value={"1"}
                onChange={(e) => onUpdateQty(e.target.id, e.target.value)}
                className="border border-gray-300 rounded-md p-2"
            />
            </div>
            <div className="flex justify-between">
            <Button
                type="button"
                onClick={() => {}}
                progress={updateInProgress}
                text='Save'
                progressText='Saving...'
            />
            <Button
                type="button"
                onClick={() => router.back()}
                progress={false} // No progress for Cancel button
                color='default' // Assuming 'secondary' is your yellow color
                text='Cancel'
            />
            </div>
            <hr className='mt-4' />
        </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory report</h1>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-[80%]">
              <p className="font-semibold">{product.name}</p>
            </div>
            <div className="w-[20%] flex justify-end gap-2">
                <button onClick={() => handleMarkAsNeeded(product)} className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-800" aria-label="Mark as needed">
                  <img src="/eye.svg" alt="Need" className="w-6 h-6" />
                </button>
                <button onClick={() => handleEditProduct(product)} className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-800">
                  <img src="/pencil.svg" alt="Edit" className="w-6 h-6" />
                </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onSave} className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
        Save
        </button>
    </div>
  );
}
