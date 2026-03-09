'use client';
import { useState } from 'react';
import React, { use } from 'react';
import { TProduct } from '@/models/products';
import {useRouter} from 'next/navigation'
import Button from '@/components/Button';

export default function EditProductPage({ params }: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter();
  const { id } = use(params)
  const [draft, setDraft] = useState<TProduct | null>(null);
  const [product, setProduct] = useState<TProduct | null>(null);
  const [err, setErr] = useState<String | null>(null)
  const [updateInProgress, setUpdateInProgress] = useState(false);

  React.useEffect(() => {
    console.log("ID: ", id)
    const product = localStorage.getItem("editProduct")
    console.log("Product >>", product)
    if (product) {
      try {
        const data = JSON.parse(product)
        console.log("Data >>", data);
        setProduct(data)
        setDraft(data)
      } catch (error) {
        console.log("Error parsing product from localStorage, error:", error)
        console.log("Product: ", product)
        setErr("Error parsing product from localStorage")
      }
    }
  }, [id])

  async function onSave() {
    if (draft && product) {
      if (draft.name === product.name) {
        alert("No changes made")
        return
      }
    } else {
      alert("Product and draft are not")
      return
    }
    
    setUpdateInProgress(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draft),
      });


      if (!res.ok) {
        alert("Failed to update product");
        console.log("Error response from server: ", res);
        return;
      }

      const data = await res.json();
      setProduct(data.data); // Update the original product state if needed
      setDraft(data.data);   // Update draft to match the saved data if needed
      alert("Product updated successfully");
      router.back()

    } catch (error) {
      alert("An error occurred while updating the product");
      console.error("Error updating product: ", error);
    } finally {
        setUpdateInProgress(false);
    }

  }

  async function onRetry() {
    router.back()
  }

  async function onUpdate(key: string, value: string) {
    setDraft((prev) => ({...prev!, [key]: value}))
  }

  async function onDelete() { 
    const confirmed = confirm("Are you sure you want to delete this product?");
    console.log("Confirmed: ", confirmed);
    if (!confirmed) {
      return;
    }

    setUpdateInProgress(true);
    try {
      const res = await fetch(`/api/products`, {
        method: 'DELETE',
        body: JSON.stringify({productId: id})
      });
      if (!res.ok) {
        alert("Failed to delete product");
        console.log("Error response from server: ", res);
        return;
      }
      alert("Product deleted successfully");
      router.back()
    } catch (error) {
      alert("An error occurred while deleting the product");
      console.error("Error deleting product: ", error);
    } finally {
        setUpdateInProgress(false);
    }

  }

  if (err || !product || !draft) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-center">
        <p className="mb-4">Failed to get product data</p>
        <button onClick={onRetry} className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-2 px-4 rounded">Retry</button>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit product</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <div className="flex flex-col mb-4">
          <label htmlFor="productName" className="mb-2">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            value={draft.name}
            onChange={(e) => onUpdate(e.target.id, e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <Button
          progress={updateInProgress}
          text='Save'
          progressText='Saving...'
        />
        <hr className='mt-4' />
        <Button
          type={"button"}
          onClick={onDelete}
          progress={updateInProgress}
          color='danger'
          text='Delete'
          progressText='Deleting...'
        />
      </form>
    </div>
  );
}
