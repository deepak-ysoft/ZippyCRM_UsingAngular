import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken');
  const clnReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(clnReq);
};
