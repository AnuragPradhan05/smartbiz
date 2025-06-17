import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'smartbiz';
  constructor(private router: Router, private authService: AuthService) {}

    /** live, always‑up‑to‑date login status */
  get isLoggedIn(): boolean {
    return !!this.authService.getCurrentUser();
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }


  goHome() {
    this.router.navigate(['/']);
  }

  

}
