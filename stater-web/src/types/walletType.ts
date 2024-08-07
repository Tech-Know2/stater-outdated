import { UserType } from "./userType";

export interface walletType {
  user: UserType;
  accountName: string;
  accountDescription: string;
  accountType: AccountType;
  address: string;
  owner: string;
  authUsers: UserType[];
}

export enum AccountType {
  Checkings = 'Checkings',
  Savings = 'Savings',
  Investments = 'Investments',
}