import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';
import { Navbar } from "../../shared/navbar/navbar";
import { Sidebar } from "../../shared/sidebar/sidebar";
@Component({
  selector: 'app-employee',
  imports: [Navbar, Sidebar],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee {
  userName = '';

  constructor(private authService: AuthService, private router: Router) {
    const user = this.authService.getCurrentUser();
    this.userName = user?.username ?? 'Employee';
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

}
