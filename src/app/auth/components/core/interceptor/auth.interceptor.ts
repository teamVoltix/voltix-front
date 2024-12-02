import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = JSON.parse(
    localStorage.getItem('access_token') || '{}'
  ).access_token;

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return next(authReq);
};
