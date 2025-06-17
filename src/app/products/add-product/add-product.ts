import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { CloseButton } from "../../shared/close-button/close-button";

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, FormsModule, CloseButton],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {
  name  = '';
  price: number | null = null;
  stock: number | null = null;
  success = false;

  constructor(
    private router: Router,
    private auth:   AuthService,
    private productService: ProductService   // ← shared store
  ) {
    // guard: only admins may enter
    const user = this.auth.getCurrentUser();
    if (user?.role !== 'Admin') {
      this.router.navigate(['/unauthorized']);   // make sure this route exists!
    }
  }

  addProduct(): void {
    if (this.name && this.price != null && this.stock != null) {
      const newProduct = {
        id: Date.now(),   // unique id
        name:  this.name,
        price: this.price,
        stock: this.stock
      };

      this.productService.addProduct(newProduct);   // update shared data
      this.success = true;

      // optional: clear the form
      this.name = '';  this.price = this.stock = null;

      // brief success flash, then back to list
      setTimeout(() => this.router.navigate(['/products']), 1000);
    }
  }
}