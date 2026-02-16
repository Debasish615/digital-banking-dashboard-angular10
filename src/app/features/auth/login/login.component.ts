import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin(): void {
    const ok = this.auth.login(this.username, this.password);
    if (ok) this.router.navigate(['/dashboard']);
    else this.error = 'Please enter username and password';
  }
}
