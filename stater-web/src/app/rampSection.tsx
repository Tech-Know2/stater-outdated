"use client";

import { useEffect, useState } from 'react';
import CardBenefits from '../../public/json/rampSection.json';

interface DisplayData {
    header: string;
    body: string;
    image: string;
    link: string;
}

export default function RampSection() {

    const [cardDisplay, setDisplays] = useState<DisplayData[]>([]);

    useEffect(() => {
        setDisplays(CardBenefits as DisplayData[]);
    }, []);

    return (
        <main>
            <div className="flex flex-col items-center justify-center bg-white py-10">
                <div className="w-3/4 p-6 text-left bg-gray-100 shadow shadow-md rounded-lg">
                    <h1 className="text-3xl font-semibold mb-4">Take Advantage of our Partnerships</h1>
                    <h2 className="text-lg text-gray-600 mb-8">Easily cash in or out with our MoneyGram partnership, or deposit and withdrawl easily by connecting a bank account to Plaid.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mt-4">
                        {cardDisplay.map((card, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col text-left border border-gray-200 m-4">
                                <div className="flex items-center mb-4">
                                    <img src={card.image} alt={`${card.header} image`} className="h-12 mr-4 object-contain" />
                                </div>
                                <h3 className="text-xl font-semibold">{card.header}</h3>
                                <p className="text-gray-700 mb-4">{card.body}</p>
                                <a href={`/${card.link}`} className="text-black hover:underline mt-auto">
                                    Learn more &rsaquo;
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}