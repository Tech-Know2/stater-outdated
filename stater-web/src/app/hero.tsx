"use client"

import Link from 'next/link';

export default function Hero() {

  // Array of partner image sources
  const partnerImages = [
    '/images/chainlink-logo.png',
    '/images/circle-logo.png',
    '/images/Mastercard-logo.png',
    '/images/MoneyGramLogo.svg',
    '/images/plaid-logo.png',
    '/images/stellar-logo.png',
  ];

  return (
    <main className="pt-60">
      {/* HERO ELEMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-black mb-4">Financial Freedom, Redefined</h1>
        <h2 className="text-2xl text-gray-700 mb-8">Unlock the potential of your money with the best rates, low fees, and seamless digital transfers</h2>
        <div className="flex justify-center space-x-4">
          <Link href="/sign-up" className="text-white bg-black hover:bg-gray-700 px-5 py-3 rounded-md text-lg font-medium">
            Get Started
          </Link>
          <Link href="/" className="text-black border-2 border-black hover:bg-gray-700 hover:text-white px-5 py-3 rounded-md text-lg font-medium">
            Learn More
          </Link>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center mt-24">
        <h3 className="text-2xl font-bold text-black">Powered by</h3>
        <div className="flex justify-center space-x-8 overflow-x-auto mt-0">
          {partnerImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Partner ${index + 1}`}
              className="h-48 w-48 object-contain"
            />
          ))}
        </div>
      </div>
    </main>
  );
}