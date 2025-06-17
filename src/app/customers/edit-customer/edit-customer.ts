import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer';
import { CloseButton } from "../../shared/close-button/close-button";

@Component({
  selector: 'app-edit-customer',
  imports: [CommonModule, FormsModule, CloseButton],
  templateUrl: './edit-customer.html',
  styleUrl: './edit-customer.css'
})
export class EditCustomer implements OnInit {
  id!: number;
  name = '';
  mobile = '';
  address = '';
  success = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    const customer = this.customerService.getCustomers().find(c => c.id === this.id);
    if (customer) {
      this.name = customer.name;
      this.mobile = customer.mobile;
      this.address = customer.address;
    }
  }

  saveCustomer(): void {
    const updatedCustomer = {
      id: this.id,
      name: this.name,
      mobile: this.mobile,
      address: this.address
    };

    this.customerService.updateCustomer(this.id, updatedCustomer);
    this.success = true;

    setTimeout(() => this.router.navigate(['/customers']), 1000);
  }
}
