"use client";

import React, { useState, useEffect } from "react";
import RetailFeatures from '../../public/json/retailFeatures.json';
import BusinessFeatures from '../../public/json/businessFeatures.json';
import InstitutionFeatures from '../../public/json/institutionFeatures.json';

export default function InfoSection() {
    type OptionType = "Retail" | "Business" | "Institution";

    const [selectedOption, setSelectedOption] = useState<OptionType>("Retail");

    interface CardData {
        title: string;
        subheader: string;
        description: string;
        image: string;
        link: string;
    }

    const [cardData, setCardData] = useState<CardData[]>([]);

    useEffect(() => {
        // Load data based on selectedOption
        switch (selectedOption) {
            case "Retail":
                setCardData(RetailFeatures);
                break;
            case "Business":
                setCardData(BusinessFeatures);
                break;
            case "Institution":
                setCardData(InstitutionFeatures);
                break;
            default:
                setCardData([]);
                break;
        }
    }, [selectedOption]);

    const handleSelect = (option: OptionType) => {
        setSelectedOption(option);
    };

    return (
        <main className="flex flex-col items-center justify-center bg-white py-44 pt-10">
            <div className="flex flex-row space-x-4 mb-8 bg-gray-100 p-2 rounded-lg">
                <button
                    onClick={() => handleSelect("Retail")}
                    className={`px-4 py-2 rounded-lg ${selectedOption === "Retail" ? "bg-black text-white" : "text-black"}`}
                >
                    Retail
                </button>
                <button
                    onClick={() => handleSelect("Business")}
                    className={`px-4 py-2 rounded-lg ${selectedOption === "Business" ? "bg-black text-white" : "text-black"}`}
                >
                    Business
                </button>
                <button
                    onClick={() => handleSelect("Institution")}
                    className={`px-4 py-2 rounded-lg ${selectedOption === "Institution" ? "bg-black text-white" : "text-black"}`}
                >
                    Institution
                </button>
            </div>

            <div className="w-3/4 p-6 text-center bg-gray-100 shadow shadow-md rounded-lg">
                <h2 className="text-4xl font-semibold mb-4">{selectedOption}</h2>
                <p className="text-lg mb-8">
                    {selectedOption === "Retail" &&
                        "Seamlessly manage your money, earn competitive interest, and experience the freedom of instant global transactions—all powered by the security of blockchain technology."}
                    {selectedOption === "Business" &&
                        "Simplify transactions, manage settlements, and oversee products and customers with cutting-edge tools tailored to modern businesses in this new era of finance."}
                    {selectedOption === "Institution" &&
                        "Harness the full potential of crypto with advanced RWA and crypto asset management, deep analytics, and scalable financial solutions for managing wealth at an enterprise level."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {cardData.map((card, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col text-left border border-gray-200">
                            <div className="flex items-center mb-4">
                                <img src={card.image} alt={`${card.title} image`} className="h-12 mr-4 object-contain" />
                            </div>
                            <h3 className="text-xl font-semibold">{card.title}</h3>
                            <h4 className="text-md text-gray-600 mb-2">{card.subheader}</h4>
                            <p className="text-gray-700 mb-4">{card.description}</p>
                            <a href={`/${card.link}`} className="text-blue-600 hover:underline mt-auto">
                                Learn more &rsaquo;
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
