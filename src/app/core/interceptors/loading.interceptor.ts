import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(
    private _loadingService: LoadingService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._loadingService.startLoading();
    this.spinner.show();
    return next.handle(request).pipe(
      finalize(() => {
        this._loadingService.stopLoading();
        this.spinner.hide();
      })
    );
  }
}
