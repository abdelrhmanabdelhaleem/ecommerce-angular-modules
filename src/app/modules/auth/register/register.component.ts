import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IRegisterReq } from 'src/app/shared/models/auth/iregister-req';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private readonly _authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    public loadingService: LoadingService
  ) {}
  Subscription$ = new Subscription();
  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmRePassword
  );
  confirmRePassword(g: AbstractControl) {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { misMatch: true };
    }
  }
  submitRegisterForm() {
    if (this.registerForm.valid) {
      this.Subscription$ = this._authService
        .registerUser(this.registerForm.value as IRegisterReq)
        .subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.toastr.success('Registration Successful');
              this.router.navigate(['/login']);
              this.registerForm.reset();
            }
          },
          complete: () => console.log('✅ Unsubscribed automatically'),
        });
    } else {
      this.registerForm.markAllAsTouched();
      this.registerForm.setErrors({ misMatch: true });
      this.toastr.error('Please fill in the form correctly');
    }
  }
  checkError(control: AbstractControl | null) {
    return control?.errors && (control?.touched || control?.dirty);
  }
  ngOnDestroy() {
    if (this.Subscription$) {
      this.Subscription$.unsubscribe();
    }
  }
}
