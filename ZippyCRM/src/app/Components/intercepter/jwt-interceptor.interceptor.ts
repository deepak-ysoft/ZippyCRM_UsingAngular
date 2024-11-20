import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // retieve token from localstorage
  const token = localStorage.getItem('jwtToken');
  const clnReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },// set token in header
  });
  return next(clnReq);
};
