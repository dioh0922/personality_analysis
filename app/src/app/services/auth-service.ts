import { Injectable, computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user$: Observable<User | null>;
  public readonly currentUser: Signal<User | null>;
  public readonly isLoggedIn: Signal<boolean>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
    this.currentUser = toSignal(this.user$, { initialValue: null });
    this.isLoggedIn = computed(() => !!this.currentUser());
  }

  isLogin(){
    return this.isLoggedIn();
  }

  getCurrentUser(){
    return this.currentUser();
  }

  async login() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }
}
