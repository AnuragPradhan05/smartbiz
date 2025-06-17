import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { CloseButton } from "../../shared/close-button/close-button";

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, CloseButton],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: any[] = [];
  isAdmin = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    const user = this.auth.getCurrentUser();
    this.isAdmin = user?.role === 'Admin';
  }

  editProduct(id: number): void {
    this.router.navigate(['/edit-product', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
      this.products = this.productService.getProducts(); // Refresh local list
    }
  }
}
