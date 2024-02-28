// transaction.model.ts
export interface Transaction {
  user_id: string;
  ammount: number;
  date: string; 
  currency: string;
  account_from: string;
  account_to: string;
}
