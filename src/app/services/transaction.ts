import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions = [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      productName: 'Rice Bag 25kg',
      quantity: 2,
      total: 2400,
      date: '2025-06-15'
    },
    {
      id: 2,
      customerName: 'Sunita Sahu',
      productName: 'Cooking Oil 1L',
      quantity: 5,
      total: 800,
      date: '2025-06-14'
    }
  ];

  getTransactions() {
    return this.transactions;
  }

  addTransaction(tx: any) {
    this.transactions.push(tx);
  }
}
