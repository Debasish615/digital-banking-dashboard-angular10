import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Debit' | 'Credit';
}

@Injectable({ providedIn: 'root' })
export class TransactionService {

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('assets/transactions.json');
  }
}
