import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crud';
  isLoggedIn:boolean=false; 
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isTaskPage: boolean = false;
  userName:any;

  constructor(private authService: AuthService,private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the user is logged in
        this.isLoggedIn = this.authService.isAuthenticated();

        // Check the current route to determine page
        this.isLoginPage = this.router.url.includes('login');
        this.isRegisterPage = this.router.url.includes('register');
        this.isTaskPage = this.router.url ===('');

        // Retrieve user name if logged in
        if (this.isLoggedIn) {
          this.userName = localStorage.getItem('username')
        }
      }
    });
  } 
  
  
  logout() {
    this.authService.logout()
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  }


  
  

 


  

