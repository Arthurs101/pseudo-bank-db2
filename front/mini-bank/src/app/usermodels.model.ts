export interface Account {
  account_number: string;
  type: string;
  balance: number;
  currency: string;
  status: string;
  created_at: string;
  created_in: string;
}

export interface Phone {
  number: number;
  postal_code: string;
  brand: string;
}

export interface Address {
  street_name: string;
  zip_code: string;
  city: string;
}

export interface Payment {
  date: string;
  amount: number;
  currency: string;
}

export interface Loan {
  amount: number;
  due_date: string;
  currency: string;
  payments: Payment[];
  status: string;
  interest: number;
  interest_rate: string;
}

export interface User {
  names: string;
  lastnames: string;
  birthdate: string;
  nationality: string;
  credit_score: number;
  user_code: number;
  hashed_password: string;
  accounts: Account[];
  phones: Phone[];
  addresses: Address[];
  loans: Loan[];
  type: string;
}
