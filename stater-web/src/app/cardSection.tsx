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
            <div className="flex flex-col items-center justify-center bg-white py-10">
                <div className="w-3/4 p-6 text-left bg-gray-100 shadow shadow-md rounded-lg">
                    <h1 className="text-xl mx-4 font-semibold">Physical or Digital at your Fingertips</h1>
                    <h2 className="text-md mx-4 mt-4">Explore the boundless opportunities provided by partnering MasterCard with digital money</h2>
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