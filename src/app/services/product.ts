import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
  { id: 1, name: 'Rice Bag 25kg', price: 1200, stock: 10 },
  { id: 2, name: 'Cooking Oil 1L', price: 160, stock: 30 },
  { id: 3, name: 'Toothpaste', price: 55, stock: 50 },
  { id: 4, name: 'Washing Powder', price: 85, stock: 20 },
  { id: 5, name: 'Notebook (200pg)', price: 35, stock: 100 },
  { id: 6, name: 'Ball Pen', price: 10, stock: 500 },
  { id: 7, name: 'Detergent Bar', price: 20, stock: 40 },
  { id: 8, name: 'Milk Packet 500ml', price: 28, stock: 60 }
  ];

  getProducts() {
    return this.products;
  }

 addProduct(product: any) {
  const last = this.products[this.products.length - 1];
  const nextId = last ? last.id + 1 : 1;
  product.id = nextId;
  this.products.push(product);
}

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  updateProduct(id: number, updated: any) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) this.products[index] = updated;
  }
}
