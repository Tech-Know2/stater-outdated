import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/user';
import { UserType } from '@/types/userType';
import connection from '@/lib/db';

export async function POST(req: Request, res: NextResponse) {
    if (req.method === 'POST') {
        try {
            await connection();

            const data = await req.json();

            const { clerkID, firstName, lastName, userName, accountEmail, accountRole, wallets } = data;

            const newUser = new User({
                clerkID,
                firstName,
                lastName,
                userName,
                accountEmail,
                accountRole,
                wallets
            });

            const createdUser = await newUser.save();
            return NextResponse.json(createdUser, { status: 201 });

        } catch (error) {
            console.error('Error creating user:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    } else 
    {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}