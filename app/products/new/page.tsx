'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
 
export default function NewProductPage() {
  const [productName, setProductName] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const router = useRouter();
 
  async function onSave() {
    setInProgress(true);
    
    try {
       const response = await fetch('/api/products', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ name: productName }),
       });
 
       if (!response.ok) {
         throw new Error(`Error: ${response.status}`);
       }
 
       // Assuming the API returns the created product or a success message
       const result = await response.json();
       console.log('Product created:', result);
 
     } catch (error) {
       console.log('Failed to create product:', error);
       // Optionally show an error message to the user
     }
 
    setInProgress(false);

    router.push('/products');
  }
 
   return (
     <div className="container mx-auto p-4">
       <h1 className="text-2xl font-bold mb-4">Add new product</h1>
       <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
         <div className="flex flex-col mb-4">
           <label htmlFor="productName" className="mb-2">Product Name:</label>
           <input
             type="text"
             id="productName"
             value={productName}
             onChange={(e) => setProductName(e.target.value)}
             className="border border-gray-300 rounded-md p-2"
           />
         </div>
         <Button
            progress={inProgress}
            text='Save'
            progressText='Saving...'
          />
       </form>
     </div>
   );
 }
 