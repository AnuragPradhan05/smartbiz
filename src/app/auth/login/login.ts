import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
   username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      const role = this.authService.getCurrentUser().role;
      if (role === 'Admin') {
        this.router.navigate(['/admin-dashboard']);
      } else if (role === 'Employee') {
        this.router.navigate(['/employee-dashboard']);
      }
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

}
