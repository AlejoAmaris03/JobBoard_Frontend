import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = new AuthService().getToken();

  if(token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(clonedReq);
  }

  return next(req);
};
