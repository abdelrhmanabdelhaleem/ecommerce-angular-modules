import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        this.manageError(error);
        throw error;
      })
    );
  }
  manageError(error: any): void {
    const message = error?.error?.message;
    switch (error.status) {
      case 400:
        this.toastr.error(message, 'invalid request data');
        break;
      case 401:
        this.toastr.error(message, 'Unauthorized');
        break;
      case 403:
        this.toastr.error(message, 'Forbidden');
        break;
      case 404:
        this.toastr.error(message, 'Not Found');
        break;
      case 409:
        this.toastr.error(message, 'Conflict');
        break;
      case 500:
        this.toastr.error(message, 'Internal Server Error');
        break;
      default:
        this.toastr.error(message, 'Error');
        break;
    }
  }
}
