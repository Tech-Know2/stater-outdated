"use client"

import { useAuth } from '@clerk/nextjs';
import { useUser } from "@clerk/clerk-react";
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BusinessNav() {
  const { signOut } = useAuth();
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className="text-black w-[15vw] flex flex-col items-center py-6 space-y-4 h-screen">
      {/* Logo */}
      <Link href="/" className="text-black text-xl font-bold mb-5">Stater Inc.</Link>

      {/* Navigation Links */}
      <nav className="space-y-3 flex-1 overflow-y-auto">
        <Link href="/business/dashboard" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Dashboard</Link>
        <Link href="/business/dashboard/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Accounts</Link>
        <Link href="/business/dashboard/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Savings & Investments</Link>
        <Link href="/business/dashboard/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Transact</Link>
        <Link href="/business/dashboard/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Reports</Link>
        <Link href="/business/dashboard/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Cards</Link>
        <Link href="/business/dashboard/help-center" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Help Center</Link>
      </nav>

      {/* User Information and Sign Out Button */}
      <h2 className='mb-0'>{user?.fullName}</h2>
      <button 
        className="text-white bg-black hover:bg-gray-700 px-5 py-2 rounded-md text-sm font-medium w-[70%] flex items-center justify-center font-bold"
        onClick={() => signOut({ redirectUrl: '/' })}
      >
        Sign out
      </button>
      <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Settings</Link>
    </div>
  );
}
