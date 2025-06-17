import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
    userRole: string = '';

  constructor(private authService: AuthService) {
    const user = this.authService.getCurrentUser();
    this.userRole = user?.role || '';
  }
}

