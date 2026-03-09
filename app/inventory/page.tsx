'use client';
import React from 'react';
import Link from 'next/link';

export default function InventoryHome() {
  const inventory = [
    { id: 1, name: "20 Sep, 11:39PM" },
    { id: 2, name: "21 Sep, 10:42PM" },
    { id: 3, name: "22 Sep, 11:15PM" },
    { id: 4, name: "20 Sep, 11:39PM" },
    { id: 5, name: "21 Sep, 10:42PM" },
    { id: 6, name: "22 Sep, 11:15PM" },
    { id: 7, name: "20 Sep, 11:39PM" },
    { id: 8, name: "21 Sep, 10:42PM" },
    { id: 9, name: "22 Sep, 11:15PM" },
    { id: 10, name: "20 Sep, 11:39PM" },
    { id: 11, name: "21 Sep, 10:42PM" },
    { id: 12, name: "22 Sep, 11:15PM" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="flex flex-col gap-4">
        {inventory.map((item) => (
          <div key={item.id} className="flex items-center w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="w-[60%]">
              <p className="font-semibold">{item.name}</p>
            </div>
            <div className="w-[20%] flex justify-center">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                <img src="/eye.svg" alt="View" className="w-6 h-6" />
              </button>
            </div>
            <div className="w-[20%] flex justify-center">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-800">
                <img src="/pencil.svg" alt="Edit" className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link href="/inventory/reports/new" passHref>
        <button className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
          New report
        </button>
      </Link>
    </div>
  );
}
