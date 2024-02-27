// transaction.model.ts
export interface Transaction {
  ammount: number;
  date: string; 
  currency: string;
  account_from: string;
  account_to: string;
}
