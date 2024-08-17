"use client";

import { useEffect, useState } from 'react';
import CardBenefits from '../../public/json/cardBenefits.json';

interface DisplayData {
    header: string;
    body: string;
    image: string;
    link: string;
}

export default function CardSection() {
    const [cardDisplay, setDisplays] = useState<DisplayData[]>([]);

    useEffect(() => {
        setDisplays(CardBenefits as DisplayData[]);
    }, []);

    return (
        <main>
            {/* Main Card Section */}
            <div className="flex flex-col items-center justify-center bg-white py-10">
                <div className="w-3/4 p-6 text-left bg-gray-100 shadow shadow-md rounded-lg">
                    <h1 className="text-3xl font-semibold mb-4">Physical or Digital at Your Fingertips</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Explore the boundless opportunities provided by partnering MasterCard with digital money.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cardDisplay.map((card, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col text-left border border-gray-200 hover:shadow-xl transition-shadow">
                                <img src={card.image} alt={`${card.header} image`} className="h-16 mx-auto mb-6 object-contain" />
                                <h3 className="text-xl font-semibold mb-2">{card.header}</h3>
                                <p className="text-gray-700 mb-4">{card.body}</p>
                                <a href={`/${card.link}`} className="text-blue-600 hover:text-blue-800 mt-auto">
                                    Learn more &rsaquo;
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How We Relate and Differ Section */}
            <div className="bg-white py-12">
                <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-16">
                    <div className='bg-gray-100 px-8 py-4 rounded rounded-lg shadow shadow-lg'>
                        <h2 className="text-2xl font-semibold mb-4">Our Core Offerings</h2>
                        <ul className="space-y-2 text-lg text-gray-700">
                            <li>- Comprehensive Card Solutions: Credit, Debit, Prepaid</li>
                            <li>- Advanced Investment Portfolios</li>
                            <li>- Versatile Bank Accounts: Savings, Checking, and Investment Accounts</li>
                            <li>- Seamless Integration with Global Financial Networks</li>
                            <li>- Real Time Account Management and Insights</li>
                        </ul>
                    </div>
                    <div className='bg-gray-100 px-8 py-4 rounded rounded-lg shadow shadow-lg'>
                        <h2 className="text-2xl font-semibold mb-4">What Sets Us Apart</h2>
                        <ul className="space-y-2 text-lg text-gray-700">
                            <li>- Market Leading Interest Rates: Grow Your Wealth Faster</li>
                            <li>- Zero Fees: No Maintenance, Transaction, or Account Fees</li>
                            <li>- Instant, Borderless Transactions Across the Globe</li>
                            <li>- Cutting Edge Security with Multi-Layered Protection</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}