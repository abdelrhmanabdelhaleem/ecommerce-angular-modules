import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from 'src/app/core/services/checkout.service';
import { IShippingData } from 'src/app/shared/models/ishipping-data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(
    private checkoutService: CheckoutService,
    private activatedRoute: ActivatedRoute
  ) {}
  toastrService = inject(ToastrService);
  router = inject(Router);
  cartId: string | null = null;
  shippingForm = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    console.log(window.location.origin);
    this.activatedRoute.paramMap.subscribe((params) => {
      this.cartId = params.get('id');
    });
  }
  paymentCash() {
    if (this.shippingForm.valid) {
      this.checkoutService
        .CreateCashOrder(this.shippingForm.value as IShippingData, this.cartId)
        .subscribe({
          next: (res) => {
            this.toastrService.success('Order created successfully');
            this.router.navigate(['/allorders']);
          },
        });
    } else {
      this.toastrService.error('Please fill in all required fields');
    }
  }
  paymentOnline() {
    if (this.shippingForm.valid) {
      this.checkoutService
        .CreateOnlineOrder(
          this.shippingForm.value as IShippingData,
          this.cartId,
          window.location.origin
        )
        .subscribe({
          next: (res) => {
            console.log('🚀 ~ CheckoutComponent ~ paymentOnline ~ res:', res);
            this.toastrService.info('Redirecting to payment page');
            window.location.href = res.session.url; // Redirect to the payment URL
            // window.location.href = res.url; // Redirect to the payment URL
          },
        });
    } else {
      this.toastrService.error('Please fill in all required fields');
    }
  }
}
