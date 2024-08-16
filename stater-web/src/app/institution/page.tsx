import Link from 'next/link';
import InstitutionNav from './institutionNav';
import { auth } from '@clerk/nextjs/server'
import { accountRole } from '@/types/userType';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  
  const { has } = auth()

  const isAdmin = has({ permission: 'org:type:insitution'})
  const isEmployee = has({ permission: 'org:type:employee'})

  if(!isAdmin || !isEmployee)
  {
    redirect('/');
  }

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