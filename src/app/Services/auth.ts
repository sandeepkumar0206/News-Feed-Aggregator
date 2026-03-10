import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private auth = inject(Auth);
  private router = inject(Router);
  private cookie = inject(CookieService);

  currentUser = signal<any>(null);

  constructor() {
   authState(this.auth).subscribe(user => {

      if (user) {
        // user already logged in
        this.router.navigate(['/dashboard']);
      } else {
        // user not logged in
        this.router.navigate(['/signin']);
      }

    });
  }

  signUp(email: string, password: string, displayName: string): Observable<UserCredential> {

    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(

      tap(async (cred) => {

        if (cred.user) {

          await updateProfile(cred.user, {
            displayName: displayName
          });

          this.cookie.set('user', JSON.stringify(cred.user));
          this.router.navigate(['/dashboard']);

        }

      })
    );
  }

  login(email: string, password: string): Observable<UserCredential> {

    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(

      tap(res => {

        this.cookie.set('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']);

      })
    );
  }

  googleSignIn(): Observable<UserCredential> {

    const provider = new GoogleAuthProvider();

    return from(signInWithPopup(this.auth, provider)).pipe(

      tap(res => {

        this.cookie.set('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']);

      })
    );
  }

  resetPassword(email: string): Observable<void> {

    return from(sendPasswordResetEmail(this.auth, email));

  }

  logout(): Observable<void> {

    this.cookie.delete('user');
    this.router.navigate(['/signup']);

    return from(signOut(this.auth));
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser();
  }

}