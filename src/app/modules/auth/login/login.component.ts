import { Component, DestroyRef } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ILoginReq } from 'src/app/shared/models/auth/ilogin-req';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SecurityService } from 'src/app/shared/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private readonly _authService: AuthService,
    private readonly _securityService: SecurityService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public loadingService: LoadingService,
    private destroyRef: DestroyRef
  ) {}
  returnUrl: string | null =
    this.activatedRoute.snapshot.queryParams['returnUrl'];
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  submitloginForm() {
    if (this.loginForm.valid) {
      this._authService
        .loginUser(this.loginForm.value as ILoginReq)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.toastr.success('Login Successful');
              this._securityService.setToken(res.token);
              this.loginForm.reset();
              if (this.returnUrl) {
                this.router.navigateByUrl(this.returnUrl);
              } else {
                this.router.navigate(['/home']);
              }
            }
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please fill in the form correctly');
    }
  }

  checkError(control: AbstractControl | null) {
    return control?.errors && (control?.touched || control?.dirty);
  }
}
