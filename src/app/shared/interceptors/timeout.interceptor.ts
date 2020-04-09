import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { AppConstant } from 'src/app/shared/constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class HttpTimeoutInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      timeout(AppConstant.NETWORK_TIMEOUT)
    );
  }
}
