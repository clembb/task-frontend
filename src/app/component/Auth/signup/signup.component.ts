import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { AuthService } from './../../../service/auth.service';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  
})
export class SignupComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageserivce: MessageService,
    private router:Router,

  ) {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;
    this.authService.register(name, email, password).subscribe(
      () => {
        this.messageserivce.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registered succefully',
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      (error) => {
        this.messageserivce.add({
          key:'bc',
          severity: 'error',
          summary: 'error',
          detail: 'Something wen wrong ',
        });
        this.errorMessage =
          error.error || 'Registration failed. Please try again.';
      }
    );
  }

  get name() {
    return this.registerForm.controls['name'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirm Password'];
  }
  show(){
    this.messageserivce.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Registered succefully',
    });

  }
}
