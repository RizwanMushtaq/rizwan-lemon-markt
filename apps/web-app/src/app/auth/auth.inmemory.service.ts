import { Injectable } from '@angular/core';
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service';
import { Observable, of, throwError } from 'rxjs';
import { PhoneType, User } from '../user/user/user';
import { Role } from './auth.enum';
import { sign } from 'fake-jwt-sign';

@Injectable()
export class InMemoryAuthService extends AuthService {
  private defaultUser = User.Build({
    _id: '5da01001',
    email: 'rizwan@gmail.com',
    name: { first: 'Rizwan', last: 'Mushtaq' },
    picture: '',
    role: Role.Manager,
    dateOfBirth: new Date(1980, 1, 1),
    userStatus: true,
    address: {
      line1: 'Wittelsbacherstr. 36',
      city: 'Munich',
      state: 'Bayern',
      zip: '803333',
    },
    level: 2,
    phones: [
      {
        id: 0,
        type: PhoneType.Mobile,
        digits: '55556666',
      },
    ],
  });

  constructor() {
    super();
    console.warn(
      "You're using the InMemoryAuthService. Do not use this service in production."
    );
  }

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    email = email.toLowerCase();

    if (email.endsWith('@test.com')) {
      console.log('Hallo');
      return throwError(
        'Failed to login! Email needs not to end with @test.com'
      );
    }

    const authStatus = {
      isAuthenticated: true,
      userId: this.defaultUser._id,
      userRole: email.includes('cashier')
        ? Role.Cashier
        : email.includes('clerk')
        ? Role.Clerk
        : email.includes('manager')
        ? Role.Manager
        : Role.None,
    };

    this.defaultUser.role = authStatus.userRole;

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IServerAuthResponse;

    return of(authResponse);
  }

  protected getCurrentUser(): Observable<User> {
    return of(this.defaultUser);
  }

  protected transformJwtToken(token: IAuthStatus): IAuthStatus {
    return token;
  }
}
