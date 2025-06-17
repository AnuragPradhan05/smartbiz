import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'smartbiz';
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }


  goHome() {
    this.router.navigate(['/']);
  }

}
