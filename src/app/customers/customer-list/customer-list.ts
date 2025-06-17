import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer';
import { CloseButton } from "../../shared/close-button/close-button";

@Component({
  selector: 'app-customer-list',
  imports: [CommonModule, CloseButton],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})

export class CustomerList implements OnInit {
  customers: any[] = [];
  isAdmin = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customers = this.customerService.getCustomers();
    const user = this.auth.getCurrentUser();
    this.isAdmin = user?.role === 'Admin';
  }

  editCustomer(id: number): void {
    this.router.navigate(['/edit-customer', id]);
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id);
      this.customers = this.customerService.getCustomers(); // refresh UI
    }
  }
}
