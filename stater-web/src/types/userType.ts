import { walletType } from "./walletType";
import { ObjectId } from 'mongoose';

export interface UserType {
    clerkID: string;
    firstName: string;
    lastName: string;
    userName: string;
    accountEmail: string;
    accountRole: accountRole;
    wallets: walletType[];
}

export enum accountRole {
    Business = 'Business',
    Institution = 'Institution',
}