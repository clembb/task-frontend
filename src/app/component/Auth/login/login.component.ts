import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[MessageService]
})
export class LoginComponent  {
  loginForm: FormGroup;
  errormessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageserivce: MessageService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
   
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      (response) => {

        if(response.body.email===email){
        this.router.navigate(['/home']); // Navigate to home page
        console.log('login good');

        }else{

        this.messageserivce.add({
          severity: 'error',
          summary: 'error',
          detail: 'email or password is wrong',
        });
      }
      },
      (error) => {

        this.messageserivce.add({
          key: 'bc',
          severity: 'error',
          summary: 'error',
          detail: 'Something went wrong',
        });
        this.errormessage =
          error.error || 'Invalid email or password. Please try again.';
      }
    );
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  show(){
    this.messageserivce.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Registered succefully',
    });

  }
}
