export default function Footer() {
    return (
        <footer className="bg-gray-100 text-black py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Stater Inc.</h3>
                        <p className="text-gray-800">Your gateway to seamless and secure financial solutions.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Products</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Retail</a></li>
                            <li><a href="#" className="hover:underline">Business</a></li>
                            <li><a href="#" className="hover:underline">Institution</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Solutions</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Cards</a></li>
                            <li><a href="#" className="hover:underline">Fiat/Crypto Transfers</a></li>
                            <li><a href="#" className="hover:underline">OTC & Liquidity Pools</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Pricing Overview</a></li>
                            <li><a href="#" className="hover:underline">Plans</a></li>
                            <li><a href="#" className="hover:underline">Custom Pricing</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-800">
                    <p>&copy; 2024 Stater Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}