import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToggleClassService } from '../../Services/toggle-folder/toggle-class.service';
import { Customer } from '../../Models/customer.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  loggedUser: any; // Change to the appropriate type based on your data structure
  router = inject(Router);
  customer!: Customer;
  constructor(private toggleClassService: ToggleClassService) {
    this.loadUserData();
  }

  onToggleClass(): void {
    this.toggleClassService.toggleClass();
  }

  loadUserData(): void {
    const userData = localStorage.getItem('loginUser');
    if (userData) {
      this.loggedUser = JSON.parse(userData); // Parse the string into an object
    } else {
      this.loggedUser = null; // Handle the case where there is no user data
    }
  }
  signOut() {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }
}
