import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction';
import { CloseButton } from "../../shared/close-button/close-button";

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, FormsModule, CloseButton],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionList implements OnInit {
  transactions: any[] = [];
  isAdmin = false;

  constructor(private auth: AuthService, private transactionService: TransactionService) {}

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    this.isAdmin = user?.role === 'Admin';
    this.transactions = this.transactionService.getTransactions();
  }
}