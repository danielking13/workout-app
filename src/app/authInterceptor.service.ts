import {Injectable, Injector} from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req, next) {
    const auth = this.injector.get(AuthService);
    if(!req.headers.has('Authorization')) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'token ' + auth.token)
      });
      return next.handle(authRequest);
    }
    return next.handle(req);
  }
}
