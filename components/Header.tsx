'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = document.cookie.includes('session');
    console.log("Session in header:", session)
    setIsLoggedIn(session);
  }, []);

  const handleLogout = () => {
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    setIsDrawerOpen(false);
    router.push('/');
  };

  if (!isLoggedIn) {
    return null; // Don't render anything if not logged in
  }

  return (
    <>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Inventory App</h1>
        <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="p-2">
          <img src="/hamburger.svg" alt="Menu" className="w-6 h-6" />
        </button>
      </header>
      {isDrawerOpen && (
        <div className="fixed bottom-0 left-0 right-0 h-1/4 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out translate-y-0">
          <nav>
            <ul>
            <li className="border-b border-gray-700">
                <Link onClick={() => setIsDrawerOpen(false)} href="/inventory" className="block py-4 hover:text-gray-300">
                  Inventory
                </Link>
              </li>
              <li className="border-b border-gray-700">
                <Link onClick={() => setIsDrawerOpen(false)} href="/products" className="block py-4 hover:text-gray-300">
                  Products
                </Link>
              </li>
              <li className="border-b border-gray-700">
                <button onClick={handleLogout} className="block py-4 hover:text-gray-300 w-full text-left text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
