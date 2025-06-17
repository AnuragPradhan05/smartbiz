import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../../shared/sidebar/sidebar";
import { Navbar } from "../../shared/navbar/navbar";
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer';
import { ProductService } from '../../services/product';
import { TransactionService } from '../../services/transaction';


@Component({
  selector: 'app-admin',
  imports: [Sidebar, Navbar],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  totalCustomers = 0;
  totalProducts = 0;
  totalSales = 0;
  totalDue = 0; // Optional

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshCounts();
  }

  refreshCounts(): void {
    this.totalCustomers = this.customerService.getCustomers().length;
    this.totalProducts = this.productService.getProducts().length;
    this.totalSales = this.transactionService.getTransactions()
      .reduce((sum, tx) => sum + tx.total, 0);
    this.totalDue = 0; // Customize logic if needed
  }

  goToAddCustomer() {
    this.router.navigate(['/add-customer']);
  }

  goToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  goToTransactions() {
    this.router.navigate(['/transactions']);
  }

  goToReports() {
    this.router.navigate(['/reports']);
  }
}
