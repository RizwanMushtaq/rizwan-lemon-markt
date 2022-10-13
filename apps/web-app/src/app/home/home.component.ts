import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, filter, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'rizwan-lemon-mart-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.authService.login('manager@yahoo.com', '12345678');

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(
          ([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''
        ),
        tap(([authStatus, user]) => {
          this.router.navigate(['/manager']);
        })
      )
      .subscribe();
  }
}
