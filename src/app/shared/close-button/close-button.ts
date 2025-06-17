import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-close-button',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './close-button.html',
  styleUrl: './close-button.css'
})
export class CloseButton {
    constructor(private router: Router, private auth: AuthService) {}

  goBack() {
    const user = this.auth.getCurrentUser();
    const role = user?.role;

    if (role === 'Admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'Employee') {
      this.router.navigate(['/employee-dashboard']);
    } else {
      this.router.navigate(['/login']); // fallback
    }
  }

}
