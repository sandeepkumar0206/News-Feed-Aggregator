import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  // Reactive current user (null when not logged in)
  currentUser = signal<any>(null);

  constructor() {
    // Listen to auth state changes
    authState(this.auth).pipe(
      tap(user => this.currentUser.set(user))
    ).subscribe();
  }

  // Signup with email & password
  signUp(email: string, password: string, displayName: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(cred => {
        if (cred.user) {
          updateProfile(cred.user, { displayName }).catch(err => console.error('Profile update failed', err));
        }
      })
    );
  }

  // Login with email & password
  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // Google Sign-In (popup)
  googleSignIn(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  // Forgot Password - send reset email
  resetPassword(email: string): Observable<void> {
    // Optional: you can add { url: 'https://your-app.com/reset' } as second param
    return from(sendPasswordResetEmail(this.auth, email));
  }

  // Logout
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Helper: is user logged in?
  get isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}