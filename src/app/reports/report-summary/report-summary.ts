import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer';
import { ProductService } from '../../services/product';
import { TransactionService } from '../../services/transaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloseButton } from "../../shared/close-button/close-button";

@Component({
  selector: 'app-report-summary',
  imports: [CommonModule, FormsModule, CloseButton],
  templateUrl: './report-summary.html',
  styleUrl: './report-summary.css'
})
export class ReportSummary implements OnInit {
  totalCustomers = 0;
  totalProducts = 0;
  totalTransactions = 0;
  totalRevenue = 0;

  mostSoldProduct: string = '';
  topCustomer: string = '';

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const customers = this.customerService.getCustomers();
    const products = this.productService.getProducts();
    const transactions = this.transactionService.getTransactions();

    this.totalCustomers = customers.length;
    this.totalProducts = products.length;
    this.totalTransactions = transactions.length;
    this.totalRevenue = transactions.reduce((sum, tx) => sum + tx.total, 0);

    // Calculate most sold product
    const productMap: Record<string, number> = {};
    const customerMap: Record<string, number> = {};

    for (const tx of transactions) {
      productMap[tx.productName] = (productMap[tx.productName] || 0) + tx.quantity;
      customerMap[tx.customerName] = (customerMap[tx.customerName] || 0) + tx.total;
    }

    this.mostSoldProduct = Object.entries(productMap)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    this.topCustomer = Object.entries(customerMap)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
  }
}
