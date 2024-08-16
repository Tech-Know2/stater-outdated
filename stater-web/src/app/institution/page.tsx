import Link from 'next/link';
import InstitutionNav from './institutionNav';

export default function Dashboard() {
  return (
    <div className="flex">
        {/* Vertical Navigation Bar */}
        <InstitutionNav />

        {/* Main Content Area */}
        <div className="flex-1 p-8 bg-gray-100">
            {/* Giant Header/Welcome Text */}
            <h1 className="text-4xl font-bold mb-8">Welcome!</h1>

            {/* Your additional content here */}
            {/* Example: */}
            <p className="text-lg">
            This is your dashboard content. You can add charts, tables, or any other content here.
            </p>
        </div>
        </div>
  );
}