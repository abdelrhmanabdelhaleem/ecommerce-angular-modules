import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityService } from 'src/app/shared/services/security.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private securityService: SecurityService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: string | null = this.securityService.getToken();
    if (
      token &&
      (request.url.includes('cart') ||
        request.url.includes('orders') ||
        request.url.includes('wishlist'))
    ) {
      request = request.clone({
        setHeaders: { token },
      });
    }
    return next.handle(request);
  }
}
