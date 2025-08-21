import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { IRegisterReq } from '../models/auth/iregister-req';
import { IAuthRes } from '../models/auth/iauth-res';
import { ILoginReq } from '../models/auth/ilogin-req';
import { SecurityService } from './security.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _http: HttpClient, private router: Router) {}
  securityService = inject(SecurityService);

  registerUser(value: IRegisterReq): Observable<IAuthRes> {
    return this._http.post<IAuthRes>(
      `${environment.pathUrl}/auth/signup`,
      value
    );
  }
  loginUser(value: ILoginReq): Observable<IAuthRes> {
    return this._http.post<IAuthRes>(
      `${environment.pathUrl}/auth/signin`,
      value
    );
  }
  signout() {
    this.securityService.clearToken();
    this.router.navigate(['/login']);
  }
}
