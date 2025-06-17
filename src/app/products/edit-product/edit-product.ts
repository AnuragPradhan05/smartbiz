import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { CloseButton } from "../../shared/close-button/close-button";

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule, CloseButton],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css'
})
export class EditProduct implements OnInit {
  id!: number;

  name  = '';
  price: number | null = null;
  stock: number | null = null;

  success = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;

    const product = this.productService.getProducts()
                     .find(p => p.id === this.id);

    if (product) {
      this.name  = product.name;
      this.price = product.price;
      this.stock = product.stock;
    }
  }

  saveProduct(): void {
    if (this.price != null && this.stock != null) {

      const updated = {
        id:    this.id,
        name:  this.name,
        price: this.price,
        stock: this.stock
      };

      this.productService.updateProduct(this.id, updated);
      this.success = true;

      setTimeout(() => this.router.navigate(['/products']), 1000);
    }
  }
}
