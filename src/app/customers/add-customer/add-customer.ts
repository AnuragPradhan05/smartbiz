import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer';
import { CloseButton } from '../../shared/close-button/close-button';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, CloseButton],
  templateUrl: './add-customer.html',
  styleUrls: ['./add-customer.css']
})
export class AddCustomer {
  // form fields
  name = '';
  mobile = '';
  address = '';

  // UI flags
  success = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  /** Validate and add customer */
  addCustomer(): void {
    const name   = this.name.trim();
    const mobile = this.mobile.trim();
    const addr   = this.address.trim();

    // field‑level validation
    if (!name || !mobile || !addr) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      this.errorMessage = 'Mobile number must be 10 digits.';
      return;
    }

    // create customer
    const newCustomer = {
      id: Date.now(),          // unique id
      name,
      mobile,
      address: addr
    };

    this.customerService.addCustomer(newCustomer);
    this.success      = true;
    this.errorMessage = '';

    // clear form
    this.name = this.mobile = this.address = '';

    // redirect after short delay
    setTimeout(() => this.router.navigate(['/customers']));
  }
}
