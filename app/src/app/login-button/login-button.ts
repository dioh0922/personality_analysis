import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { AuthService } from '../services/auth-service';


@Component({
  selector: 'login-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './login-button.html',
  styleUrl: './login-button.css'
})
export class LoginButton {
  constructor(
    private auth: Auth,
    public authService: AuthService,
  ) {
  }

  async login() {
    await this.authService.login();
    window.location.reload();
  }

  logout() {
    this.authService.logout();
  }
}
