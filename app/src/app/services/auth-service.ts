import { Injectable, inject, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  public readonly user$: Observable<User | null> = user(this.auth);
  public readonly currentUser: Signal<User | null> = toSignal(this.user$, { initialValue: null });
  public readonly isLoggedIn: Signal<boolean> = computed(() => !!this.currentUser());

  isLogin(){
    return this.isLoggedIn();
  }

  getCurrentUser(){
    return this.currentUser();
  }

  login() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
    console.log(this.currentUser());
  }

  logout() {
    return signOut(this.auth);
  }
}
