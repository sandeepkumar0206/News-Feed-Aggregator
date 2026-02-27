import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/auth';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatInputModule, MatButtonModule, MatIconModule
  ],
})
export class Signup {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  signupForm = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  error: string | null = null;

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password, displayName } = this.signupForm.value;
      this.authService.signUp(email!, password!, displayName!).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => this.error = err.message
      });
    }
  }

  googleSignIn() {
    this.authService.googleSignIn().subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.error = err.message
    });
  }
}