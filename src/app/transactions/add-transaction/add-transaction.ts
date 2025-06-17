import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction';
import { CustomerService } from '../../services/customer';
import { ProductService } from '../../services/product';
import { CloseButton } from "../../shared/close-button/close-button";

@Component({
  selector: 'app-add-transaction',
  imports: [CommonModule, FormsModule, CloseButton],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.css'
})
export class AddTransaction implements OnInit {
  customers: any[] = [];
  products: any[] = [];

  selectedCustomer = '';
  selectedProductId: number | null = null;
  quantity: number | null = null;

  total = 0;
  success = false;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private productService: ProductService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
    this.products = this.productService.getProducts();
  }

  calculateTotal(): void {
    const product = this.products.find(p => p.id === this.selectedProductId);
    this.total = product && this.quantity ? product.price * this.quantity : 0;
  }

  addTransaction(): void {
    if (this.selectedCustomer && this.selectedProductId && this.quantity != null) {
      const product = this.products.find(p => p.id === this.selectedProductId);

      // 👇 Generate the next incremental ID (length + 1)
      const nextId = this.transactionService.getTransactions().length + 1;

      const newTx = {
        id: nextId,                                  // ✅ cleaner ID
        customerName: this.selectedCustomer,
        productName: product?.name || '',
        quantity: this.quantity,
        total: this.total,
        date: new Date().toISOString().split('T')[0]
      };

      this.transactionService.addTransaction(newTx);
      this.success = true;

      // reset form fields
      this.selectedCustomer = '';
      this.selectedProductId = null;
      this.quantity = null;
      this.total = 0;

      // redirect after short delay
      setTimeout(() => this.router.navigate(['/transactions']), 1000);
    }
  }
}